import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "../hooks/useIsMobile";
import { cn } from "../lib/utils";

const baseLogs = [
  "freikugelOS v1.0 (C) 1999-2025",
  "POST: Memory test .................... OK",
  "Detecting display adapter ............ VGA compatible",
  "Mounting filesystem .................. /",
  "Loading kernel modules ............... done",
  "Starting window system ............... ready",
  "Bringing up network .................. dhcp ok",
  "Launching user space ................. done",
] as const;

function BootLine({ text = "", delay = 0 }: { text?: string; delay?: number }) {
  const safe = String(text ?? "");
  const duration = Math.max(0.25, Math.min(safe.length * 0.03, 1.6));
  const isMobile = useIsMobile();

  return (
    <motion.p
      style={{
        animationDuration: "0.01s",
        animationName: "textflicker",
        animationIterationCount: "infinite",
        animationDirection: "alternate",
      }}
      className={cn(
        "font-mono whitespace-pre text-white",
        isMobile && "text-[9px]",
      )}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + 0.05, duration: 0.2 }}
    >
      <motion.span
        initial={{ width: "0ch" }}
        animate={{ width: `${safe.length}ch` }}
        transition={{ delay, duration, ease: "linear" }}
        className="inline-block overflow-hidden align-bottom"
      >
        {safe}
      </motion.span>
      <span className="inline-block w-2 animate-pulse">▮</span>
    </motion.p>
  );
}

export default function Bootstrapper({ onFinish }: { onFinish: () => void }) {
  const isMobile = useIsMobile();
  const [lines, setLines] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const logs = useMemo(
    () => [
      ...baseLogs,
      `Booting in ${isMobile ? "mobile" : "desktop"} mode ...`,
      "System ready ✓",
    ],
    [isMobile],
  );

  useEffect(() => {
    setLines([]);
    let i = 0;
    let cancelled = false;
    let t: number | undefined;

    const pushNext = () => {
      if (cancelled) return;

      const line = logs[i];
      if (line == null) {
        onFinish?.();
        return;
      }

      setLines((prev) => [...prev, line]);
      i++;

      if (i < logs.length) {
        const nextDelay = Math.max(180, Math.min(line.length * 25, 800));
        t = window.setTimeout(pushNext, nextDelay);
      } else {
        t = window.setTimeout(() => onFinish?.(), 800);
      }
    };

    t = window.setTimeout(pushNext, 400);

    return () => {
      cancelled = true;
      if (t) clearTimeout(t);
    };
  }, [logs, onFinish]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const totalDurationMs = Math.min(
    6000,
    Math.max(2000, logs.join("").length * 15),
  );

  return (
    <div className="fixed inset-0 bg-black text-white">
      <div className="pointer-events-none absolute inset-0" />
      <div
        ref={scrollRef}
        className="relative h-full w-full overflow-hidden p-4"
      >
        <div className="h-full w-full overflow-y-auto pr-2">
          <AnimatePresence initial={false}>
            {lines.map((t, idx) => (
              <BootLine key={`${idx}-${t}`} text={t} delay={0.02 * idx} />
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="absolute right-0 bottom-0 left-0 h-1 bg-gray-100/50"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: totalDurationMs / 1000, ease: "linear" }}
        />
      </div>
    </div>
  );
}
