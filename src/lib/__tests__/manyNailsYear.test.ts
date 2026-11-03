import { expect, it } from "vitest";
import { STORES, initialScheduleFor } from "../stores";
import { generateSchedule } from "../scheduler";
import { datesOfMonth, parseIsoDate, weekdayKeyOf } from "../demand";
import { publicHolidays } from "../holidays";
import { resolveDay } from "../workHours";
import { coveragePoints, workingAt } from "../staffing";
import { validateSchedule } from "../validation";
it("covers daily closing across all twelve months of 2026", () => {
 const store=STORES[0],base=initialScheduleFor(store),holidays=publicHolidays(2026);
 for(let month=1;month<=12;month++) {
  const shifts=generateSchedule({...base,month,rules:store.staffingRules,weights:store.dayWeights,demandProfile:store.demandProfile,storeTag:store.id});
  const open=datesOfMonth(2026,month).filter(date=>!resolveDay(base.workHours,date,holidays).closed);
  let fridayGaps=0,closingGaps=0,allDayGaps=0;
  for(const date of open) {
   const day=shifts.filter(s=>s.date===date);
   const count=(minute:number)=>new Set(day.filter(s=>workingAt(s,minute)).map(s=>s.employeeId)).size;
   const points=coveragePoints(day,570,1170).filter(m=>m>=570&&m<1170);
   if(points.some(m=>count(m)<2))allDayGaps++;
   if(coveragePoints(day,1140,1170).filter(m=>m>=1140&&m<1170).some(m=>count(m)<1))closingGaps++;
   if(weekdayKeyOf(parseIsoDate(date))==="friday"&&coveragePoints(day,1020,1170).filter(m=>m>=1020&&m<1170).some(m=>count(m)<2))fridayGaps++;
  }
  const v=validateSchedule(base.employees,shifts,2026,open,base.workHours);
  console.log(JSON.stringify({month,openDays:open.length,fridayGaps,closingGaps,allDayGaps,paidHours:shifts.reduce((n,s)=>n+s.paidMinutes,0)/60,errors:v.errors.filter(e=>e.severity!=="warning").length}));

  expect(closingGaps,`Closing month ${month}`).toBe(0);
  expect(v.errors.filter(e=>e.severity!=="warning"),`Contracts month ${month}`).toEqual([]);
  expect(shifts.every(s=>s.startMinutes>=570&&s.endMinutes<=1170&&open.includes(s.date))).toBe(true);
 }
},180000);
