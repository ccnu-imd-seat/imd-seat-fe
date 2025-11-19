export interface ReservationErrorInfo {
  title: string;
  detail?: string;
}

export const RESERVATION_ERROR_MESSAGES: Record<number, ReservationErrorInfo> =
  {
    4001: {
      title: '预约请求不合规',
      detail: '用户发起的预约请求不符合要求',
    },
    4002: {
      title: '已经签到过了',
      detail: '用户已经签到，不能重复签到',
    },
    4003: {
      title: '未预约该座位或获取数据库出错',
      detail: '用户未预约该座位或查询数据库时出错',
    },
    4004: {
      title: '已超过签到时间',
      detail: '当前时间已超过签到时间，无法签到',
    },
  };

export const formatReservationError = (
  code?: number,
  fallback?: string
): string | null => {
  if (code && RESERVATION_ERROR_MESSAGES[code]) {
    const info = RESERVATION_ERROR_MESSAGES[code];
    return info.detail ? `${info.title}：${info.detail}` : info.title;
  }
  return fallback ?? null;
};
