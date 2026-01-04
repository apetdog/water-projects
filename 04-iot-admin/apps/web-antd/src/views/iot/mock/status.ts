interface StatusTableItem {
  key: string;
  unit: string;
  status: string;
  count: number;
}

const baseStatusTableData: StatusTableItem[] = [
  {
    key: '1',
    unit: 'IoT监测点水位计',
    status: '正常',
    count: 1,
  },
];

const generatedStatusTableData: StatusTableItem[] = Array.from({ length: 17 }).map((_, index) => {
  const id = index + 2;
  const statuses = ['正常', '告警', '离线'];
  return {
    key: `${id}`,
    unit: `模拟站点 ${id}`,
    status: statuses[index % 3] || '离线',
    count: 1,
  };
});

export const statusTableData: StatusTableItem[] = [...baseStatusTableData, ...generatedStatusTableData];

export const statusBarChartData = [
  { value: 0, itemStyle: { color: '#ff4d4f' } },
  { value: 0, itemStyle: { color: '#d9d9d9' } },
  { value: 1, itemStyle: { color: '#52c41a' } },
];

export const statusPieChartData = [
  { value: 0, name: '告警', itemStyle: { color: '#ff4d4f' } },
  { value: 0, name: '离线', itemStyle: { color: '#d9d9d9' } },
  { value: 1, name: '正常', itemStyle: { color: '#52c41a' } },
];
