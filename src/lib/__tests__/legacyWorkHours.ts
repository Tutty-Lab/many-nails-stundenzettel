import type {WorkHoursConfig} from "../workHours";
const blocks=[{startMinutes:690,endMinutes:900},{startMinutes:1020,endMinutes:1320}];
export const DEFAULT_WORK_HOURS:WorkHoursConfig={perWeekday:{monday:blocks,tuesday:blocks,wednesday:blocks,thursday:blocks,friday:blocks,saturday:blocks,sunday:blocks},holiday:blocks,closedWeekdays:{monday:true,tuesday:false,wednesday:false,thursday:false,friday:false,saturday:false,sunday:false}};
