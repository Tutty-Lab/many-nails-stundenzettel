import { expect, it, vi } from "vitest";
import { initialScheduleFor, STORES } from "../stores";
import { applyMigrations } from "../migrations";
import { normalizeWorkHours } from "../workHours";
import { loadState, saveState } from "../storage";

it("keeps edited hours and closed days through save, reload and repeated migrations", () => {
  const memory = new Map<string,string>();
  vi.stubGlobal("localStorage", { getItem: (key:string) => memory.get(key) ?? null, setItem: (key:string,value:string) => memory.set(key,value) });
  try {
    const base = applyMigrations("many-nails", initialScheduleFor(STORES[0]));
    base.workHours.perWeekday.monday = [{ startMinutes: 600, endMinutes: 1140 }];
    base.workHours.perWeekday.tuesday = [];
    base.workHours.holiday = [];
    base.workHours.closedWeekdays.wednesday = true;
    saveState("many-nails", { schedule: base, originalShifts: [] });
    for (let i=0;i<3;i++) {
      const loaded = loadState("many-nails")!;
      loaded.schedule = applyMigrations("many-nails", { ...loaded.schedule, workHours: normalizeWorkHours(loaded.schedule.workHours) });
      expect(loaded.schedule.workHours).toEqual(base.workHours);
      saveState("many-nails", loaded);
    }
  } finally { vi.unstubAllGlobals(); }
});
