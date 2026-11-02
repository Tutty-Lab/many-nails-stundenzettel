import type { Schedule } from "../types";
import { manyNailsEmployees } from "./restaurantData";
export function applyMigrations(storeId:string,schedule:Schedule):Schedule {
 const id="2026-11-many-nails-salary-hours";
 if(storeId!=="many-nails"||schedule.migrations?.includes(id))return schedule;
 const defaults=new Map(manyNailsEmployees().map(e=>[e.id,e]));
 return {...schedule,employees:schedule.employees.map(e=>{
  const seed=defaults.get(e.id);
  if(!seed||e.ownerSupport||e.targetMinutes>0||e.weeklyHours||e.monthlySalary)return e;
  return {...e,monthlySalary:seed.monthlySalary,hourlyRate:seed.hourlyRate,quotaSource:"salary",targetMinutes:seed.targetMinutes,referenceEstimated:true};
 }),migrations:[...(schedule.migrations??[]),id]};
}
