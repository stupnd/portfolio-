"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Play, RotateCcw, Zap } from "lucide-react";

/**
 * Interactive model of the ledger's core guarantee.
 *
 * Backend work is invisible, which is the whole problem with putting it in a
 * portfolio. Rather than a screenshot of a dashboard, this simulates the one
 * behaviour that matters: at-least-once delivery from Kafka, exactly-once
 * effects on the balance. Runs entirely client side, so there is no broker or
 * database to host.
 *
 * The interesting case is a crash AFTER the balance is written but BEFORE the
 * offset is committed. Kafka redelivers, and the idempotency check is the only
 * thing standing between that and a double-charged account.
 *
 * Implementation note: the whole simulation lives in a single ref-held object
 * and each tick is a pure transition producing the next snapshot. State updates
 * happen once, outside any updater callback, so React's development-mode double
 * invocation can't double-apply a balance.
 */

type MsgState = "queued" | "applied" | "skipped";
type Account = "ACC-1" | "ACC-2";

interface Msg {
  id: string;
  account: Account;
  amount: number;
  state: MsgState;
  /** true once this exact txn id has been written to the ledger */
  everApplied: boolean;
  redelivered: boolean;
}

interface LogLine {
  id: number;
  text: string;
  tone: "info" | "warn" | "good";
}

interface Snapshot {
  msgs: Msg[];
  balances: Record<Account, number>;
  log: LogLine[];
  /** total of every write that reached the ledger, used to check the invariant */
  written: number;
  seq: number;
  logSeq: number;
  crashArmed: boolean;
}

const REPO = "https://github.com/stupnd/Transaction-Ingestion-Service";
const ACCOUNTS: Account[] = ["ACC-1", "ACC-2"];
const AMOUNTS = [250, 120, 75, 400];
const TICK_MS = 900;

const EMPTY: Snapshot = {
  msgs: [],
  balances: { "ACC-1": 0, "ACC-2": 0 },
  log: [],
  written: 0,
  seq: 1,
  logSeq: 0,
  crashArmed: false,
};

/** First paint: four committed transactions, so the demo reads as a live ledger. */
const SEED: Snapshot = {
  msgs: [
    { id: "txn-001", account: "ACC-1", amount: 250, state: "applied", everApplied: true, redelivered: false },
    { id: "txn-002", account: "ACC-2", amount: 120, state: "applied", everApplied: true, redelivered: false },
    { id: "txn-003", account: "ACC-1", amount: 75, state: "applied", everApplied: true, redelivered: false },
    { id: "txn-004", account: "ACC-2", amount: 400, state: "applied", everApplied: true, redelivered: false },
  ],
  balances: { "ACC-1": 325, "ACC-2": 520 },
  log: [
    { id: 0, text: "Producer sent 4 transactions, partitioned by account id", tone: "info" },
    { id: 1, text: "txn-001 applied, offset committed", tone: "info" },
    { id: 2, text: "txn-002 applied, offset committed", tone: "info" },
    { id: 3, text: "txn-003 applied, offset committed", tone: "info" },
    { id: 4, text: "txn-004 applied, offset committed", tone: "info" },
  ],
  written: 845,
  seq: 5,
  logSeq: 5,
  crashArmed: false,
};

function append(snap: Snapshot, text: string, tone: LogLine["tone"] = "info"): void {
  snap.log = [...snap.log.slice(-7), { id: snap.logSeq++, text, tone }];
}

