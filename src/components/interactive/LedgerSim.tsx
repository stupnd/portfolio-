"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

/**
 * Fig. 1, interactive: the ledger's core guarantee, simulated client side.
 *
 * Kafka delivers at least once, so a crash after the balance is written but
 * before the offset commits brings the message back. The idempotency check is
 * the only thing between that and a double charge. Switching it off lets the
 * reader watch the balance drift away from what the ledger should hold.
 *
 * The simulation lives in one ref-held snapshot and each tick is a pure
 * transition, so React's development double invocation can't double-apply.
 */

type MsgState = "queued" | "applied" | "skipped" | "doubled";
type Account = "ACC-1" | "ACC-2";

interface Msg {
  id: string;
  account: Account;
  amount: number;
  state: MsgState;
  /** true once this txn id has reached the ledger */
  everApplied: boolean;
  redelivered: boolean;
}

interface LogLine {
  id: number;
  text: string;
  tone: "info" | "warn" | "good" | "bad";
}

interface Snapshot {
  msgs: Msg[];
  balances: Record<Account, number>;
  log: LogLine[];
  /** What the balances should total: each transaction counted once */
  expected: number;
  seq: number;
  logSeq: number;
  crashArmed: boolean;
}

const REPO = "https://github.com/stupnd/Transaction-Ingestion-Service";
const ACCOUNTS: Account[] = ["ACC-1", "ACC-2"];
const AMOUNTS = [250, 120, 75, 400];
const TICK_MS = 900;
const ANNOUNCE_MS = 1500;

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
  expected: 845,
  seq: 5,
  logSeq: 5,
  crashArmed: false,
};

function append(snap: Snapshot, text: string, tone: LogLine["tone"] = "info"): void {
  snap.log = [...snap.log.slice(-9), { id: snap.logSeq++, text, tone }];
}

/** One consumer poll: at most one message per partition, head of queue first. */
function tick(prev: Snapshot, idempotent: boolean): { next: Snapshot; didWork: boolean } {
  const snap: Snapshot = { ...prev, msgs: [...prev.msgs], balances: { ...prev.balances }, log: [...prev.log] };
  let didWork = false;

  for (const account of ACCOUNTS) {
    const idx = snap.msgs.findIndex((m) => m.account === account && m.state === "queued");
    if (idx === -1) continue;
    didWork = true;
    const msg = snap.msgs[idx];

    if (msg.everApplied) {
      if (idempotent) {
        snap.msgs[idx] = { ...msg, state: "skipped" };
        append(snap, `${msg.id} redelivered, already in ledger, skipped`, "good");
      } else {
        // No guard: the redelivered write lands a second time
        snap.msgs[idx] = { ...msg, state: "doubled" };
        snap.balances[account] += msg.amount;
        append(snap, `${msg.id} redelivered and applied again: ${account} charged twice`, "bad");
      }
      continue;
    }

    // Crash path: the write lands, the offset never commits
    if (snap.crashArmed) {
      snap.crashArmed = false;
      snap.msgs[idx] = { ...msg, everApplied: true, redelivered: true };
      snap.balances[account] += msg.amount;
      snap.expected += msg.amount;
      append(snap, `${msg.id} written to ledger`);
      append(snap, "Consumer crashed before the offset commit", "warn");
      append(snap, `Kafka redelivers ${msg.id} from the last committed offset`, "warn");
      continue;
    }

    snap.msgs[idx] = { ...msg, state: "applied", everApplied: true };
    snap.balances[account] += msg.amount;
    snap.expected += msg.amount;
    append(snap, `${msg.id} applied, offset committed`);
  }

  return { next: snap, didWork };
}

const money = (n: number) => `$${n.toLocaleString("en-CA")}`;

