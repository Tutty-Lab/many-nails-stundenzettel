import { useState } from "react";
import type { UseScheduleReturn } from "../hooks/useSchedule";
import { DEFAULT_BUSY_DATE_RANGES, type BusyDateRange } from "../lib/demand";

export function BusyDatesSettings({ store }: { store: UseScheduleReturn }) {
  const saved = store.schedule.busyDateRanges ?? DEFAULT_BUSY_DATE_RANGES;
  const [draft, setDraft] = useState<BusyDateRange[] | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const ranges = draft ?? saved;
  const change = (next: BusyDateRange[]) => { setDraft(next); setSuccess(false); setError(""); };
  const update = (index: number, patch: Partial<BusyDateRange>) => change(ranges.map((r, i) => i === index ? { ...r, ...patch } : r));
  const save = () => {
    if (ranges.some(r => !Number.isInteger(r.startDay) || r.startDay < 1 || r.startDay > 31 ||
      (r.endDay !== null && (!Number.isInteger(r.endDay) || r.endDay < r.startDay || r.endDay > 31)) ||
      !Number.isFinite(r.factor) || r.factor < 1 || r.factor > 10)) {
      setError("Ngày từ 1–31; ngày kết thúc phải sau hoặc bằng ngày bắt đầu. Hệ số từ 1–10.");
      return;
    }
    store.updateMeta({ busyDateRanges: ranges.map(r => ({ ...r })) });
    setDraft(null); setError(""); setSuccess(true);
  };
  return <section className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5 space-y-3">
    <h2 className="font-semibold">Ngày đông khách trong tháng</h2>
    <p className="text-sm text-slate-600">Áp dụng hằng tháng cho cửa hàng. Hệ số nhân với hệ số ngày trong tuần để ưu tiên phân bổ giờ, vẫn giữ định mức và điều kiện riêng của nhân viên.</p>
    <p className="text-sm text-slate-600">Ngoài các khoảng này: hệ số 1. Khoảng chồng nhau lấy hệ số lớn nhất. “Cuối tháng” tự theo tháng 28, 29, 30 hoặc 31 ngày.</p>
    <fieldset disabled={store.isLocked} className="space-y-3 disabled:opacity-50">
      <legend className="sr-only">Cấu hình ngày đông khách</legend>
      {ranges.map((range, index) => <div key={index} className="flex flex-wrap items-end gap-3 rounded border p-3">
        <label className="text-sm">Từ ngày<input aria-label={`Từ ngày khoảng ${index + 1}`} type="number" min="1" max="31" step="1" value={range.startDay || ""} onChange={e => update(index, { startDay: Number(e.target.value) })} className="block w-24 rounded border p-2" /></label>
        <label className="text-sm">Đến ngày<select aria-label={`Đến ngày khoảng ${index + 1}`} value={range.endDay ?? "end"} onChange={e => update(index, { endDay: e.target.value === "end" ? null : Number(e.target.value) })} className="block rounded border p-2">
          {Array.from({ length: 31 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
          <option value="end">Cuối tháng</option>
        </select></label>
        <label className="text-sm">Hệ số<input aria-label={`Hệ số khoảng ${index + 1}`} type="number" min="1" max="10" step="0.05" value={range.factor || ""} onChange={e => update(index, { factor: Number(e.target.value) })} className="block w-24 rounded border p-2" /></label>
        <button type="button" aria-label={`Xóa khoảng ${index + 1}`} onClick={() => change(ranges.filter((_, i) => i !== index))} className="px-2 py-2 text-sm text-red-700">Xóa</button>
      </div>)}
      {!ranges.length && <p className="text-sm text-slate-500">Không ưu tiên khoảng ngày nào; mọi ngày dùng hệ số tháng 1.</p>}
      <div className="flex flex-wrap gap-3">
        <button type="button" className="rounded border px-3 py-2 text-sm" onClick={() => change([...ranges, { startDay: 1, endDay: 10, factor: 1.25 }])}>Thêm khoảng ngày</button>
        <button type="button" className="rounded bg-slate-900 px-3 py-2 text-sm text-white" onClick={save}>Lưu ngày đông khách</button>
      </div>
    </fieldset>
    {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
    {success && <p role="status" className="text-sm text-green-700">Đã lưu. Tạo lại lịch để áp dụng.</p>}
    {draft && <p className="text-sm text-amber-800">Có thay đổi chưa lưu.</p>}
    {store.isLocked && <p className="text-sm text-amber-800">Mở khóa lịch trước khi sửa cấu hình.</p>}
  </section>;
}