/** One consumer poll: at most one message per partition, head of queue first. */
function tick(prev: Snapshot): { next: Snapshot; didWork: boolean } {
  const snap: Snapshot = {
    ...prev,
    msgs: [...prev.msgs],
    balances: { ...prev.balances },
    log: [...prev.log],
  };
  let didWork = false;

  for (const account of ACCOUNTS) {
    const idx = snap.msgs.findIndex((m) => m.account === account && m.state === "queued");
    if (idx === -1) continue;
    didWork = true;
    const msg = snap.msgs[idx];

    // Idempotency check: this txn id is already in the ledger, so skip the write.
    if (msg.everApplied) {
      snap.msgs[idx] = { ...msg, state: "skipped" };
      append(snap, `${msg.id} redelivered, already in ledger, skipped`, "good");
      continue;
    }

    // Crash path: the write lands, the offset never commits.
    if (snap.crashArmed) {
      snap.crashArmed = false;
      snap.msgs[idx] = { ...msg, state: "queued", everApplied: true, redelivered: true };
      snap.balances[account] += msg.amount;
      snap.written += msg.amount;
      append(snap, `${msg.id} written to ledger`);
      append(snap, "Consumer crashed before offset commit", "warn");
      append(snap, `Kafka will redeliver ${msg.id} from the last committed offset`, "warn");
      continue;
    }

    snap.msgs[idx] = { ...msg, state: "applied", everApplied: true };
    snap.balances[account] += msg.amount;
    snap.written += msg.amount;
    append(snap, `${msg.id} applied, offset committed`);
  }

  return { next: snap, didWork };
}

