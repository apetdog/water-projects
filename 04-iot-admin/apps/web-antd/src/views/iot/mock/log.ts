interface LogItem {
  key: string;
  address: string;
  type: string;
  name: string;
  time: string;
  rawData: string;
  info: string;
}

const baseLogData: LogItem[] = [
  {
    key: '1',
    address: '002512010117',
    type: '接收',
    name: '登录包',
    time: '2026-01-09 19:58',
    rawData: '{"Func":1,"Dev":"002512010117","Data":""}',
    info: '设备登录',
  },
  {
    key: '2',
    address: '002512010117',
    type: '新增',
    name: '断开链接',
    time: '2026-01-09 19:38',
    rawData: 'null',
    info: '添加命令到待发送列表',
  },
  {
    key: '3',
    address: '002512010117',
    type: '发送',
    name: '断开链接',
    time: '2026-01-09 19:38',
    rawData: 'null',
    info: '主动断开设备与平台的链接',
  },
  {
    key: '4',
    address: '002512010117',
    type: '接收',
    name: '返回数据',
    time: '2026-01-09 10:54',
    rawData: '{"Func":3,"Dev":"002512010117","Data":{"Data":[{"DT":"2026-01-09T11:00:00","GID":"","Field":[{"Name":"水黑液位","ID":"1","DT":2,"WT":0,"Val":"3344"},{"Name":"雨量计","ID":"5","DT":2,"WT":0,"Val":""}]}]}}',
    info: '数据点:1.7788.',
  },
];

const generatedLogData: LogItem[] = Array.from({ length: 14 }).map((_, index) => {
  const id = index + 5;
  const types = ['接收', '新增', '发送'];
  return {
    key: `${id}`,
    address: '002512010117',
    type: types[index % 3],
    name: `模拟日志 ${id}`,
    time: `2026-01-09 ${18 - Math.floor(index / 6)}:${59 - (index % 60)}`,
    rawData: `{"Func":${id},"Dev":"002512010117","Data":""}`,
    info: `模拟日志信息 ${id}`,
  };
});

export const logData: LogItem[] = [...baseLogData, ...generatedLogData];
