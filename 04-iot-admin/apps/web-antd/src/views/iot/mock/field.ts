interface FieldItem {
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

const baseFieldData: FieldItem[] = [
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
  {
    key: '2',
    name: '雨量计',
    type: '整型',
    unit: '',
    expression: '',
    opcName: '5',
    controlType: '只读',
    alarm: false,
    alarmType: '无',
    upper: 0,
    lower: 0,
    recovery: 1,
    sort: 1,
  },
];

const generatedFieldData: FieldItem[] = Array.from({ length: 16 }).map((_, index) => {
  const id = index + 3;
  return {
    key: `${id}`,
    name: `模拟字段 ${id}`,
    type: '整型',
    unit: '',
    expression: '',
    opcName: `${id + 5}`,
    controlType: '只读',
    alarm: false,
    alarmType: '无',
    upper: 0,
    lower: 0,
    recovery: 1,
    sort: id,
  };
});

export const fieldData: FieldItem[] = [...baseFieldData, ...generatedFieldData];
