import type { Employee } from "../types";
/** Public starter records: enter names, contracts and pay through the employee editor. */
export function manyNailsEmployees(): Employee[] {
  return [...Array.from({length:5},(_,i):Employee=>({id:`mn-${i+1}`,name:`Nhân viên ${i+1}`,employmentType:i===0?"MINIJOB":"TEILZEIT",station:"BOTH",role:"Thợ nail · chờ xác nhận hợp đồng",quotaSource:"hours",targetMinutes:0,referenceEstimated:true})),
    {id:"mn-owner",name:"Chủ",employmentType:"VOLLZEIT",station:"BOTH",targetMinutes:0,ownerSupport:true}];
}
