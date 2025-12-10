interface ConfigPassthroughItem {
  key: string;
  device: string;
  type: string;
  name: string;
  time: string;
  asc: string;
  hex: string;
}

const baseConfigPassthroughList: ConfigPassthroughItem[] = [
  {
    key: '1',
    device: '002512010117',
    type: '发送',
    name: '透传命令',
    time: '2025-12-09 20:30:00',
    asc: 'TEST',
    hex: '54 45 53 54',
  },
];

const generatedConfigPassthroughList: ConfigPassthroughItem[] = Array.from({ length: 17 }).map((_, index) => {
  const id = index + 2;
  return {
    key: `${id}`,
    device: '002512010117',
    type: index % 2 === 0 ? '发送' : '接收',
    name: `透传命令 ${id}`,
    time: `2025-12-09 ${10 + (index % 10)}:${10 + index}:00`,
    asc: `TEST_${id}`,
    hex: `54 45 53 54 ${id}`,
  };
});

export const configPassthroughList: ConfigPassthroughItem[] = [...baseConfigPassthroughList, ...generatedConfigPassthroughList];
