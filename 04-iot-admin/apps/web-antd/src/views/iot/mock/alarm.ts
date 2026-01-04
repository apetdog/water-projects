interface AlarmItem {
  key: string;
  deviceName: string;
  address: string;
  time: string;
  content: string;
  level: 'high' | 'medium' | 'low';
  status: 'resolved' | 'unresolved';
}

const baseAlarmList: AlarmItem[] = [
  {
    key: '1',
    deviceName: '水黑液位',
    address: '002512010117',
    time: '2026-01-09 08:30:15',
    content: '液位过高告警 (当前值: 3500)',
    level: 'high',
    status: 'unresolved',
  },
  {
    key: '2',
    deviceName: '雨量计',
    address: '002512010117',
    time: '2026-01-08 14:20:00',
    content: '设备离线',
    level: 'medium',
    status: 'resolved',
  },
  {
    key: '3',
    deviceName: '水黑液位',
    address: '002512010117',
    time: '2026-01-07 09:15:30',
    content: '电压过低 (3.2V)',
    level: 'low',
    status: 'resolved',
  },
];

const generatedAlarmList: AlarmItem[] = Array.from({ length: 15 }).map((_, index) => {
  const id = index + 4;
  const levels: ('high' | 'medium' | 'low')[] = ['high', 'medium', 'low'];
  const statuses: ('resolved' | 'unresolved')[] = ['resolved', 'unresolved'];
  
  return {
    key: `${id}`,
    deviceName: index % 2 === 0 ? '水黑液位' : '雨量计',
    address: '002512010117',
    time: `2026-01-0${(index % 9) + 1} 1${index % 10}:00:00`,
    content: `模拟告警内容 ${id}`,
    level: levels[index % 3] || 'low',
    status: statuses[index % 2] || 'unresolved',
  };
});

export const alarmData: AlarmItem[] = [...baseAlarmList, ...generatedAlarmList];
