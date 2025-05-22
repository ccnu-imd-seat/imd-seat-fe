import './index.scss';
import { View, Text, Button } from '@tarojs/components';
import React from 'react';

interface RecordCardProps {
  condition: boolean;
  date: string;
  location: string;
  status: string;
}

// 预约记录卡片
const RecordCard: React.FC<RecordCardProps> = ({
  condition,
  date,
  location,
  status,
}) => {
  return (
    <>
      {condition ? (
        <View className="record-card">
          <View className="record-date">{date}</View>
          <View className="record-detail">
            <Text className="record-location">{location}</Text>
            <Text className="record-status">{status}</Text>
            <Button className="record-btn">取消预约</Button>
          </View>
        </View>
      ) : (
        <View className="record-card">
          <View className="record-date">{date}</View>
          <View className="record-detail">
            <Text className="record-location">{location}</Text>
            <Text style={{ width: '30%' }}></Text>
            <Text className="record-tap">违约</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default RecordCard;
