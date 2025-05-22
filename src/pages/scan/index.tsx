import { View, Button, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useState } from 'react';

const ScanPage = () => {
  const [result, setResult] = useState<string>('');

  const handleScan = async () => {
    try {
      const res = await Taro.scanCode({
        onlyFromCamera: true, // 只允许摄像头扫码
      });
      setResult(res.result || '未获取到扫码内容');
    } catch (e) {
      setResult('扫码已取消或失败');
    }
  };

  return (
    <View
      className="scan-page"
      style={{ padding: '40px', textAlign: 'center' }}
    >
      <View style={{ marginTop: '32px', fontSize: '16px', color: '#333' }}>
        <Text>扫码结果：</Text>
        <Text>{result}</Text>
      </View>
    </View>
  );
};

export default ScanPage;
