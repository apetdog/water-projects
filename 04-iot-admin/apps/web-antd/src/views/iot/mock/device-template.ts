interface DeviceTemplateItem {
  id: string;
  name: string;
}

const baseDeviceTemplateList: DeviceTemplateItem[] = [
  { id: '1', name: '通用水位计模版' },
  { id: '2', name: '雨量计模版' },
];

const generatedDeviceTemplateList: DeviceTemplateItem[] = Array.from({ length: 16 }).map((_, index) => {
  const id = index + 3;
  return {
    id: `${id}`,
    name: `模拟设备模板 ${id}`,
  };
});

export const deviceTemplateList: DeviceTemplateItem[] = [...baseDeviceTemplateList, ...generatedDeviceTemplateList];

interface DeviceTemplateFieldItem {
  key: string;
  name: string;
  type: string;
  unit: string;
  expression: string;
  opcName: string;
  controlType: string;
  alarm: boolean;
  alarmType: string;
  upper: number;
  lower: number;
  recovery: number;
  sort: number;
}

const baseDeviceTemplateFieldList: DeviceTemplateFieldItem[] = [
  {
    key: '1',
    name: '水黑液位',
    type: '整型',
    unit: '',
    expression: '',
    opcName: '1',
    controlType: '只读',
    alarm: false,
    alarmType: '无',
    upper: 0,
    lower: 0,
    recovery: 1,
    sort: 1,
  },
];

const generatedDeviceTemplateFieldList: DeviceTemplateFieldItem[] = Array.from({ length: 17 }).map((_, index) => {
  const id = index + 2;
  return {
    key: `${id}`,
    name: `模拟字段 ${id}`,
    type: '整型',
    unit: '',
    expression: '',
    opcName: `${id}`,
    controlType: '只读',
    alarm: false,
    alarmType: '无',
    upper: 0,
    lower: 0,
    recovery: 1,
    sort: id,
  };
});

export const deviceTemplateFieldList: DeviceTemplateFieldItem[] = [...baseDeviceTemplateFieldList, ...generatedDeviceTemplateFieldList];
