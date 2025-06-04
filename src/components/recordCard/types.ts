export interface RecordCardProps {
  condition: boolean;
  date: string;
  location: string;
  status: string;
  id?: number | string;
  onCancel?: (id: number | string) => void;
}
