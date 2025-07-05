import './index.scss';
import { View, Text, Button } from '@tarojs/components';
import React from 'react';
import { RecordCardProps } from './types';
import { buildWeekRange } from '@/utils/dateUtils';

// 预约记录卡片
const RecordCard: React.FC<RecordCardProps> = ({
  date,
  location,
  status,
  type,
  id,
  onCancel,
}) => {
  // 处理日期显示
  const displayDate = type === 'week' ? buildWeekRange(date) : date;

  // 根据状态计算显示文本和按钮
  const getStatusInfo = () => {
    switch (status) {
      case 'booked':
        return {
          text: '已预约',
          button: (
            <Button
              className="record-btn record-btn-booked"
              onClick={() => id && onCancel && onCancel(id)}
            >
              取消预约
            </Button>
          ),
        };
      case 'effective':
        return {
          text: '已生效',
          button: (
            <Button className="record-btn record-btn-effective" disabled>
              已生效
            </Button>
          ),
        };
      case 'completed':
        return {
          text: '已完成',
          button: (
            <Button className="record-btn record-btn-completed" disabled>
              已完成
            </Button>
          ),
        };
      case 'cancelled':
        return {
          text: '已取消',
          button: (
            <Button className="record-btn record-btn-cancelled" disabled>
              已取消
            </Button>
          ),
        };
      case 'violated':
        return {
          text: '违约',
          button: (
            <Button className="record-btn record-btn-violated" disabled>
              违约
            </Button>
          ),
        };
      default:
        return {
          text: '未知状态',
          button: null,
        };
    }
  };

  const { text: statusText, button: actionButton } = getStatusInfo();

  return (
    <>
      <View className="record-card">
        <View className="record-date">{displayDate}</View>
        <View className="record-detail">
          <Text className="record-location">南湖综合楼{location}</Text>
          <Text className={`record-status`}>{statusText}</Text>
          <View style={{ marginLeft: 'auto' }}>{actionButton}</View>
        </View>
      </View>
    </>
  );
};

export default RecordCard;
