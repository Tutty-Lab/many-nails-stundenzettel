import { expect,it } from "vitest";
import {STORES,initialScheduleFor} from "../stores";
import {publicHolidays} from "../holidays";
import {normalizeWorkHours,resolveDay} from "../workHours";
import {staffingWindows,weightedDailyTargets} from "../staffing";
import {monthDemandFactor} from "../demand";
it("opens Sundays and closes Rheinland-Pfalz holidays",()=>{
 const h=publicHolidays(2026),w=normalizeWorkHours(STORES[0].workHours);
 expect(h.has("2026-06-04")).toBe(true);expect(h.has("2026-11-01")).toBe(true);expect(h.has("2026-10-31")).toBe(false);
 expect(resolveDay(w,"2026-11-08",h).window).toEqual({startMinutes:570,endMinutes:1170});
 expect(resolveDay(w,"2026-06-04",h).closed).toBe(true);
});
it("requires two employees without counting the owner, one through closing",()=>{
 const s=STORES[0],employees=s.sampleEmployees(),owner=employees.find(e=>e.ownerSupport)!;
 expect(employees.filter(e=>!e.ownerSupport)).toHaveLength(5);
 expect(employees.filter(e=>!e.ownerSupport).every(e=>e.targetMinutes===0)).toBe(true);
 const windows=staffingWindows([{startMinutes:570,endMinutes:1170}],"friday",s.staffingRules);
 expect(windows[0].minStaff).toBe(2);expect(windows.every(w=>w.who?.(owner)===false)).toBe(true);
 expect(windows.at(-1)?.endMinutes).toBe(1170);
 expect(initialScheduleFor(s).companyName).toBe("Many Nails");
});
it("gives busy month periods more weight without changing total quota",()=>{
 expect(monthDemandFactor("2026-11-10")).toBeGreaterThan(monthDemandFactor("2026-11-11"));
 expect(monthDemandFactor("2026-11-23")).toBeGreaterThan(monthDemandFactor("2026-11-22"));
 const targets=weightedDailyTargets(["2026-11-10","2026-11-11"],100,()=>"monday");
 expect(targets.get("2026-11-10")!).toBeGreaterThan(targets.get("2026-11-11")!);
 expect([...targets.values()].reduce((a,b)=>a+b,0)).toBeCloseTo(100);
});
