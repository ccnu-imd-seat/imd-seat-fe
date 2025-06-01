import { View, Text, Image } from '@tarojs/components';
import React, { useState, useEffect } from 'react';
import Horn from '../../assets/icons/horn.png';
import SelectDialog from '../../components/selectDialog';
import RuleDialog from '../../components/ruleDialog';
import returnIcon from '../../assets/icons/return.png';
import Chair from '../../components/chair';
import ClassroomCard from '../../components/classroom';
import { getReservationDays, getRooms, getSeats } from '../../apis/reservation';
import './index.scss';

const AppointPage: React.FC = () => {
  // 预约相关状态
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectDialogOpen, setSelectDialogOpen] = useState(false);
  const [ruleDialogOpen, setRuleDialogOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<'week' | 'day'>('week');
  const [selectedClassroom, setSelectedClassroom] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  // 后端数据状态
  const [days, setDays] = useState<number[]>([]);
  const [weekRange, setWeekRange] = useState<string>(''); // 周模式下的日期范围
  const [classroomList, setClassroomList] = useState<{ roomNo: string }[]>([]);
  const [seatStatus, setSeatStatus] = useState<{ num: number; status: 'free' | 'busy' }[]>([]);

  // 获取日期
  useEffect(() => {
    getReservationDays({ type: currentTime })
      .then(res => {
        const dateArr = res.dates || [];
        console.log('获取到的日期数据:', dateArr);
        if (currentTime === 'day') {
          setDays(dateArr.map(d => Number(d.date.split('-')[2])));
          setSelectedDay(dateArr.length > 0 ? Number(dateArr[0].date.split('-')[2]) : null);
        } else if (currentTime === 'week' && dateArr.length > 0) {
          // week 模式只返回一条，date为周一
          const monday = dateArr[0].date;
          // 计算周日
          const mondayDate = new Date(monday);
          const sundayDate = new Date(mondayDate);
          sundayDate.setDate(mondayDate.getDate() + 6);
          setWeekRange(`${monday} —— ${sundayDate.getFullYear()}-${(sundayDate.getMonth() + 1).toString().padStart(2, '0')}-${sundayDate.getDate().toString().padStart(2, '0')}`);
        }
      });
  }, [currentTime]);

  // 获取教室
  useEffect(() => {
    getRooms().then(res => {
      console.log('获取到的教室数据:', res);
      setClassroomList((res.rooms || []).map((room: string) => ({ roomNo: room })));
    });
  }, []);

  // 获取座位
  useEffect(() => {
    if (!selectedClassroom) {
      setSeatStatus([]);
      return;
    }
    let dateStr = '';
    if (currentTime === 'day' && selectedDay) {
      const today = new Date();
      dateStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${selectedDay.toString().padStart(2, '0')}`;
    } else if (currentTime === 'week' && weekRange) {
      // 取周一
      dateStr = weekRange.split(' —— ')[0];
    }
    if (dateStr && selectedClassroom) {
      getSeats({ date: dateStr, room: selectedClassroom }).then(res => {
        console.log('获取到的座位数据:', res);
        setSeatStatus(
          (res.seats || []).map((seat: any) => ({
            num: seat.seat_id,
            status: seat.status === 'free' ? 'free' : 'busy',
          }))
        );
      });
    }
  }, [selectedClassroom, selectedDay, currentTime, weekRange]);

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
            <Text className="appoint-date-week">{weekRange}</Text>
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
            <View className="appoint-classroom-area">
              {classroomList.map(cls => (
                <View
                  key={cls.roomNo}
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
              <Text className="appoint-date-title">
                {currentTime === 'day' && selectedDay ? `5.${selectedDay}` : weekRange}
              </Text>
            </View>
            {/* 座位区 */}
            <View className="appoint-seat-area">
              {seatStatus.map(seat => (
                <Chair
                  key={seat.num}
                  num={seat.num}
                  status={seat.status}
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
            ? weekRange
            : selectedDay
            ? `2025.5.${selectedDay}`
            : ''
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
