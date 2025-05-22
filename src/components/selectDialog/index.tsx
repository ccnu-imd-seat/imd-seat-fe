import './index.scss';
import { View, Text, Button } from '@tarojs/components';

interface SelectDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  roomNo: string | number;
  seatNo: string | number;
  date: string;
}

// 选择座位弹窗
const SelectDialog: React.FC<SelectDialogProps> = ({
  open,
  onCancel,
  onConfirm,
  roomNo,
  seatNo,
  date,
}) => {
  if (!open) return null;
  return (
    <View className="select-dialog__mask">
      <View className="select-dialog__container">
        <View className="select-dialog__content">
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '15px',
              marginBottom: '20px',
            }}
          >
            <Text className="room-number">教室：{roomNo}</Text>
            <Text className="seat-number">座位号：{seatNo}</Text>
          </View>
          <Text className="date">日期: {date} </Text>
        </View>
        <View className="select-dialog__actions">
          <Button className="select-dialog__btn1" onClick={onCancel}>
            取消
          </Button>
          <Button className="select-dialog__btn2" onClick={onConfirm}>
            确认
          </Button>
        </View>
      </View>
    </View>
  );
};

export default SelectDialog;
