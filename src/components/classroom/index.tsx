import { View, Text, Image } from '@tarojs/components';
import React from 'react';
import classroom from '../../assets/icons/classroom.png';
import './index.scss';

interface ClassroomCardProps {
  roomNo: string | number;
}

// 教室卡片
const ClassroomCard: React.FC<ClassroomCardProps> = ({ roomNo }) => {
  return (
    <View className="classroom-card">
      <Image className="classroom-card-img" src={classroom} />
      <Text className="classroom-card-no">{roomNo}</Text>
    </View>
  );
};

export default ClassroomCard;
