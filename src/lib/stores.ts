import type { Employee, Schedule } from "../types";
import { type WeekdayKey } from "./demand";
import { type DemandBand, type StaffingRule } from "./staffing";
import { DEFAULT_WORK_HOURS } from "./workHours";
import { manyNailsEmployees } from "./restaurantData";
import { clip } from "./staffing";
import type { WorkHoursConfig } from "./workHours";
export type StoreConfig = { id:string; name:string; shortName:string; address:string; sampleEmployees:()=>Employee[]; workHours?:WorkHoursConfig; notes?:string; demandProfile?:readonly DemandBand[]; dayWeights:Record<WeekdayKey,number>; staffingRules:readonly StaffingRule[] };
const open={startMinutes:570,endMinutes:1170};
const manyNailsHours:WorkHoursConfig={perWeekday:{monday:[open],tuesday:[open],wednesday:[open],thursday:[open],friday:[open],saturday:[open],sunday:[]},holiday:[],closedWeekdays:{monday:false,tuesday:false,wednesday:false,thursday:false,friday:false,saturday:false,sunday:true}};
const rules:readonly StaffingRule[]=[
 {priority:"required",weight:100,label:"Tối thứ Sáu ≥ 2 nhân viên",when:"Thứ Sáu 17:00–19:30",weekdays:["friday"],minStaff:2,maxStaff:Infinity,scaled:false,who:(e)=>!e.ownerSupport,windows:clip(1020,1170)},
 {priority:"required",label:"Ít nhất 2 nhân viên",when:"09:30–19:30",minStaff:2,maxStaff:Infinity,scaled:false,who:(e)=>!e.ownerSupport,windows:clip(570,1170)},
 {priority:"required",weight:100,label:"Nhân viên chốt ca",when:"Mỗi ngày đến 19:30",minStaff:1,maxStaff:Infinity,scaled:false,who:(e)=>!e.ownerSupport,windows:clip(1140,1170)},
];
export const STORES:StoreConfig[]=[{id:"many-nails",name:"Many Nails",shortName:"Many Nails",address:"Wormser Straße 23, 67227 Frankenthal",sampleEmployees:manyNailsEmployees,workHours:manyNailsHours,staffingRules:rules,demandProfile:[{startMinutes:570,endMinutes:840,level:1,label:"Vormittag"},{startMinutes:840,endMinutes:1170,level:1.5,label:"Stoßzeit ab 14:00"}],dayWeights:{monday:0.8,tuesday:0.8,wednesday:0.8,thursday:1.2,friday:1.4,saturday:1.5,sunday:1},notes:"Arbeitszeit 09:30–19:30. Montag bis Mittwoch ruhiger; Donnerstag bis Samstag stärker. Monatsanfang 01–10 sowie ab 23. meist stärker. Stoßzeit ab 14:00, morgens ebenfalls gut. Ziel: immer mindestens 2 Mitarbeitende. Freitagabend mindestens 2, eine Person bis 19:30. Inhaber ist meistens im Studio. An gesetzlichen Feiertagen geschlossen; an Weihnachten und Neujahr ebenfalls geschlossen. Giờ tháng tạm tính = Brutto ÷ 13,90 €/h; chờ xác nhận hợp đồng. Hệ số nhu cầu là tương đối, không phải tỷ lệ Umsatz đã đo."}];
export const DEFAULT_STORE_ID=STORES[0].id;
const STORE_KEY="many-nails-app:store";
export function loadStoreId(){try{const saved=localStorage.getItem(STORE_KEY);if(saved&&STORES.some(s=>s.id===saved))return saved;}catch{}return DEFAULT_STORE_ID;}
export function saveStoreId(id:string){try{localStorage.setItem(STORE_KEY,id);}catch{}}
export function storeById(id:string){return STORES.find(s=>s.id===id)??STORES[0];}
export function withSharedPersonDefaults(employees:Employee[],_store:StoreConfig){return employees;}
export function initialScheduleFor(store:StoreConfig):Schedule{return {companyName:store.name,address:store.address,year:2026,month:11,workHours:structuredClone(store.workHours??DEFAULT_WORK_HOURS),dateOverrides:[],employees:store.sampleEmployees(),shifts:[]};}
