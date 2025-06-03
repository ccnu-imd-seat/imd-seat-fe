import { View, Text, Image } from '@tarojs/components';
import React, { useState, useEffect } from 'react';
import Horn from '../../assets/icons/horn.png';
import SelectDialog from '../../components/selectDialog';
import RuleDialog from '../../components/ruleDialog';
import returnIcon from '../../assets/icons/return.png';
import Chair from '../../components/chair';
import ClassroomCard from '../../components/classroom';
import { getReservationDays, getRooms, getSeats, reserve } from '../../apis/reservation';
import Taro from '@tarojs/taro';
import './index.scss';

const AppointPage: React.FC = () => {
  // 预约相关状态
  const [selectedDay, setSelectedDay] = useState<{ year: number; month: number; day: number } | null>(null);
  const [selectDialogOpen, setSelectDialogOpen] = useState(false);
  const [ruleDialogOpen, setRuleDialogOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<'week' | 'day'>('week');
  const [selectedClassroom, setSelectedClassroom] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  // 后端数据状态
  const [days, setDays] = useState<{ year: number; month: number; day: number }[]>([]);
  const [weekRange, setWeekRange] = useState<string>(''); // 周模式下的日期范围
  const [classroomList, setClassroomList] = useState<{ roomNo: string }[]>([]);
  const [seatStatus, setSeatStatus] = useState<{ num: number; status: 'available' | 'booked' }[]>([]);


  // 改变时间模式
  const changeTimeMode = (mode: 'week' | 'day') => {
    setCurrentTime(mode);
    setSelectedDay(null); // 切换模式时清除选中的日期
    setSelectedClassroom(null); // 切换模式时清除选中的教室
    setSeatStatus([]); // 清除座位状态
    setSelectedSeat(null); // 清除选中的座位
    setWeekRange(''); // 清除周范围
  }

  // 获取日期
  useEffect(() => {
    getReservationDays({ type: currentTime })
      .then(res => {
        const dateArr = res.dates || [];
        console.log('获取到的日期数据:', dateArr);
        if (currentTime === 'day') {
          // 提取年月日
          const parsedDays = dateArr.map(d => {
            const [year, month, day] = d.date.split('-').map(Number);
            return { year, month, day };
          });
          setDays(parsedDays);
          setSelectedDay(parsedDays.length > 0 ? parsedDays[0] : null);
        } else if (currentTime === 'week' && dateArr.length > 0) {
          setWeekRange(dateArr[0].date);
        }
      });
  }, [currentTime]);

  // 获取教室
  useEffect(() => {
    getRooms().then(res => {
      console.log('获取到的教室数据:', res);
      setClassroomList((res.rooms || []).map((room: string) => ({ roomNo: room })));
    });
  }, [currentTime]);

  // 获取座位
  useEffect(() => {
    if (!selectedClassroom) {
      setSeatStatus([]);
      return;
    }
    let dateStr = '';
    if (currentTime === 'day' && selectedDay) {
      dateStr = `${selectedDay.year}-${selectedDay.month.toString().padStart(2, '0')}-${selectedDay.day.toString().padStart(2, '0')}`;
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
            status: seat.status === 'available' ? 'available' : 'booked',
          }))
        );
      });
    }
  }, [selectedClassroom, selectedDay, currentTime, weekRange]);

  // 预约确认处理函数
  const handleReserveConfirm = async (
    selectedClassroom: string | null,
    selectedSeat: number | null,
    selectedDay: { year: number; month: number; day: number } | null,
    currentTime: 'week' | 'day',
    weekRange: string,
    setSelectDialogOpen: (v: boolean) => void,
    setSelectedSeat: (v: number | null) => void
  ) => {
    if (!selectedClassroom || !selectedSeat || ((!selectedDay && currentTime === 'day') && !weekRange)) {
      Taro.showToast({ title: '请选择完整预约信息', icon: 'none' });
      return;
    }
    let dateStr = '';
    if (currentTime === 'day' && selectedDay) {
      dateStr = `${selectedDay.year}-${selectedDay.month.toString().padStart(2, '0')}-${selectedDay.day.toString().padStart(2, '0')}`;
    } else if (currentTime === 'week' && weekRange) {
      dateStr = weekRange.split(' —— ')[0];
    }
    try {
      await reserve(
        {
          type: currentTime,
          date: dateStr,
          room: selectedClassroom,
          seat_id: String(selectedSeat),
        },
        {
          headers: {
            DEBUG_MODE: '1',
          },
        }
      );
      Taro.showToast({ title: '预约成功', icon: 'success' });
      setSelectDialogOpen(false);
      setSelectedSeat(null);
    } catch (e: any) {
      Taro.showToast({ title: e?.message || '预约失败', icon: 'none' });
    }
  };

  return (
    <>
      <View className="appoint-page">
        {/* 预约方式选择 */}
        <View className="appoint-mode-row">
          <Text className="appoint-mode-label">预约方式：</Text>
          {currentTime === 'week' ? (
            <View
              className="appoint-mode-btn"
              onClick={() => changeTimeMode('day')}
            >
              周
            </View>
          ) : (
            <View
              className="appoint-mode-btn"
              onClick={() => changeTimeMode('week')}
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
            <Text className="appoint-date-month">
              {selectedDay ? `${selectedDay.month}月` : ''}
            </Text>
            {days.map(dayObj => (
              <View
                key={`${dayObj.year}-${dayObj.month}-${dayObj.day}`}
                className={`appoint-date-btn${selectedDay && selectedDay.year === dayObj.year && selectedDay.month === dayObj.month && selectedDay.day === dayObj.day ? ' active' : ''}`}
                onClick={() => setSelectedDay(dayObj)}
              >
                {dayObj.day}
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
                {currentTime === 'day' && selectedDay
                  ? `${selectedDay.month}.${selectedDay.day}`
                  : weekRange}
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
                    if (seat.status === 'available') {
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
        onConfirm={() =>
          handleReserveConfirm(
            selectedClassroom,
            selectedSeat,
            selectedDay,
            currentTime,
            weekRange,
            setSelectDialogOpen,
            setSelectedSeat
          )
        }
        roomNo={selectedClassroom || ''}
        seatNo={selectedSeat || ''}
        date={
          currentTime === 'week'
            ? weekRange
            : selectedDay
            ? `${selectedDay.year}.${selectedDay.month}.${selectedDay.day}`
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
