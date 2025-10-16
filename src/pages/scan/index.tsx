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

      // 从扫码结果URL中提取seat_id参数
      try {
        const url = new URL(scanResult);
        const seatId = url.searchParams.get('seat_id');

        if (!seatId) {
          throw new Error('未找到有效的座位ID');
        }

        const checkinRes = await checkin(
          { seat_id: seatId },
          {
            header: {
              DEBUG_MODE: '',
              DEBUG_DAY: '2025-08-08',
            },
          }
        );
        Taro.showToast({
          title: checkinRes.message || '签到成功',
          icon: 'success',
        });

        // 签到成功后跳转回首页
        setTimeout(() => {
          Taro.switchTab({
            url: '/pages/index/index',
          });
        }, 1500);
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
