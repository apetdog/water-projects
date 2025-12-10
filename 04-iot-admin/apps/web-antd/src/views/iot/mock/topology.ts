export interface TopologyItem {
  id: string;
  name: string;
  description: string;
  updateTime: string;
  thumbnail?: string;
}

const baseList: TopologyItem[] = [
  {
    id: '1',
    name: '主厂房设备监控',
    description: '主厂房所有设备的实时运行状态监控',
    updateTime: '2025-12-09 10:30',
  },
  {
    id: '2',
    name: '污水处理流程',
    description: '污水处理工艺流程图',
    updateTime: '2025-12-08 15:20',
  },
  {
    id: '3',
    name: '配电室电力拓扑',
    description: '配电室电力系统接线图',
    updateTime: '2025-12-05 09:10',
  },
  {
    id: '4',
    name: '暖通空调系统',
    description: 'HVAC系统监控',
    updateTime: '2025-12-01 11:00',
  },
];

const generatedList: TopologyItem[] = Array.from({ length: 14 }).map((_, index) => ({
  id: `${index + 5}`,
  name: `模拟组态场景 ${index + 1}`,
  description: `这是一个自动生成的模拟组态场景 ${index + 1}`,
  updateTime: '2025-12-01 09:00',
}));

export const topologyList: TopologyItem[] = [...baseList, ...generatedList];
