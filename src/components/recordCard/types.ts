import { AppointStatus } from '../../../types/index';

export interface RecordCardProps {
  date: string;
  location: string;
  status: AppointStatus;
  type: 'week' | 'day';
  id?: number | string;
  onCancel?: (id: number | string) => void;
}
