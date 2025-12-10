interface ConfigTemplateItem {
  key: string;
  category: string;
  code: string;
  name: string;
  params: string;
}

const baseConfigTemplateList: ConfigTemplateItem[] = [
  {
    key: '1',
    category: 'RTU参数',
    code: 'T001',
    name: '标准RTU配置',
    params: 'IP=127.0.0.1;PORT=8080',
  },
];

const generatedConfigTemplateList: ConfigTemplateItem[] = Array.from({ length: 17 }).map((_, index) => {
  const id = index + 2;
  return {
    key: `${id}`,
    category: 'RTU参数',
    code: `T${id.toString().padStart(3, '0')}`,
    name: `模拟模板 ${id}`,
    params: `IP=127.0.0.${id};PORT=${8080 + index}`,
  };
});

export const configTemplateList: ConfigTemplateItem[] = [...baseConfigTemplateList, ...generatedConfigTemplateList];
