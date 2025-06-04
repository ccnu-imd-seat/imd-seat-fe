import { View, Text, Image } from '@tarojs/components';
import './index.scss';
import FreeChair from '../../assets/icons/chair-free.png';
import BusyChair from '../../assets/icons/chair-busy.png';
import React from 'react';
import { SiteStatus } from '../../../types';

interface ChairProps {
  num: number;
  status: SiteStatus;
  onClick?: () => void;
}

//椅子卡片
const Chair: React.FC<ChairProps> = ({ num, status, onClick }) => {
  const icon = status === 'booked' ? BusyChair : FreeChair;
  return (
    <View
      className={`seat${status !== 'available' ? ' reserved' : ''}`}
      onClick={() => {
        if (status === 'available' && onClick) onClick();
      }}
      style={{
        cursor: status === 'available' ? 'pointer' : 'not-allowed',
      }}
    >
      <Image className="seat-icon" src={icon} />
      <Text className="seat-num">{num.toString().padStart(2, '0')}</Text>
    </View>
  );
};

export default Chair;
