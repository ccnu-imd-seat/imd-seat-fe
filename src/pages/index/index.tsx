import { View, Text, Image, Button } from '@tarojs/components';
import React, { useEffect } from 'react';
import Taro, { useDidShow } from '@tarojs/taro';
import avatar from '../../assets/icons/home-avatar.png';
import scan from '../../assets/icons/home-scan.png';
import suggest from '../../assets/icons/home-suggest.png';
import homeBg from '../../assets/bg/home.png';
import RecordCard from '../../components/recordCard';
import SuggestDialog from '../../components/suggestDialog';
import { getMyReservations } from '../../apis/mine';
import { postFeedback } from '../../apis/feedback';
import { cancelReservation } from '../../apis/reservation';
import { getScore } from '../../apis/mine';
import {groupAndSortByStatusAndDate} from '../../utils/dealRecrds';
import './index.scss';

export default function Index() {
  // 当前tab（0: 我的预约, 1: 违约记录）
  const [current, setCurrent] = React.useState(0);
  // 建议反馈弹窗开关
  const [suggestOpen, setSuggestOpen] = React.useState(false);
  // 获取用户信息
  const userInfo = Taro.getStorageSync('userInfo');
  // 预约列表状态
  const [reserveList, setReserveList] = React.useState<any[]>([]);
  // 违约列表状态
  const [violationList, setViolationList] = React.useState<any[]>([]);
  //信誉分
  const [creditScore, setCreditScore] = React.useState<number | null>(null);

  // 获取用户信誉分
  const fetchCreditScore = React.useCallback(async () => {
    try {
      const res = await getScore();
      console.log('用户信誉分:', res);
      setCreditScore(res.score);
    } catch (e) {
      setCreditScore(null);
      console.error('获取信誉分失败:', e);
    }
  }, []);

  // 页面显示时获取预约数据
  const fetchReservations = React.useCallback(async () => {
    try {
      const res = await getMyReservations();
      console.log('预约数据:', res);
      if (Array.isArray(res)) {
        const { reserveList, violationList } = groupAndSortByStatusAndDate(res);
        setReserveList(reserveList);
        setViolationList(violationList);
      } else if (res && typeof res === 'object') {
        setReserveList([res]);
        setViolationList([]);
      } else {
        setReserveList([]);
        setViolationList([]);
      }
    } catch (e) {
      setReserveList([]);
      setViolationList([]);
      console.error('获取预约数据失败:', e);
    }
  }, []);

  // 页面挂载时获取一次
  useEffect(() => {
    fetchReservations();
    fetchCreditScore();
  }, [fetchReservations]);

  // 每次页面展示时都获取数据
  useDidShow(() => {
    fetchReservations();
  });

  // 取消预约逻辑
  const handleCancelReservation = async (id: number | string) => {
    Taro.showLoading({ title: '取消中...' });
    try {
      await cancelReservation(String(id), {
        header: {
          DEBUG_MODE: '1',
        },
      });
      Taro.hideLoading();
      Taro.showToast({ title: '取消成功', icon: 'success' });
      fetchReservations(); // 重新获取预约数据
    } catch (e: any) {
      Taro.hideLoading();
      Taro.showToast({ title: e?.message || '取消失败', icon: 'none' });
    }
  };

  return (
    <>
      <View className="home-page">
        {/* 背景图片 */}
        <Image className="home-bg" src={homeBg} mode="aspectFill" />

        {/* 顶部操作栏 */}
        <View>
          {/* 建议反馈按钮 */}
          <View
            className="home-suggest-box"
            onClick={() => setSuggestOpen(true)}
          >
            <Image className="home-suggest" src={suggest} />
            <Text className="home-suggest-text">建议反馈</Text>
          </View>
          {/* 扫码签到按钮 */}
          <View
            className="home-scan-box"
            onClick={() => Taro.navigateTo({ url: '/pages/scan/index' })}
          >
            <Image className="home-scan" src={scan} />
            <Text className="home-scan-text">扫码签到</Text>
          </View>
        </View>

        {/* 用户信息卡片 */}
        <View className="home-user-card">
          <View className="home-user-avatar">
            <Image src={avatar} />
          </View>
          <View className="home-user-info">
            <View className="home-user-name">姓名：{userInfo.name}</View>
            <View className="home-user-id">学号：{userInfo.student_id}</View>
          </View>
        </View>

        {/* 预约/违约tab切换 */}
        <View className="home-select-btns">
          <Button
            className={`home-select-btn${current === 0 ? ' active' : ''}`}
            plain
            onClick={() => setCurrent(0)}
          >
            我的预约
          </Button>
          <Button
            className={`home-select-btn${current === 1 ? ' active' : ''}`}
            plain
            onClick={() => setCurrent(1)}
          >
            违约记录
          </Button>
        </View>

        {/* 预约/违约记录列表 */}
        <View className="record-list">
          {current === 1 && (
            <View className="credit-score-box">
              <Text>我的信誉分：{creditScore ?? '--'}</Text>
            </View>
          )}
          {(current === 0 ? reserveList : violationList).length === 0 ? (
            <View className="record-list__empty">
              {current === 0 ? (
                <Text>您还没有预约哦~</Text>
              ) : (
                <Text>您还没有违约哦~</Text>
              )}
            </View>
          ) : (
            (current === 0 ? reserveList : violationList).map((item, idx) => (
              <RecordCard
                key={item.id || idx}
                date={item.date}
                location={
                  item.room
                    ? `${item.room}${item.seat_id ? `-${item.seat_id}` : ''}`
                    : ''
                }
                status={item.status}
                type={item.type}
                id={item.id}
                onCancel={handleCancelReservation}
              />
            ))
          )}
        </View>
      </View>
      {/* 建议反馈弹窗 */}
      <SuggestDialog
        open={suggestOpen}
        onClose={() => setSuggestOpen(false)}
        onSubmit={async (content: string) => {
          if (!content) {
            Taro.showToast({ title: '请输入反馈内容', icon: 'none' });
            return;
          }
          try {
            await postFeedback({ content });
            Taro.showToast({ title: '反馈已提交', icon: 'success' });
            setSuggestOpen(false);
          } catch (e: any) {
            Taro.showToast({ title: e?.message || '提交失败', icon: 'none' });
          }
        }}
      />
    </>
  );
}
