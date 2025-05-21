import { View, Input, Image } from '@tarojs/components';
import pageBg from '../../assets/bg/login.png';
import './index.scss';
import { Button } from '@taroify/core';
import React from 'react';

const LoginPage: React.FC = () => {

  return (
    <View className="login-page">
      <Image className="login-bg" src={pageBg} mode="aspectFill" />
      <View className="login-header">
        <View className="login-hello">Hello</View>
        <View className="login-greet">你好！</View>
        <View className="login-welcome">欢迎来到习享空间～</View>
      </View>
      <View className="login-form-card">
        <View className="login-form">
          <Input className="login-input" placeholder="请输入你的学号" />
          <View className='line'/>
          <Input className="login-input" placeholder="请输入你的一站式密码" password />
          <View className='line'/>
          <Button className="login-btn" color="primary" block>
            登 录
          </Button>
        </View>
      </View>
      <View className="login-footer">
        共享自习资源预约管理平台
      </View>
    </View>
  );
};

export default LoginPage;
