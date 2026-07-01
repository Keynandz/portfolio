import { NextResponse } from "next/server";

const GITHUB_USER = "Keynandz";

const SUCCESS_CACHE = "public, s-maxage=3600, stale-while-revalidate=86400";
const FAIL_CACHE = "no-store";

function unavailable() {
  return NextResponse.json(
    { username: GITHUB_USER, available: false },
    { status: 200, headers: { "Cache-Control": FAIL_CACHE } }
  );
}

export async function GET() {
  try {
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USER}`);
    if (!userRes.ok) {
      return unavailable();
    }
    const userData = await userRes.json();
    const joinDate = new Date(userData.created_at);
    const joinYear = joinDate.getFullYear();
    const joinMonth = joinDate.getMonth();
    const currentYear = new Date().getFullYear();

    const years: number[] = [];
    for (let y = joinYear; y <= currentYear; y++) years.push(y);

    const allContributions: { date: string; level: number }[] = [];
    const yearTotals: Record<number, number> = {};

    const fetches = years.map(async (year) => {
      try {
        const from = year === joinYear
          ? `${year}-${String(joinMonth + 1).padStart(2, "0")}-01`
          : `${year}-01-01`;
        const to = `${year}-12-31`;
        const res = await fetch(
          `https://github.com/users/${GITHUB_USER}/contributions?from=${from}&to=${to}`,
          { headers: { "User-Agent": "Mozilla/5.0" } }
        );
        if (!res.ok) return [];

        const html = await res.text();

        const contributions: { date: string; level: number }[] = [];
        const tdRegex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g;
        let match;
        while ((match = tdRegex.exec(html)) !== null) {
          contributions.push({ date: match[1], level: parseInt(match[2]) });
        }

        const totalMatch = html.match(/([\d,]+)\s*contributions/i);
        yearTotals[year] = totalMatch ? parseInt(totalMatch[1].replace(/,/g, "")) : 0;

        return contributions;
      } catch {
        return [];
      }
    });

    const results = await Promise.all(fetches);
    results.forEach((contribs) => {
      if (contribs) allContributions.push(...contribs);
    });

    allContributions.sort((a, b) => a.date.localeCompare(b.date));

    let trimmed = allContributions;
    if (joinYear === 2023) {
      const augPadding = [];
      for (let i = 1; i <= 31; i++) {
        const dateStr = `2023-08-${String(i).padStart(2, "0")}`;
        if (!trimmed.some((c) => c.date === dateStr)) {
          augPadding.push({ date: dateStr, level: 0 });
        }
      }
      trimmed = [...augPadding, ...trimmed];
      trimmed.sort((a, b) => a.date.localeCompare(b.date));
      const augIndex = trimmed.findIndex((c) => c.date === "2023-08-01");
      if (augIndex >= 0) {
        trimmed = trimmed.slice(augIndex);
      }
    } else {
      const firstActive = trimmed.findIndex((c) => c.level > 0);
      trimmed = firstActive > 0 ? trimmed.slice(firstActive) : trimmed;
    }

    if (!trimmed || trimmed.length === 0) {
      return unavailable();
    }

    return NextResponse.json(
      {
        username: GITHUB_USER,
        joinYear,
        currentYear,
        years,
        yearTotals,
        contributions: trimmed,
        available: true,
      },
      { headers: { "Cache-Control": SUCCESS_CACHE } }
    );
  } catch {
    return unavailable();
  }
}
