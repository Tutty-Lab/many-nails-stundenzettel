import {useState} from "react";
import type {UseScheduleReturn} from "../hooks/useSchedule";
import type {SpecialRequirement} from "../types";
import {WEEKDAY_SHORT_VI,type WeekdayKey} from "../lib/demand";
import {minutesToTime,timeToMinutes} from "../lib/time";
const days=Object.keys(WEEKDAY_SHORT_VI) as WeekdayKey[];
export function SpecialRequirementsSettings({store}:{store:UseScheduleReturn}){
 const [selected,setSelected]=useState<WeekdayKey[]>(["friday"]),[start,setStart]=useState("17:00"),[end,setEnd]=useState("19:30"),[count,setCount]=useState("2"),[error,setError]=useState("");
 const rules=store.schedule.specialRequirements??[];
 const save=(next:SpecialRequirement[])=>store.updateMeta({specialRequirements:next});
 const add=()=>{
  const minStaff=Number(count),from=timeToMinutes(start||"00:00"),to=timeToMinutes(end||"00:00");
  if(!selected.length||!start||!end||from>=to||!Number.isInteger(minStaff)||minStaff<1||minStaff>100){setError("Chọn ngày, giờ bắt đầu trước giờ kết thúc, số người từ 1–100.");return;}
  save([...rules,{id:crypto.randomUUID(),days:selected,startMinutes:from,endMinutes:to,minStaff}]);setError("");
 };
 return <section className="rounded-lg border bg-white p-4 space-y-3"><h2 className="font-semibold">Yêu cầu đặc biệt</h2><p className="text-sm text-slate-600">Số nhân viên tối thiểu theo ngày và giờ, không tính chủ. Chỉ áp dụng trong giờ tiệm làm; ngày lễ đóng cửa không xếp ca. Giữ ngày nghỉ, giới hạn giờ và ca riêng của nhân viên. Nếu không đủ người, báo thiếu trong Độ phủ.</p>
 <p className="text-sm text-amber-800">Lưu tự động theo tiệm. Sau khi thay đổi, tạo lại lịch. Các khung chồng nhau lấy số người lớn nhất, không cộng dồn.</p>
 <fieldset disabled={store.isLocked} className="space-y-3 disabled:opacity-50"><legend className="sr-only">Thêm yêu cầu</legend>
 <div className="flex flex-wrap gap-3">{days.map(d=><label key={d} className="text-sm"><input type="checkbox" checked={selected.includes(d)} onChange={()=>setSelected(selected.includes(d)?selected.filter(x=>x!==d):[...selected,d])}/> {WEEKDAY_SHORT_VI[d]}</label>)}</div>
 <div className="flex flex-wrap items-end gap-3"><label className="text-sm">Từ giờ<input className="block rounded border p-2" type="time" step="1800" value={start} onChange={e=>setStart(e.target.value)}/></label><label className="text-sm">Đến giờ<input className="block rounded border p-2" type="time" step="1800" value={end} onChange={e=>setEnd(e.target.value)}/></label><label className="text-sm">Ít nhất bao nhiêu người<input className="block w-32 rounded border p-2" type="number" min="1" max="100" step="1" value={count} onChange={e=>setCount(e.target.value)}/></label><button type="button" className="rounded bg-slate-900 px-3 py-2 text-sm text-white" onClick={add}>Thêm yêu cầu</button></div>
 {error&&<p role="alert" className="text-sm text-red-700">{error}</p>}
 {!rules.length&&<p className="text-sm text-slate-500">Chưa có yêu cầu đặc biệt.</p>}
 {rules.map(r=><div key={r.id} className="flex items-center justify-between gap-3 rounded border p-3 text-sm"><span>{r.days.map(d=>WEEKDAY_SHORT_VI[d]).join(", ")} · {minutesToTime(r.startMinutes)}–{minutesToTime(r.endMinutes)} · ít nhất {r.minStaff} nhân viên</span><button type="button" className="text-red-700" onClick={()=>save(rules.filter(x=>x.id!==r.id))}>Xóa</button></div>)}
 </fieldset>{store.isLocked&&<p className="text-sm text-amber-800">Mở khóa lịch trước khi sửa yêu cầu.</p>}</section>;
}
