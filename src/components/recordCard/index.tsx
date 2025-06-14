import './index.scss';
import { View, Text, Button } from '@tarojs/components';
import React from 'react';
import { RecordCardProps } from './types';
import { buildWeekRange } from '@/utils/dateUtils';

// 预约记录卡片
const RecordCard: React.FC<RecordCardProps> = ({
  condition,
  date,
  location,
  status,
  type,
  id,
  onCancel,
}) => {

  if (type === 'week' ) {
    date = buildWeekRange(date)
  }

  return (
    <>
      {condition ? (
        <View className="record-card">
          <View className="record-date">{date}</View>
          <View className="record-detail">
            <Text className="record-location">南湖综合楼{location}</Text>
            <Text className="record-status">{status}</Text>
            <View style={{ marginLeft: 'auto' }}>
              <Button
                className="record-btn"
                onClick={() => id && onCancel && onCancel(id)}
              >
                取消预约
              </Button>
            </View>
          </View>
        </View>
      ) : (
        <View className="record-card">
          <View className="record-date">{date}</View>
          <View className="record-detail">
            <Text className="record-location">南湖综合楼{location}</Text>
            <Text className="record-tap">违约</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default RecordCard;
