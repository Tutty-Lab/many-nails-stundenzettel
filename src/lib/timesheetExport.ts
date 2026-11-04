import type { Employee, Schedule } from "../types";
export function timesheetFingerprint(schedule: Schedule, employees: readonly Employee[]): string {
  return JSON.stringify([schedule.year, schedule.month, schedule.companyName, schedule.address, schedule.workHours, schedule.dateOverrides, employees, schedule.shifts]);
}
export function staleExports(schedule: Schedule, fingerprint: string) {
  const month = `${schedule.year}-${String(schedule.month).padStart(2,"0")}`;
  const latest = new Map<string, NonNullable<Schedule["pdfExports"]>[number]>();
  for (const e of schedule.pdfExports ?? []) if(e.kind === "timesheet" && e.from.startsWith(month)) latest.set(`${e.from}:${e.to}`,e);
  const entries = [...latest.values()];
  return entries.filter(e => e.fingerprint != null && e.fingerprint !== fingerprint && !entries.some(n => n.fingerprint === fingerprint && n.from <= e.from && n.to >= e.to));
}
