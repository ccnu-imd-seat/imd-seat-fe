export interface RecordCardProps {
  condition: boolean;
  date: string;
  location: string;
  status: string;
  type: 'week' | 'day';
  id?: number | string;
  onCancel?: (id: number | string) => void;
}
