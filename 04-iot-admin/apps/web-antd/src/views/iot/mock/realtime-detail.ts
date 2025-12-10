interface RealtimeDetailItem {
  key: string;
  alarm: string;
  name: string;
  value: string;
  unit: string;
  controlType: string;
  analysis: string;
  order: string;
}

const baseRealtimeDetailData: RealtimeDetailItem[] = [
  {
    key: '1',
    alarm: '正常',
    name: '水黑液位',
    value: '3344',
    unit: '',
    controlType: '只读',
    analysis: '📈',
    order: '1',
  },
  {
    key: '2',
    alarm: '正常',
    name: '雨量计',
    value: '0',
    unit: '',
    controlType: '只读',
    analysis: '📈',
    order: '1',
  },
];

const generatedRealtimeDetailData: RealtimeDetailItem[] = Array.from({ length: 16 }).map((_, index) => {
  const id = index + 3;
  return {
    key: `${id}`,
    alarm: Math.random() > 0.8 ? '告警' : '正常',
    name: `模拟监测点 ${id}`,
    value: `${Math.floor(Math.random() * 5000)}`,
    unit: '',
    controlType: '只读',
    analysis: '📈',
    order: '1',
  };
});

export const realtimeDetailData: RealtimeDetailItem[] = [...baseRealtimeDetailData, ...generatedRealtimeDetailData];

interface RealtimeLogItem {
  key: string;
  type: string;
  name: string;
  time: string;
  rawData: string;
  info: string;
}

const baseRealtimeLogData: RealtimeLogItem[] = [
  {
    key: '1',
    type: '发送',
    name: '数升信道',
    time: '2025-12-09 13:29',
    rawData: '',
    info: '主站数升信道命令中继',
  },
  {
    key: '2',
    type: '接收',
    name: '数升信道',
    time: '2025-12-09 13:30',
    rawData: '',
    info: '泊润命令到转发列表',
  },
  {
    key: '3',
    type: '发送',
    name: '续报实时数据',
    time: '2025-12-09 13:29',
    rawData: '{"Func":4,"Dev":"002512010117","Data":{"DType":4}}',
    info: '发送续报实时数据命令',
  },
  {
    key: '5',
    type: '接收',
    name: '近日数据',
    time: '2025-12-09 10:54',
    rawData:
      '{"Func":3,"Dev":"002512010117","Data":{"Data":[{"DT":"2025-12-09T11:00:00","GID":"","Field":[{"Name":"水黑液位","ID":"1","DT":2,"WT":0,"Val":"3344"},{"Name":"雨量计","ID":"5","DT":2,"WT":0,"Val":""}]}]}}',
    info: '数据点:1.7788.',
  },
];

const generatedRealtimeLogData: RealtimeLogItem[] = Array.from({ length: 14 }).map((_, index) => {
  const id = index + 6;
  const types = ['接收', '发送'];
  return {
    key: `${id}`,
    type: types[index % 2],
    name: `模拟实时日志 ${id}`,
    time: `2025-12-09 ${14 + Math.floor(index / 6)}:${10 + (index % 50)}`,
    rawData: '',
    info: `模拟日志信息 ${id}`,
  };
});

export const realtimeLogData: RealtimeLogItem[] = [...baseRealtimeLogData, ...generatedRealtimeLogData];
