interface ConfigDeviceItem {
  key: string;
  device: string;
  category: string;
  code: string;
  name: string;
  value: string;
  unit: string;
  sort: number;
}

const baseConfigDeviceList: ConfigDeviceItem[] = [
  {
    key: '1',
    device: '002512010117',
    category: 'RTU终端配置参数',
    code: 'IP',
    name: 'IP地址',
    value: '114.115.136.216',
    unit: '',
    sort: 1,
  },
  {
    key: '2',
    device: '002512010117',
    category: 'RTU终端配置参数',
    code: 'PORT',
    name: '端口',
    value: '6688',
    unit: '',
    sort: 2,
  },
  {
    key: '3',
    device: '002512010117',
    category: 'RTU终端配置参数',
    code: 'SPITV',
    name: '上报周期(分)',
    value: '10',
    unit: '分',
    sort: 4,
  },
  {
    key: '4',
    device: '002512010117',
    category: 'RTU终端配置参数',
    code: 'TPITV',
    name: '采集周期(分)',
    value: '5',
    unit: '分',
    sort: 5,
  },
];

const generatedConfigDeviceList: ConfigDeviceItem[] = Array.from({ length: 14 }).map((_, index) => {
  const id = index + 5;
  return {
    key: `${id}`,
    device: '002512010117',
    category: 'RTU终端配置参数',
    code: `PARAM_${id}`,
    name: `模拟参数 ${id}`,
    value: `${Math.floor(Math.random() * 100)}`,
    unit: '',
    sort: id,
  };
});

export const configDeviceList: ConfigDeviceItem[] = [...baseConfigDeviceList, ...generatedConfigDeviceList];
