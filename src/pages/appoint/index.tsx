import { View, Text, Image } from '@tarojs/components';
import React, { useState } from 'react';
import FreeChair from '../../assets/icons/chair-free.png';
import BusyChair from '../../assets/icons/chair-free.png';
import SelectedChair from '../../assets/icons/chair-free.png';
import ArrowLeft from '../../assets/icons/chair-free.png';
import InfoIcon from '../../assets/icons/chair-free.png';
import './index.scss';

const days = [13, 14, 15, 16, 17, 18, 19, 20];
const seats = Array.from({ length: 30 }, (_, i) => i + 1);

const AppointPage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(14);
  const [selectedSeat, setSelectedSeat] = useState(1);

  // 示例座位状态，实际应从接口获取
  const seatStatus = seats.map((num) => {
    if (num === selectedSeat) return 'selected';
    if ([2, 3, 4, 5].includes(num)) return 'busy';
    if (num === 1) return 'free';
    return 'empty';
  });

  return (
    <View className="appoint-page">
      <View className="appoint-navbar">
        <Image className="appoint-back" src={ArrowLeft} />
        <Text className="appoint-title">自习室预约</Text>
        <View className="appoint-navbar-actions">
          <Image className="appoint-navbar-action" src={InfoIcon} />
        </View>
      </View>
      <View className="appoint-mode-row">
        <Text className="appoint-mode-label">预约方式：</Text>
        <View className="appoint-mode-btn">天</View>
        <View className="appoint-status-labels">
          <View className="appoint-status-label free">空闲</View>
          <View className="appoint-status-label busy">忙碌</View>
        </View>
      </View>
      <View className="appoint-date-row">
        <Text className="appoint-date-month">5月</Text>
        {days.map((day) => (
          <View
            key={day}
            className={`appoint-date-btn${selectedDay === day ? ' active' : ''}`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </View>
        ))}
      </View>
      <View className="appoint-room-row">
        <Text className="appoint-room-label">选择教室：</Text>
        <Text className="appoint-room-value">513</Text>
        <View className="appoint-rule-btn">
          <Image className="appoint-rule-icon" src={InfoIcon} />
          <Text>预约机制</Text>
        </View>
      </View>
      <View className="appoint-arrow-row">
        <Image className="appoint-arrow-left" src={ArrowLeft} />
        <Text className="appoint-date-title">5.14</Text>
      </View>
      <View className="appoint-seat-area">
        {seats.map((num, idx) => {
          let status = seatStatus[idx];
          let icon = FreeChair;
          if (status === 'busy') icon = BusyChair;
          if (status === 'selected') icon = SelectedChair;
          return (
            <View
              key={num}
              className={`appoint-seat${status !== 'empty' ? ' ' + status : ''}`}
              onClick={() => status === 'free' && setSelectedSeat(num)}
            >
              <Image className="appoint-seat-icon" src={icon} />
              <Text className="appoint-seat-num">{num.toString().padStart(2, '0')}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default AppointPage;
