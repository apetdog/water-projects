interface ConfigTaskItem {
  key: string;
  name: string;
  type: string;
  intervalType: string;
  interval: string;
  firstTime: string;
  nextTime: string;
  status: string;
  createTime: string;
}

const baseConfigTaskList: ConfigTaskItem[] = [
  {
    key: '1',
    name: '定时采集任务',
    type: '数据采集',
    intervalType: '分钟',
    interval: '10',
    firstTime: '2025-12-09 10:00:00',
    nextTime: '2025-12-09 10:10:00',
    status: '运行中',
    createTime: '2025-12-01 09:00:00',
  },
];

const generatedConfigTaskList: ConfigTaskItem[] = Array.from({ length: 17 }).map((_, index) => {
  const id = index + 2;
  return {
    key: `${id}`,
    name: `模拟任务 ${id}`,
    type: '数据采集',
    intervalType: '分钟',
    interval: '10',
    firstTime: '2025-12-09 10:00:00',
    nextTime: '2025-12-09 10:10:00',
    status: index % 2 === 0 ? '运行中' : '已停止',
    createTime: '2025-12-01 09:00:00',
  };
});

export const configTaskList: ConfigTaskItem[] = [...baseConfigTaskList, ...generatedConfigTaskList];
