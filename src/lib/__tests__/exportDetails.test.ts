import { expect, it } from "vitest";
import { dateRangeLabel } from "../dateLabel";
import { datesOfMonth } from "../demand";
import { weeksOfMonth } from "../weeks";
import { switchMonth } from "../monthArchive";
import { initialScheduleFor, STORES } from "../stores";
import { draftFrom, draftToEmployee } from "../../components/EmployeesTab";

it("labels full and partial weeks with calendar dates including the year", () => {
  expect(dateRangeLabel(datesOfMonth(2028, 2))).toBe("01/02/2028 – 29/02/2028");
  expect(dateRangeLabel(weeksOfMonth(2026, 11)[0].dates)).toBe("01/11/2026 – 01/11/2026");
  expect(dateRangeLabel(weeksOfMonth(2026, 11)[1].dates)).toBe("02/11/2026 – 08/11/2026");
});

it("keeps export history when switching months", () => {
  const base = initialScheduleFor(STORES[0]);
  const entry = {kind: "timesheet" as const, from:"2026-11-02", to:"2026-11-08", exportedAt:"2026-11-05T12:00:00Z"};
  const next = switchMonth({...base, pdfExports:[entry]}, [], 2026, 12).schedule;
  expect(switchMonth(next, [], 2026, 11).schedule.pdfExports).toEqual([entry]);
});

it("derives monthly hours from monthly salary divided by hourly rate", () => {
  const draft = draftFrom(initialScheduleFor(STORES[0]).employees[0]);
  Object.assign(draft, {quotaSource: "salary", monthlySalary: "1700", hourlyRate: "13,60", hours: "999"});
  const employee = {id: "test", ...draftToEmployee(draft)};
  expect(employee.targetMinutes).toBe(125 * 60);
  expect(employee.quotaSource).toBe("salary");
  expect(draftFrom(employee).quotaSource).toBe("salary");
});

it("uses entered monthly hours and keeps the salary when entering total hours", () => {
  const draft = draftFrom(initialScheduleFor(STORES[0]).employees[0]);
  Object.assign(draft, {quotaSource: "salary", monthlySalary: "1700", hourlyRate: "13,60"});
  draft.quotaSource = "hours";
  draft.hours = "80,5";
  const employee = {id: "test", ...draftToEmployee(draft)};
  expect(employee.targetMinutes).toBe(4830);
  expect(employee.quotaSource).toBe("hours");
  expect(employee.monthlySalary).toBe(1700);
  expect(employee.hourlyRate).toBe(13.6);
  expect(draftFrom(employee).quotaSource).toBe("hours");
});

it("opens legacy employees by whether they have a monthly salary", () => {
  const base = initialScheduleFor(STORES[0]).employees[0];
  expect(draftFrom({...base, quotaSource: undefined, monthlySalary: 600}).quotaSource).toBe("salary");
  expect(draftFrom({...base, quotaSource: undefined, monthlySalary: undefined}).quotaSource).toBe("hours");
});

it("keeps the owner at zero hours without requiring a salary", () => {
  const draft = draftFrom(initialScheduleFor(STORES[0]).employees[0]);
  Object.assign(draft, {ownerSupport: true, quotaSource: "salary", monthlySalary: "", hourlyRate: ""});
  expect(draftToEmployee(draft).targetMinutes).toBe(0);
});
