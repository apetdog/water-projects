interface ConfigRemoteItem {
  key: string;
  address: string;
  type: string;
  name: string;
  time: string;
  rawData: string;
  info: string;
}

const baseConfigRemoteList: ConfigRemoteItem[] = [
  {
    key: '1',
    address: '002512010117',
    type: '接收',
    name: '登录包',
    time: '2025-12-09 19:58:01',
    rawData: '{"Func":1,"Dev":"002512010117","Data":""}',
    info: '设备登录',
  },
  {
    key: '2',
    address: '002512010117',
    type: '新增',
    name: '请求读取参数',
    time: '2025-12-09 20:18:23',
    rawData: '',
    info: '添加命令到待发送列表 ()',
  },
  {
    key: '3',
    address: '002512010117',
    type: '发送',
    name: '发送请求读取参数',
    time: '2025-12-09 20:17:46',
    rawData: '680007680D0025120101175D16',
    info: '发送请求读取参数命令 ()',
  },
];

const generatedConfigRemoteList: ConfigRemoteItem[] = Array.from({ length: 15 }).map((_, index) => {
  const id = index + 4;
  const types = ['接收', '新增', '发送'];
  return {
    key: `${id}`,
    address: '002512010117',
    type: types[index % 3],
    name: `模拟远程命令 ${id}`,
    time: `2025-12-09 ${10 + (index % 10)}:${10 + index}:00`,
    rawData: `{"Func":${id},"Dev":"002512010117","Data":""}`,
    info: `模拟命令信息 ${id}`,
  };
});

export const configRemoteList: ConfigRemoteItem[] = [...baseConfigRemoteList, ...generatedConfigRemoteList];