export function LedgerSim() {
  const [snap, setSnap] = useState<Snapshot>(SEED);
  const [running, setRunning] = useState(false);
  const [idempotent, setIdempotent] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const snapRef = useRef(snap);
  snapRef.current = snap;
  const idemRef = useRef(idempotent);
  idemRef.current = idempotent;
  const logRef = useRef<HTMLOListElement>(null);
  const switchLabel = useId();

  const total = snap.balances["ACC-1"] + snap.balances["ACC-2"];
  const drift = total - snap.expected;

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [snap.log]);

  useEffect(() => {
    if (!running) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setInterval(
      () => {
        const { next, didWork } = tick(snapRef.current, idemRef.current);
        if (!didWork) {
          setRunning(false);
          return;
        }
        setSnap(next);
      },
      reduce ? 350 : TICK_MS
    );
    return () => clearInterval(timer);
  }, [running]);

  // Screen readers hear a summary at most every 1.5s, not every log line
  useEffect(() => {
    const t = setTimeout(() => {
      const s = snapRef.current;
      const sum = s.balances["ACC-1"] + s.balances["ACC-2"];
      const d = sum - s.expected;
      const last = s.log[s.log.length - 1]?.text ?? "";
      setAnnouncement(
        `${last}. ${d === 0 ? `Balances match the ledger at ${money(sum)}.` : `Balance drift: ${money(d)} charged that should not have been.`}`
      );
    }, ANNOUNCE_MS);
    return () => clearTimeout(t);
  }, [snap]);

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
    setSnap({ ...SEED, msgs: [], log: [], balances: { "ACC-1": 0, "ACC-2": 0 }, expected: 0, seq: 1, logSeq: 0 });
  }, []);

  const btn =
    "inline-flex min-h-11 items-center border px-4 text-[15px] transition-colors disabled:cursor-default disabled:opacity-60";

  return (
    <div>
      <div className="grid gap-x-10 gap-y-4 lg:grid-cols-12">
        <p className="max-w-[36em] text-[17px] leading-relaxed text-ink-2 lg:col-span-7">
          Arm a crash, then send transactions. The consumer writes a balance and dies before it commits the offset, so Kafka
          delivers the same message again. With idempotency on, the duplicate is skipped. Switch it off and watch the
          account get charged twice.
        </p>
        <p className="text-[14px] italic leading-snug text-ink-3 lg:col-span-5">
          A simplified model running in your browser, not the live service. It reproduces what{" "}
          <a
            href={`${REPO}/blob/main/backend/src/test/java/dev/stuti/ledger/integration/TransactionPipelineIntegrationTest.java#L108`}
            target="_blank"
            rel="noopener noreferrer"
            className="data break-all text-[12px] not-italic text-accent underline decoration-accent/40 underline-offset-[4px] hover:decoration-accent"
          >
            redeliveredEvent_isAppliedExactlyOnce
          </a>{" "}
          asserts against real Postgres and Kafka: the same event published twice moves the balance once.
        </p>
      </div>

      <div className="mt-6 border border-rule-strong">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 border-b border-rule-strong p-4">
          <button type="button" onClick={send} className={`${btn} border-ink bg-ink text-paper hover:bg-ink/85`}>
            Send 4 transactions
          </button>
          <button
            type="button"
            onClick={armCrash}
            disabled={snap.crashArmed}
            className={`${btn} border-pending text-pending hover:bg-pending/10 disabled:bg-pending disabled:text-paper disabled:opacity-100`}
          >
            {snap.crashArmed ? "Crash armed" : "Crash the consumer"}
          </button>
          <button type="button" onClick={reset} className={`${btn} border-transparent px-2 text-ink-2 underline underline-offset-[5px] hover:text-ink`}>
            Reset
          </button>

          <div className="ml-auto inline-flex min-h-11 items-center gap-3 text-[15px] text-ink">
            <span id={switchLabel}>Idempotency check</span>
            <button
              type="button"
              role="switch"
              aria-checked={idempotent}
              aria-labelledby={switchLabel}
              onClick={() => setIdempotent((v) => !v)}
              className={`relative h-7 w-[3.25rem] border transition-colors ${idempotent ? "border-ack bg-ack" : "border-accent bg-transparent"}`}
            >
              <span
                aria-hidden
                className={`absolute top-[3px] h-[18px] w-[18px] transition-[left,background-color] duration-200 ${
                  idempotent ? "left-[calc(100%-21px)] bg-paper" : "left-[3px] bg-accent"
                }`}
              />
            </button>
            <span className={`data w-7 text-[12px] ${idempotent ? "text-ack" : "text-accent"}`}>{idempotent ? "on" : "off"}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2">
          {/* Partitions */}
          <ul className="border-b border-rule-strong lg:border-b-0 lg:border-r">
            {ACCOUNTS.map((account, p) => {
              const queue = snap.msgs.filter((m) => m.account === account).slice(-8);
              return (
                <li key={account} className="border-b border-rule p-4 last:border-b-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[16px] text-ink">
                      Partition {p} <span className="data text-[12px] text-ink-3">{account}</span>
                    </span>
                    <span className="data text-[16px] text-ink">{money(snap.balances[account])}</span>
                  </div>
                  <p className="data mt-2 flex min-h-6 flex-wrap gap-x-3 gap-y-1 text-[12px]">
                    {queue.length === 0 && <span className="font-serif text-[14px] italic text-ink-3">No messages yet</span>}
                    {queue.map((m) => (
                      <span key={m.id} className={`print-set ${tokenStyle(m)}`} title={`${m.id}: ${money(m.amount)}`}>
                        {m.id.replace("txn-", "")}
                        {label(m)}
                      </span>
                    ))}
                  </p>
                </li>
              );
            })}
          </ul>

          {/* Consumer log */}
          <ol ref={logRef} aria-label="Consumer log" className="h-[176px] overflow-y-auto">
            {snap.log.length === 0 ? (
              <li className="p-4 text-[14px] italic text-ink-3">The log is empty. Send transactions to start.</li>
            ) : (
              snap.log.map((l) => (
                <li key={l.id} className="grid grid-cols-[3rem,1fr] border-b border-rule px-4 py-1.5 text-[13px] leading-snug last:border-b-0">
                  <span className="data text-[12px] text-ink-3">{String(l.id).padStart(4, "0")}</span>
                  <span className={toneCls[l.tone]}>{l.text}</span>
                </li>
              ))
            )}
          </ol>
        </div>

        {/* Invariant */}
        <div
          className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-rule-strong p-4 ${
            drift === 0 ? "" : "bg-accent/10"
          }`}
        >
          <p className={`text-[17px] ${drift === 0 ? "text-ack" : "text-accent"}`}>
            {drift === 0 ? (
              <>Balances match the ledger: {money(total)}</>
            ) : (
              <>
                Balance drift: {money(total)} held, {money(snap.expected)} owed. {money(drift)} charged twice.
              </>
            )}
          </p>
          <p className="text-[14px] italic text-ink-3">
            Balances should always equal each transaction counted once, however many times it is delivered.
          </p>
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}

const toneCls: Record<LogLine["tone"], string> = {
  info: "text-ink-2",
  warn: "text-pending",
  good: "text-ack",
  bad: "text-accent",
};

function label(m: Msg) {
  if (m.state === "skipped") return " dup";
  if (m.state === "doubled") return " twice";
  if (m.state === "queued") return m.redelivered ? " retry" : " queued";
  return "";
}

function tokenStyle(m: Msg) {
  switch (m.state) {
    case "applied":
      return "text-ink-2";
    case "skipped":
      return "text-ack";
    case "doubled":
      return "text-accent underline decoration-2";
    default:
      return m.redelivered ? "text-pending" : "text-ink-3";
  }
}
