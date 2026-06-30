"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Activity } from "lucide-react";

interface DayCell {
  date: string;
  level: number;
}

interface GithubData {
  username: string;
  joinYear: number;
  currentYear: number;
  years: number[];
  yearTotals: Record<number, number>;
  contributions: DayCell[];
}

const LEVEL_COLORS = ["#161b22", "#064e3b", "#047857", "#10b981", "#00d4aa"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

interface WeekData {
  days: (DayCell | null)[];
}

interface CalendarData {
  weeks: WeekData[];
  monthLabels: { label: string; weekIndex: number }[];
  yearLabels: { year: number; weekIndex: number }[];
}

function buildCalendar(contributions: DayCell[]): CalendarData {
  if (contributions.length === 0)
    return { weeks: [], monthLabels: [], yearLabels: [] };

  const map = new Map(contributions.map((c) => [c.date, c.level]));
  const firstDate = new Date(contributions[0].date + "T00:00:00");
  const lastDate = new Date(contributions[contributions.length - 1].date + "T00:00:00");

  const gridStart = new Date(firstDate);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());

  const weeks: WeekData[] = [];
  const cursor = new Date(gridStart);

  while (cursor <= lastDate) {
    const days: (DayCell | null)[] = [];
    for (let d = 0; d < 7; d++) {
      const key = cursor.toISOString().split("T")[0];
      if (cursor >= firstDate && cursor <= lastDate) {
        days.push({ date: key, level: map.get(key) ?? 0 });
      } else {
        days.push(null);
      }
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push({ days });
  }

  const monthLabels: { label: string; weekIndex: number }[] = [];
  const yearLabels: { year: number; weekIndex: number }[] = [];
  let lastMonth = -1;
  let lastYear = -1;
  const checkDate = new Date(gridStart);

  for (let w = 0; w < weeks.length; w++) {
    const m = checkDate.getMonth();
    const y = checkDate.getFullYear();
    if (m !== lastMonth && checkDate <= lastDate) {
      if (w !== 0 || m === firstDate.getMonth()) {
        monthLabels.push({ label: MONTHS[m], weekIndex: w });
      }
      lastMonth = m;
    }
    if (y !== lastYear && checkDate <= lastDate) {
      yearLabels.push({ year: y, weekIndex: w });
      lastYear = y;
    }
    checkDate.setDate(checkDate.getDate() + 7);
  }

  return { weeks, monthLabels, yearLabels };
}

export default function GithubActivity() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [data, setData] = useState<GithubData | null>(null);
  const [hovered, setHovered] = useState<DayCell | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const progressThumbRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    fetch("/api/github/contributions")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {});
  }, []);

  const { weeks, monthLabels, yearLabels } = useMemo(() => {
    return data && data.contributions && Array.isArray(data.contributions)
      ? buildCalendar(data.contributions)
      : { weeks: [], monthLabels: [], yearLabels: [] };
  }, [data]);

  const CELL = 11;
  const GAP = 2;
  const LEFT = 28;
  const TOP = 32;
  const svgW = LEFT + weeks.length * (CELL + GAP) + 10;
  const svgH = TOP + 7 * (CELL + GAP) + 4;

  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !progressLineRef.current || !progressThumbRef.current) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    progressLineRef.current.style.width = `${p * 100}%`;
    progressThumbRef.current.style.left = `calc(${p * 100}% - 8px)`;
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateProgress, { passive: true });
    const ro = new ResizeObserver(updateProgress);
    ro.observe(el);
    updateProgress();
    return () => {
      el.removeEventListener("scroll", updateProgress);
      ro.disconnect();
    };
  }, [updateProgress, weeks.length]);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    setDragging(true);
    dragStartX.current = e.clientX;
    dragScrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const dx = e.clientX - dragStartX.current;
    scrollRef.current.scrollLeft = dragScrollLeft.current - dx;
  };

  const onPointerUp = () => {
    isDragging.current = false;
    setDragging(false);
  };

  const onBarDown = (e: React.PointerEvent) => {
    const bar = e.currentTarget as HTMLElement;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = ratio * (scrollRef.current.scrollWidth - scrollRef.current.clientWidth);
      updateProgress();
    }
    bar.setPointerCapture(e.pointerId);
    const moveHandler = (ev: PointerEvent) => {
      const r = rect;
      const rat = Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width));
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = rat * (scrollRef.current.scrollWidth - scrollRef.current.clientWidth);
        updateProgress();
      }
    };
    const upHandler = () => {
      bar.removeEventListener("pointermove", moveHandler);
      bar.removeEventListener("pointerup", upHandler);
    };
    bar.addEventListener("pointermove", moveHandler);
    bar.addEventListener("pointerup", upHandler);
  };

  const grandTotal = data && data.years
    ? data.years.reduce((sum, y) => sum + (data.yearTotals[y] ?? 0), 0)
    : 0;

  return (
    <section id="activity" ref={ref} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-2">
            <p className="text-teal font-mono text-sm">// github activity</p>
          </div>
          <h2 className="text-3xl md:text-5xl heading-elegant text-text-primary">
            Code Contributions
          </h2>
          <p className="text-text-secondary mt-3 max-w-lg">
            {data
              ? `${grandTotal.toLocaleString()} total contributions since ${data.joinYear}.`
              : "Loading contribution data..."}
          </p>
        </motion.div>

        {data && data.years && weeks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl glass-strong overflow-hidden"
          >
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border flex-wrap">
              <Activity size={16} className="text-teal shrink-0" />
              <span className="text-sm font-medium text-text-primary">
                Contribution History
              </span>
              <div className="flex gap-3 ml-auto flex-wrap">
                {data.years.map((y) => (
                  <span key={y} className="text-xs font-mono text-text-secondary">
                    <span className="text-teal">{y}</span>{" "}
                    <span className="text-text-secondary/50">
                      {(data.yearTotals[y] ?? 0).toLocaleString()}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div
                ref={scrollRef}
                className="overflow-x-auto scrollbar-hide"
                style={{ cursor: dragging ? "grabbing" : "default" }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
              >
                <svg
                  width={svgW}
                  height={svgH}
                  viewBox={`0 0 ${svgW} ${svgH}`}
                  style={{ minWidth: svgW, pointerEvents: dragging ? "none" : "auto" }}
                >
                  {yearLabels.map((yl, i) => {
                    const x = LEFT + yl.weekIndex * (CELL + GAP);
                    return (
                      <g key={`yr-${i}`}>
                        <text
                          x={x}
                          y={10}
                          fill="#00d4aa"
                          fontSize={10}
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          {yl.year}
                        </text>
                        {i > 0 && (
                          <line
                            x1={x - 4}
                            y1={TOP - 4}
                            x2={x - 4}
                            y2={svgH - 4}
                            stroke="#00d4aa"
                            strokeWidth={0.5}
                            strokeDasharray="2 2"
                            opacity={0.3}
                          />
                        )}
                      </g>
                    );
                  })}

                  {monthLabels.map((m, i) => (
                    <text
                      key={i}
                      x={LEFT + m.weekIndex * (CELL + GAP)}
                      y={24}
                      fill="#8b949e"
                      fontSize={8}
                      fontFamily="monospace"
                    >
                      {m.label}
                    </text>
                  ))}

                  {DAY_LABELS.map((label, di) =>
                    label ? (
                      <text
                        key={di}
                        x={0}
                        y={TOP + di * (CELL + GAP) + CELL - 1}
                        fill="#8b949e"
                        fontSize={7}
                        fontFamily="monospace"
                      >
                        {label}
                      </text>
                    ) : null
                  )}

                  {weeks.map((week, wi) =>
                    week.days.map((cell, di) => {
                      if (!cell) return null;
                      const x = LEFT + wi * (CELL + GAP);
                      const y = TOP + di * (CELL + GAP);
                      const isHovered = hovered?.date === cell.date && !dragging;
                      return (
                        <rect
                          key={`${wi}-${di}`}
                          x={x}
                          y={y}
                          width={CELL}
                          height={CELL}
                          rx={2}
                          fill={LEVEL_COLORS[cell.level]}
                          stroke={isHovered ? "#00d4aa" : "#30363d"}
                          strokeWidth={isHovered ? 1.5 : 0.5}
                          style={{ transition: "stroke 0.1s, stroke-width 0.1s" }}
                          onMouseEnter={() => !isDragging.current && setHovered(cell)}
                          onMouseLeave={() => setHovered(null)}
                        />
                      );
                    })
                  )}
                </svg>
              </div>

              <div className="mt-2 text-xs text-center h-5 flex items-center justify-center">
                {hovered && !dragging ? (
                  <>
                    <span className="text-teal font-medium">
                      {hovered.level === 0
                        ? "No contributions"
                        : `${hovered.level} contribution${hovered.level > 1 ? "s" : ""}`}
                    </span>
                    <span className="text-text-secondary ml-2">{hovered.date}</span>
                  </>
                ) : (
                  <span className="text-text-secondary/50">Hover over a day to see details</span>
                )}
              </div>

              <div className="mt-4 space-y-3">
                <div
                  className="relative h-5 rounded-full bg-white/5 cursor-pointer"
                  onPointerDown={onBarDown}
                >
                  <div
                    ref={progressLineRef}
                    className="absolute top-1/2 -translate-y-1/2 h-1 rounded-full bg-teal/30"
                    style={{ width: "0%" }}
                  />
                  <div
                    ref={progressThumbRef}
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-teal shadow-lg shadow-teal/20"
                    style={{ left: "-8px" }}
                  />
                </div>

                <div className="flex items-center gap-2 justify-end">
                  <span className="text-[10px] text-text-secondary font-mono">Less</span>
                  {LEVEL_COLORS.map((color, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <span className="text-[10px] text-text-secondary font-mono">More</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
