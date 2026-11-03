import type { SpecialRequirement } from "../types";
import { clip, type StaffingRule } from "./staffing";
import { minutesToTime } from "./time";
export function specialRules(requirements:readonly SpecialRequirement[]=[]):StaffingRule[]{
 return requirements.filter(r=>r.days.length>0&&r.startMinutes>=0&&r.endMinutes<=1440&&r.endMinutes>r.startMinutes&&Number.isInteger(r.minStaff)&&r.minStaff>0).map(r=>({priority:"required",label:`Yêu cầu ${r.id}: ≥${r.minStaff} người`,when:`${minutesToTime(r.startMinutes)}–${minutesToTime(r.endMinutes)}`,weekdays:r.days,onHolidays:false,minStaff:r.minStaff,maxStaff:Infinity,scaled:false,who:e=>!e.ownerSupport,windows:clip(r.startMinutes,r.endMinutes)}));
}
