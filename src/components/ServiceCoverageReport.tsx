import type {Schedule} from "../types";
export function ServiceCoverageReport({schedule}:{schedule:Schedule}){return <p className="mb-3 text-sm text-slate-600">Many Nails: tối thiểu 2 nhân viên suốt 09:30–19:30, không tính chủ. Xem báo cáo Độ phủ. {schedule.employees.some(e=>!e.ownerSupport&&e.targetMinutes===0)?"Chưa đủ giờ hợp đồng; cần bổ sung trước khi tạo lịch thực tế.":""}</p>;}
