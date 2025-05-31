import { View, Text, Image, Button } from '@tarojs/components';
import React, { useEffect } from 'react';
import Taro from '@tarojs/taro';
import avatar from '../../assets/icons/home-avatar.png';
import scan from '../../assets/icons/home-scan.png';
import suggest from '../../assets/icons/home-suggest.png';
import homeBg from '../../assets/bg/home.png';
import RecordCard from '../../components/recordCard';
import SuggestDialog from '../../components/suggestDialog';
import { getMyReservations } from '../../apis/mine';
import './index.scss';

export default function Index() {
  // 当前tab（0: 我的预约, 1: 违约记录）
  const [current, setCurrent] = React.useState(0);
  // 建议反馈弹窗开关
  const [suggestOpen, setSuggestOpen] = React.useState(false);
  // 获取用户信息
  const userInfo = Taro.getStorageSync('userInfo');

  // const getReservations = async () => {
  //     try {
  //       const res = await getMyReservations();
  //       const { name, student_id } = res;
  //       // 将用户信息存储到本地
  //       Taro.setStorageSync('userInfo', { name, student_id });
  //       Taro.showToast({ title: '登录成功', icon: 'success' });
  //       // 跳转首页或其他页面
  //       Taro.switchTab({ url: '/pages/index/index' });
  //     } catch (e: any) {
  //       Taro.showToast({ title: e?.message || '登录失败', icon: 'none' });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  // useEffect(() => {

  // },[]);

  // 示例预约数据
  const reserveList = [
    {
      condition: true,
      date: '2025年5.15',
      location: '南湖综合楼 513-12',
      status: '已预约',
    },
    {
      condition: true,
      date: '2025年5.16',
      location: '南湖综合楼 513-13',
      status: '已预约',
    },
  ];
  // 示例违约数据
  const violationList = [
    // {
    //   condition: false,
    //   date: '2025年5.10',
    //   location: '南湖综合楼 513-12',
    //   status: '违约',
    // },
    // {
    //   condition: false,
    //   date: '2025年5.11',
    //   location: '南湖综合楼 513-13',
    //   status: '违约',
    // },
  ];

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
                key={idx}
                condition={item.condition}
                date={item.date}
                location={item.location}
                status={item.status}
              />
            ))
          )}
        </View>
      </View>
      {/* 建议反馈弹窗 */}
      <SuggestDialog
        open={suggestOpen}
        onClose={() => setSuggestOpen(false)}
        onSubmit={() => {
          setSuggestOpen(false);
        }}
      />
    </>
  );
}
