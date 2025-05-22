import { View, Text, Image } from '@tarojs/components';
import './index.scss';
import FreeChair from '../../assets/icons/chair-free.png';
import BusyChair from '../../assets/icons/chair-busy.png';
import React from 'react';

interface ChairProps {
  num: number;
  status: 'free' | 'busy';
  onClick?: () => void;
}

//椅子卡片
const Chair: React.FC<ChairProps> = ({ num, status, onClick }) => {
  const icon = status === 'busy' ? BusyChair : FreeChair;
  return (
    <View
      className={`seat${status !== 'free' ? ' busy' : ''}`}
      onClick={() => {
        if (status === 'free' && onClick) onClick();
      }}
      style={{
        cursor: status === 'free' ? 'pointer' : 'not-allowed',
      }}
    >
      <Image className="seat-icon" src={icon} />
      <Text className="seat-num">{num.toString().padStart(2, '0')}</Text>
    </View>
  );
};

export default Chair;
