import type { Schedule } from "../types";
import { manyNailsEmployees } from "./restaurantData";
export function applyMigrations(storeId:string,schedule:Schedule):Schedule {
 if(storeId!=="many-nails") return schedule;
 const salaryId="2026-11-many-nails-salary-hours", namesId="2026-11-many-nails-payroll-names", sundayId="2026-11-many-nails-sunday-closed";
 const defaults=new Map(manyNailsEmployees().map(e=>[e.id,e]));
 const employees=schedule.employees.map(e=>{const seed=defaults.get(e.id);if(!seed||e.ownerSupport)return e;return {...e,name:seed.name,employmentType:seed.employmentType,monthlySalary:seed.monthlySalary,hourlyRate:seed.hourlyRate,quotaSource:"salary" as const,targetMinutes:seed.targetMinutes,referenceEstimated:true};});
 const workHours={...schedule.workHours,perWeekday:{...schedule.workHours.perWeekday,sunday:[]},closedWeekdays:{...schedule.workHours.closedWeekdays,sunday:true}};
 return {...schedule,employees,workHours,migrations:[...(schedule.migrations??[]),...(schedule.migrations?.includes(salaryId)?[]:[salaryId]),...(schedule.migrations?.includes(namesId)?[]:[namesId]),...(schedule.migrations?.includes(sundayId)?[]:[sundayId])]};
}
