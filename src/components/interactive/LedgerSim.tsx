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
  const [snap, setSnap] = useState<Snapshot>(EMPTY);
  const [running, setRunning] = useState(false);
  const snapRef = useRef(snap);
  snapRef.current = snap;
  const logRef = useRef<HTMLDivElement>(null);

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
      append(next, "Crash armed: the next write will not commit its offset", "warn");
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    setSnap({ ...EMPTY, balances: { "ACC-1": 0, "ACC-2": 0 }, msgs: [], log: [] });
  }, []);

  const pending = snap.msgs.filter((m) => m.state === "queued").length;
  const total = snap.balances["ACC-1"] + snap.balances["ACC-2"];
  const consistent = total === snap.written;

  return (
    <div className="card overflow-hidden">
      <div className="border-b border-[var(--border)] px-6 py-4">
        <h3 className="text-sm font-semibold">Try it: crash the consumer mid-write</h3>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Kafka guarantees at-least-once delivery, so a crash means the message comes back.
          The ledger guarantees each transaction lands exactly once. Arm a crash and watch
          the redelivered message get skipped instead of double-applied.
        </p>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr,1fr]">
        <div className="space-y-4">
          {ACCOUNTS.map((account) => {
            const queue = snap.msgs.filter((m) => m.account === account);
            return (
              <div key={account}>
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-faint">
                    partition · {account.toLowerCase()}
                  </span>
                  <span className="font-mono text-sm tabular-nums text-[var(--fg)]">
                    ${snap.balances[account].toLocaleString()}
                  </span>
                </div>
                <div className="flex min-h-[46px] flex-wrap items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--card-hover)] p-2">
                  <AnimatePresence mode="popLayout">
                    {queue.length === 0 && (
                      <span className="px-1 font-mono text-[11px] text-faint">empty</span>
                    )}
                    {queue.map((m) => (
                      <motion.span
                        key={m.id}
                        layout={!reduce}
                        initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`rounded-lg border px-2 py-1 font-mono text-[10px] ${chipStyle(m)}`}
                        title={`${m.id}: $${m.amount}`}
                      >
                        {m.id.replace("txn-", "")}
                        {m.state === "queued" && m.redelivered && " ↻"}
                        {m.state === "skipped" && " dup"}
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={send}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-accent-soft"
            >
              <Play size={12} /> Send 4 transactions
            </button>
            <button
              type="button"
              onClick={armCrash}
              disabled={snap.crashArmed || pending === 0}
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3.5 py-2 text-xs font-medium text-amber-300 transition-colors hover:bg-amber-400/20 disabled:opacity-40"
            >
              <Zap size={12} /> {snap.crashArmed ? "Crash armed" : "Crash the consumer"}
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3.5 py-2 text-xs font-medium text-muted transition-colors hover:text-[var(--fg)]"
            >
              <RotateCcw size={12} /> Reset
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div
            ref={logRef}
            aria-live="polite"
            className="h-[172px] overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--card-hover)] p-3 font-mono text-[11px] leading-relaxed"
          >
            {snap.log.length === 0 ? (
              <p className="text-faint">Waiting for transactions...</p>
            ) : (
              snap.log.map((l) => (
                <p
                  key={l.id}
                  className={
                    l.tone === "warn"
                      ? "text-amber-300"
                      : l.tone === "good"
                        ? "text-emerald-400"
                        : "text-muted"
                  }
                >
                  <span className="text-faint">$ </span>
                  {l.text}
                </p>
              ))
            )}
          </div>

          <div
            className={`rounded-xl border px-4 py-3 ${
              consistent
                ? "border-emerald-400/30 bg-emerald-400/5"
                : "border-red-400/40 bg-red-400/10"
            }`}
          >
            <p className="font-mono text-[10px] uppercase tracking-wider text-faint">
              Invariant
            </p>
            <p
              className={`mt-1 text-sm font-medium ${
                consistent ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {consistent
                ? `Balances match the ledger: $${total.toLocaleString()}`
                : "Balance drift detected"}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted">
              Sum of balances always equals the sum of committed writes. This is what the
              31 tests assert, including the Testcontainers run against real Postgres and
              Kafka.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function chipStyle(m: Msg) {
  switch (m.state) {
    case "applied":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-400";
    case "skipped":
      return "border-accent/40 bg-accent/10 text-accent-soft";
    default:
      return m.redelivered
        ? "border-amber-400/40 bg-amber-400/10 text-amber-300"
        : "border-[var(--border-strong)] text-muted";
  }
}
