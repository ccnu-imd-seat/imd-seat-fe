/** 将 yyyy-mm-dd 字符串转为 Date 对象 */
export function parseDate(str: string): Date {
  const [year, month, day] = str.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/** 从周范围字符串（如 '2024-06-10 —— 2024-06-16'）获取周一日期字符串 */
export function getMondayFromWeekRange(weekRange: string): string {
  return weekRange.split(' —— ')[0];
}

/** 由周一日期字符串拼接完整周范围（自动计算周日） */
export function buildWeekRange(monday: string): string {
  const mondayDate = new Date(monday);
  const sundayDate = new Date(mondayDate);
  sundayDate.setDate(mondayDate.getDate() + 6);
  const pad = (n: number) => n.toString().padStart(2, '0');
  const sundayStr = `${sundayDate.getFullYear()}-${pad(sundayDate.getMonth() + 1)}-${pad(sundayDate.getDate())}`;
  return `${monday} —— ${sundayStr}`;
}

/** 将example '2025-06-09——2025-06-15' 转换为 '6.9-6.15' 形式 */
export function changeWeekRange(weekRange: string): string {
  const [start, end] = weekRange.replace(/\s*/g, '').split('——');
  const [ startMonth, startDay] = start.split('-').map(Number);
  const [ endMonth, endDay] = end.split('-').map(Number);
  return `${startMonth}.${startDay}-${endMonth}.${endDay}`;
}