export function LedgerSim() {
  const reduce = useReducedMotion();
  const [snap, setSnap] = useState<Snapshot>(SEED);
  const [running, setRunning] = useState(false);
  const snapRef = useRef(snap);
  snapRef.current = snap;
  const logRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [snap.log]);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(
      () => {
        const { next, didWork } = tick(snapRef.current);
        if (!didWork) {
          setRunning(false);
          return;
        }
        setSnap(next);
      },
      reduce ? 350 : TICK_MS
    );
    return () => clearInterval(timer);
  }, [running, reduce]);

  const send = useCallback(() => {
    setSnap((prev) => {
      const next: Snapshot = { ...prev, msgs: [...prev.msgs], log: [...prev.log] };
      for (let i = 0; i < 4; i++) {
        next.msgs.push({
          id: `txn-${String(prev.seq + i).padStart(3, "0")}`,
          account: ACCOUNTS[i % 2],
          amount: AMOUNTS[i],
          state: "queued",
          everApplied: false,
          redelivered: false,
        });
      }
      next.seq = prev.seq + 4;
      append(next, "Producer sent 4 transactions, partitioned by account id");
      return next;
    });
    setRunning(true);
  }, []);

  const armCrash = useCallback(() => {
    setSnap((prev) => {
      if (prev.crashArmed) return prev;
      const next: Snapshot = { ...prev, log: [...prev.log], crashArmed: true };
      append(next, "Crash armed: the next write will not commit its offset. Send transactions to trigger it", "warn");
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    setSnap({ ...EMPTY, balances: { "ACC-1": 0, "ACC-2": 0 }, msgs: [], log: [] });
    // Reset clears the ledger; the seeded history is only the first impression
  }, []);

  const total = snap.balances["ACC-1"] + snap.balances["ACC-2"];
  const consistent = total === snap.written;

  return (
    <div className="border-t border-ink">
      <div className="py-5">
        <h3 className="text-lg font-semibold">Crash the consumer mid-write</h3>
        <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-ink-2">
          Kafka guarantees at-least-once delivery, so a crash means the message comes back.
          The ledger guarantees each transaction lands exactly once. Arm a crash, send
          transactions, and watch the redelivered one get skipped instead of double-applied.
        </p>
        <p className="mt-2 max-w-[60ch] text-xs leading-relaxed text-ink-3">
          A simplified model running in your browser, not the live service. It reproduces
          the behaviour asserted by{" "}
          <a
            href={`${REPO}/blob/main/backend/src/test/java/dev/stuti/ledger/integration/TransactionPipelineIntegrationTest.java#L108`}
            target="_blank"
            rel="noopener noreferrer"
            className="data inline-block max-w-full break-all text-accent underline"
          >
            redeliveredEvent_isAppliedExactlyOnce
          </a>
          , a real Testcontainers test that republishes the same event twice against Postgres
          and Kafka and asserts the balance never moves.
        </p>
      </div>

      <div className="grid gap-x-8 gap-y-6 lg:grid-cols-[1.05fr,1fr]">
        <div>
          <ul className="border-t border-rule">
            {ACCOUNTS.map((account, p) => {
              const queue = snap.msgs.filter((m) => m.account === account);
              return (
                <li key={account} className="border-b border-rule py-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-semibold">
                      Partition {p} <span className="font-normal text-ink-2">· {account}</span>
                    </span>
                    <span className="data text-sm">${snap.balances[account].toLocaleString()}</span>
                  </div>
                  <p className="data mt-1.5 flex min-h-5 flex-wrap gap-x-3 gap-y-1 text-[11px]">
                    {queue.length === 0 && <span className="font-sans text-xs text-ink-3">No messages yet</span>}
                    <AnimatePresence mode="popLayout">
                      {queue.map((m) => (
                        <motion.span
                          key={m.id}
                          layout={!reduce}
                          initial={reduce ? false : { opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={tokenStyle(m)}
                          title={`${m.id}: $${m.amount}`}
                        >
                          {m.id.replace("txn-", "")}
                          {m.state === "queued" && m.redelivered && " retry"}
                          {m.state === "skipped" && " dup"}
                          {m.state === "queued" && !m.redelivered && " queued"}
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={send}
              className="inline-flex min-h-11 items-center gap-2 rounded bg-accent px-4 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
            >
              <Play size={14} aria-hidden /> Send 4 transactions
            </button>
            <button
              type="button"
              onClick={armCrash}
              disabled={snap.crashArmed}
              aria-pressed={snap.crashArmed}
              className="inline-flex min-h-11 items-center gap-2 rounded border border-pending px-4 text-sm font-semibold text-pending transition-colors hover:bg-pending/10 aria-pressed:bg-pending aria-pressed:text-paper"
            >
              <Zap size={14} aria-hidden /> {snap.crashArmed ? "Crash armed" : "Crash the consumer"}
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink-2 underline decoration-rule-strong hover:text-ink"
            >
              <RotateCcw size={14} aria-hidden /> Reset
            </button>
          </div>
        </div>

        <div>
          <ol
            ref={logRef}
            aria-live="polite"
            aria-label="Consumer log"
            className="h-[188px] overflow-y-auto border-t border-rule"
          >
            {snap.log.length === 0 ? (
              <li className="border-b border-rule py-2 text-xs text-ink-3">The log is empty. Send transactions to start.</li>
            ) : (
              snap.log.map((l) => (
                <li
                  key={l.id}
                  className="grid grid-cols-[2.5rem,1fr] border-b border-rule py-1.5 text-[11px] leading-relaxed"
                >
                  <span className="data text-ink-3">{String(l.id).padStart(4, "0")}</span>
                  <span
                    className={
                      l.tone === "warn" ? "text-pending" : l.tone === "good" ? "text-ack" : "text-ink-2"
                    }
                  >
                    {l.text}
                  </span>
                </li>
              ))
            )}
          </ol>

          <p
            role="status"
            className={`mt-4 flex items-center gap-2 text-sm font-semibold ${
              consistent ? "text-ack" : "text-[#FF8A8A]"
            }`}
          >
            <span aria-hidden className={`h-2 w-2 rounded-[1px] ${consistent ? "bg-ack" : "bg-[#FF8A8A]"}`} />
            {consistent
              ? `Balances match the ledger: $${total.toLocaleString()}`
              : "Balance drift detected"}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-ink-3">
            The sum of balances always equals the sum of writes that reached the ledger, however
            many times a message is redelivered.
          </p>
        </div>
      </div>
    </div>
  );
}

function tokenStyle(m: Msg) {
  switch (m.state) {
    case "applied":
      return "text-ack";
    case "skipped":
      return "text-accent";
    default:
      return m.redelivered ? "text-pending" : "text-ink-2";
  }
}
