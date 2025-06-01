import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState, useEffect } from 'react';
import { checkin } from '../../apis/checkin';

const ScanPage = () => {
  const [result, setResult] = useState<string>('');

  const handleScan = async () => {
    try {
      const res = await Taro.scanCode({
        onlyFromCamera: true, // 只允许摄像头扫码
      });
      const scanResult = res.result || '未获取到扫码内容';
      setResult(scanResult);

      // 假设扫码内容为 seat_id，传给后端
      try {
        const checkinRes = await checkin({ seat_id: scanResult });
        Taro.showToast({ title: checkinRes.message || '签到成功', icon: 'success' });
      } catch (e: any) {
        Taro.showToast({ title: e?.message || '签到失败', icon: 'none' });
      }
    } catch (e) {
      setResult('扫码已取消或失败');
    }
  };

  useEffect(() => {
    handleScan();
  }, []);

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
