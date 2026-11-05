import type { Employee } from "../types";
import { DEFAULT_HOURLY_RATE, salaryToMinutes } from "./payroll";
const staff = (id:string,name:string,salary:number,type:Employee["employmentType"]):Employee => ({ id,name,employmentType:type,station:"BOTH",role:"Thợ nail",monthlySalary:salary,hourlyRate:DEFAULT_HOURLY_RATE,quotaSource:"salary",targetMinutes:salaryToMinutes(salary,DEFAULT_HOURLY_RATE),referenceEstimated:true });
/** Seeded from the October 2026 payroll. Hours are estimated: Brutto / 13.90 €/h. */
export function manyNailsEmployees(): Employee[] { return [
 staff("mn-1","Dinh Thao Nguyen",603,"MINIJOB"),
 staff("mn-2","Tien Anh Ngo",1700,"TEILZEIT"),
 staff("mn-3","Thi Mai Nguyen",1200,"TEILZEIT"),
 staff("mn-4","Thi Bich Uyen Phung",1200,"TEILZEIT"),
 staff("mn-5","Dinh Thuan Tran",1500,"TEILZEIT"),
 {id:"mn-owner",name:"Chủ",employmentType:"VOLLZEIT",station:"BOTH",targetMinutes:0,ownerSupport:true},
 ]; }
