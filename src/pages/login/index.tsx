import { View, Input, Image } from '@tarojs/components';
import pageBg from '../../assets/bg/login.png';
import './index.scss';
import { Button } from '@taroify/core';
import React, { useState } from 'react';
import { login } from '../../apis/user';
import Taro from '@tarojs/taro';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Taro.showToast({ title: '请输入学号和密码', icon: 'none' });
      return;
    }
    setLoading(true);

    try {
      const res = await login({ username, password });
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
        <View className="login-welcome">欢迎来到习享空间～</View>
      </View>
      <View className="login-form-card">
        <View className="login-form">
          <Input
            className="login-input"
            placeholder="请输入你的学号"
            value={username}
            onInput={e => setUsername(e.detail.value)}
          />
          <View className="line" />
          <Input
            className="login-input"
            placeholder="请输入你的一站式密码"
            password
            value={password}
            onInput={e => setPassword(e.detail.value)}
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
      <View className="login-footer">共享自习资源预约管理平台</View>
    </View>
  );
};

export default LoginPage;
