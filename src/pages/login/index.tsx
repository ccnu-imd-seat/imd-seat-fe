import { View, Input, Image } from '@tarojs/components';
import pageBg from '../../assets/bg/login.png';
import './index.scss';
import { Button } from '@taroify/core';
import React, { useState } from 'react';
import { login } from '../../apis/user';
import Taro from '@tarojs/taro';

interface userInfo {
  username: string;
  password: string;
}

// 登录页面
const LoginPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<userInfo>({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!userInfo?.username || !userInfo.password) {
      Taro.showToast({ title: '请输入学号和密码', icon: 'none' });
      return;
    }
    setLoading(true);

    try {
      const res = await login(userInfo);
      const { name, student_id } = res;
      // 将用户信息存储到本地
      Taro.setStorageSync('userInfo', { name, student_id });
      Taro.showToast({ title: '登录成功', icon: 'success' });
      // 跳转首页或其他页面
      Taro.switchTab({ url: '/pages/index/index' });
    } catch (e: any) {
      Taro.showToast({ title: e?.message || '登录失败', icon: 'none' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="login-page">
      <Image className="login-bg" src={pageBg} mode="aspectFill" />
      <View className="login-header">
        <View className="login-hello">Hello</View>
        <View className="login-greet">你好！</View>
        <View className="login-welcome">欢迎来到【研在信管】空间预约</View>
      </View>
      <View className="login-form-card">
        <View className="login-form">
          <Input
            className="login-input"
            placeholder="请输入你的学号"
            value={userInfo?.username}
            onInput={e =>
              setUserInfo(prev => ({ ...prev, username: e.detail.value }))
            }
          />
          <View className="line" />
          <Input
            className="login-input"
            placeholder="请输入你的一站式密码"
            password
            value={userInfo.password}
            onInput={e =>
              setUserInfo(prev => ({ ...prev, password: e.detail.value }))
            }
          />
          <View className="line" />
          <Button
            className="login-btn"
            color="primary"
            block
            loading={loading}
            onTap={handleLogin}
          >
            登 录
          </Button>
        </View>
      </View>
      <View className="login-footer">智信思政管理平台</View>
    </View>
  );
};

export default LoginPage;
