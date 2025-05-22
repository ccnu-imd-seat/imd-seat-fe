import './index.scss';
import { View, Text, Image } from '@tarojs/components';
import Shutdown from '../../assets/icons/cancel2.png';

interface RuleDialogProps {
  open: boolean;
  onShutdown: () => void;
}

// 预约规则弹窗
const RuleDialog: React.FC<RuleDialogProps> = ({ open, onShutdown }) => {
  if (!open) return null;
  return (
    <View className="rule-dialog__mask">
      <View className="rule-dialog__container">
        <View className="rule-dialog__title">
          <Text>预约机制</Text>
        </View>
        <Image
          className="rule-dialog__close"
          src={Shutdown}
          onClick={onShutdown}
        />
        <View className="rule-dialog__content">
          <Text>
            按天预约时间:只能预约本周的时 间。每天的18:00到21:00点之
            间可预约本周的剩余天数。
          </Text>
          <Text>
            按周预约时间:只能预约下周的时 间。本周周日早上九点到晚上九点
            之间可以预约下周的整周
          </Text>
          <Text>
            每天晚上十点有专门人员扫楼，安置(第二天)无人预约却有物品的座位
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RuleDialog;
