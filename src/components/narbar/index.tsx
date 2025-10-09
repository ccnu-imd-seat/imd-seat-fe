import { View } from '@tarojs/components';
import React from 'react';
import './index.scss'

const Narbar: React.FC = () => {
  return (
    <>
    <View className="custom-navbar">
      <View className="nav-title-box">
        <View style={{ padding: '20px', backgroundColor: '#f5f5f5' }}></View>
        <View className="nav-title">自习室预约</View>
        <View className="nav-subtitle">信息管理学院</View>
      </View>
    </View>
     <View style={{ padding: '45px', backgroundColor: '#f5f5f5' }}></View>
    </>
  );
};

export default Narbar;
