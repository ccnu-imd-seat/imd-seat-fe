import { View, Text, Image, Button } from '@tarojs/components';
import React from 'react';
import avatar from '../../assets/icons/home-avatar.png';
import scan from '../../assets/icons/home-scan.png';
import suggest from '../../assets/icons/home-suggest.png';
import homeBg from '../../assets/bg/home.png';
import RecordCard from '../../components/recordCard';
import './index.scss';

export default function Index() {
  const [current , setCurrent] = React.useState(0);

  // 示例数据
  const reserveList = [
    { condition: true, date: '2025年5.15', location: '南湖综合楼 513-12', status: '已预约' },
    { condition: true, date: '2025年5.16', location: '南湖综合楼 513-13', status: '已预约' }
  ];
  const violationList = [
    { condition: false, date: '2025年5.10', location: '南湖综合楼 513-12', status: '违约' },
    { condition: false, date: '2025年5.11', location: '南湖综合楼 513-13', status: '违约' }
  ];

  return (
    <View className="home-page">
      <Image className="home-bg" src={homeBg} mode="aspectFill" />
      <View className="home-header">
        <View className="home-suggest-box">
          <Image className="home-suggest" src={suggest} />
          <Text className="home-suggest-text">建议反馈</Text>
        </View>
        <View className="home-scan-box">
          <Image className="home-scan" src={scan} />
          <Text className="home-scan-text">扫码签到</Text>
        </View>
      </View>
      <View className="home-user-card">
        <View className="home-user-avatar">
          <Image src={avatar} />
        </View>
        <View className="home-user-info">
          <View className="home-user-name">姓名：dyf</View>
          <View className="home-user-id">学号：202421xxxx</View>
        </View>
      </View>
      <View className="home-select-btns">
        <Button
          className={`home-select-btn${current === 0 ? ' active' : ''}`}
          onClick={() => setCurrent(0)}
        >
          我的预约
        </Button>
        <Button
          className={`home-select-btn${current === 1 ? ' active' : ''}`}
          onClick={() => setCurrent(1)}
        >
          违约记录
        </Button>
      </View>
      <View className="record-list">
        {(current === 0 ? reserveList : violationList).map((item, idx) => (
          <RecordCard
            key={idx}
            condition={item.condition}
            date={item.date}
            location={item.location}
            status={item.status}
          />
        ))}
      </View>
    </View>
  );
}
