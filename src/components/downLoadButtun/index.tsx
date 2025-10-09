import { View, Text } from '@tarojs/components';
import React from 'react';
import './index.scss';

interface downLoadButtonProps {
  onClick: () => void;
}

// 教室卡片
const DownLoadButton: React.FC<downLoadButtonProps> = ({ onClick }) => {
  return (
    <View className="bt-container" onClick={onClick}>
      <Text className="bt-text">管理员</Text>
      <View className="bt-icon" />
    </View>
  );
};

export default DownLoadButton;
