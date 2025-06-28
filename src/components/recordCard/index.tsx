import './index.scss';
import { View, Text, Button } from '@tarojs/components';
import React, { useState } from 'react';
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
  const [statusText, setStatusText] = useState('');
  if (type === 'week') {
    date = buildWeekRange(date);
  }

  let actionButton: React.ReactNode = null;
  switch (status) {
    case 'reserved':
      actionButton = (
        <Button
          className="record-btn record-btn-cancel"
          onClick={() => id && onCancel && onCancel(id)}
        >
          取消预约
        </Button>
      );
      setStatusText('已预约');
      break;
    case 'active':
      actionButton = (
        <Button className="record-btn record-btn-active" disabled>
          已生效
        </Button>
      );
      setStatusText('已生效');
      break;
    case 'completed':
      actionButton = (
        <Button className="record-btn record-btn-completed" disabled>
          已完成
        </Button>
      );
      setStatusText('已完成');
      break;
    case 'cancelled':
      actionButton = (
        <Button className="record-btn record-btn-cancelled" disabled>
          已取消
        </Button>
      );
      setStatusText('已取消');
      break;
    case 'breached':
      actionButton = (
        <Button className="record-btn record-btn-breached" disabled>
          违约
        </Button>
      );
      setStatusText('违约');
      break;
    default:
      actionButton = null;
      setStatusText('未知状态');
  }

  return (
    <>
      <View className="record-card">
        <View className="record-date">{date}</View>
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
