import { View, Text, Image } from '@tarojs/components';
import React, { useState } from 'react';
import Horn from '../../assets/icons/horn.png';
import SelectDialog from '../../components/selectDialog';
import RuleDialog from '../../components/ruleDialog';
import returnIcon from '../../assets/icons/return.png';
import Chair from '../../components/chair';
import ClassroomCard from '../../components/classroom';
import './index.scss';

// 日期和座位模拟数据
const days = [13, 14, 15, 16, 17, 18, 19, 20];
const seats = Array.from({ length: 30 }, (_, i) => i + 1);

const AppointPage: React.FC = () => {
  // 预约相关状态
  const [selectedDay, setSelectedDay] = useState(14);
  const [selectDialogOpen, setSelectDialogOpen] = useState(false);
  const [ruleDialogOpen, setRuleDialogOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<'week' | 'day'>('week');
  const [selectedClassroom, setSelectedClassroom] = useState<
    string | number | null
  >(null);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  // 模拟教室列表
  const classroomList = [
    { roomNo: '513' },
    { roomNo: '514' },
    { roomNo: '515' },
    { roomNo: '516' },
    { roomNo: '517' },
  ];

  // 模拟座位数据
  const seatStatus = seats.map(num => ({
    num,
    status: [2, 3, 4, 5].includes(num) ? 'busy' : 'free',
  }));

  return (
    <>
      <View className="appoint-page">
        {/* 预约方式选择 */}
        <View className="appoint-mode-row">
          <Text className="appoint-mode-label">预约方式：</Text>
          {currentTime === 'week' ? (
            <View
              className="appoint-mode-btn"
              onClick={() => setCurrentTime('day')}
            >
              周
            </View>
          ) : (
            <View
              className="appoint-mode-btn"
              onClick={() => setCurrentTime('week')}
            >
              天
            </View>
          )}
          <View style={{ flex: 1 }}></View>
          <View className="appoint-status-labels">
            <View className="appoint-status-label free">空闲</View>
            <View className="appoint-status-label busy">忙碌</View>
          </View>
        </View>

        {/* 日期选择 */}
        {currentTime === 'week' ? (
          <View
            className="appoint-date-row"
            style={{ justifyContent: 'center' }}
          >
            <Text className="appoint-date-week">2025-04-20 —— 2025-04-26</Text>
          </View>
        ) : (
          <View className="appoint-date-row">
            <Text className="appoint-date-month">5月</Text>
            {days.map(day => (
              <View
                key={day}
                className={`appoint-date-btn${selectedDay === day ? ' active' : ''}`}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </View>
            ))}
          </View>
        )}

        {/* 教室未选中时渲染教室卡片 */}
        {!selectedClassroom ? (
          <>
            {/* 教室选择栏 */}
            <View className="appoint-room-row">
              <Text
                className="appoint-room-label"
                style={{ marginRight: '10%' }}
              >
                选择教室：
              </Text>
              <Text className="appoint-room-value">{selectedClassroom}</Text>
              <View
                className="appoint-rule-btn"
                onClick={() => setRuleDialogOpen(true)}
              >
                <Image className="appoint-rule-icon" src={Horn} />
                <Text>预约机制</Text>
              </View>
            </View>
            {/* 教室卡片列表 */}
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: 32,
                gap: '16px 0',
              }}
            >
              {classroomList.map(cls => (
                <View
                  key={cls.roomNo}
                  style={{
                    margin: '0 5px',
                    marginBottom: '16px',
                  }}
                  onClick={() => setSelectedClassroom(cls.roomNo)}
                >
                  <ClassroomCard roomNo={cls.roomNo} />
                </View>
              ))}
            </View>
          </>
        ) : (
          <>
            {/* 已选教室信息栏 */}
            <View className="appoint-room-row">
              <Text className="appoint-room-label">选择教室：</Text>
              <Text className="appoint-room-value">{selectedClassroom}</Text>
              <View
                className="appoint-rule-btn"
                onClick={() => setRuleDialogOpen(true)}
              >
                <Image className="appoint-rule-icon" src={Horn} />
                <Text>预约机制</Text>
              </View>
            </View>
            {/* 返回按钮 */}
            <View className="appoint-arrow-row">
              <View
                className="appoint-return-icon"
                onClick={() => setSelectedClassroom(null)}
              >
                <Image src={returnIcon} style={{ width: 24, height: 24 }} />
              </View>
            </View>
            {/* 日期标题 */}
            <View className="appoint-date-title-row">
              <Text className="appoint-date-title">5.14</Text>
            </View>
            {/* 座位区 */}
            <View className="appoint-seat-area">
              {seatStatus.map(seat => (
                <Chair
                  key={seat.num}
                  num={seat.num}
                  status={seat.status as 'free' | 'busy'}
                  onClick={() => {
                    if (seat.status === 'free') {
                      setSelectedSeat(seat.num);
                      setSelectDialogOpen(true);
                    }
                  }}
                />
              ))}
            </View>
          </>
        )}
      </View>
      {/* 预约确认弹窗 */}
      <SelectDialog
        open={selectDialogOpen}
        onCancel={() => {
          setSelectDialogOpen(false);
          setSelectedSeat(null);
        }}
        onConfirm={() => {
          setSelectDialogOpen(false);
          setSelectedSeat(null);
        }}
        roomNo={selectedClassroom || ''}
        seatNo={selectedSeat || ''}
        date={
          currentTime === 'week'
            ? '2025-04-20 —— 2025-04-26'
            : `2025.5.${selectedDay}`
        }
      />
      {/* 预约机制弹窗 */}
      <RuleDialog
        open={ruleDialogOpen}
        onShutdown={() => setRuleDialogOpen(false)}
      />
    </>
  );
};

export default AppointPage;
