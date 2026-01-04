interface RealtimeItem {
  id: string;
  name: string;
  status: string;
  lastActive: string;
}

const baseRealtimeList: RealtimeItem[] = [
  {
    id: 'DEV-001',
    name: '温湿度传感器 A',
    status: 'online',
    lastActive: '2026-01-09 10:30:00',
  },
  {
    id: 'DEV-002',
    name: '智能电表 B',
    status: 'offline',
    lastActive: '2026-01-09 09:20:00',
  },
  {
    id: 'DEV-003',
    name: '压力控制器 C',
    status: 'alarm',
    lastActive: '2026-01-09 10:29:55',
  },
  {
    id: 'DEV-004',
    name: '水质监测站 D',
    status: 'online',
    lastActive: '2026-01-09 10:35:12',
  },
  {
    id: 'DEV-005',
    name: '视频监控 E',
    status: 'online',
    lastActive: '2026-01-09 10:35:10',
  },
];

const generatedRealtimeList: RealtimeItem[] = Array.from({ length: 13 }).map((_, index) => {
  const id = index + 6;
  const statuses = ['online', 'offline', 'alarm'];
  return {
    id: `DEV-${id.toString().padStart(3, '0')}`,
    name: `模拟设备 ${String.fromCharCode(70 + index)}`, // F, G, H...
    status: statuses[index % 3] || 'offline',
    lastActive: `2026-01-09 ${10 + Math.floor(index / 10)}:${10 + (index % 50)}:00`,
  };
});

export const realtimeList: RealtimeItem[] = [...baseRealtimeList, ...generatedRealtimeList];
