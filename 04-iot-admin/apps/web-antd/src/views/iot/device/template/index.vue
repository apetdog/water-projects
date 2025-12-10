<script lang="ts" setup>
import {
  Button,
  Input,
  List,
  Popconfirm,
  Table,
} from 'ant-design-vue';
import { ref } from 'vue';
import { deviceTemplateFieldList, deviceTemplateList } from '../../mock/device-template';

// Left: Template List
const templates = ref(deviceTemplateList);
const activeTemplateId = ref('1');

const handleSelectTemplate = (id: string) => {
  activeTemplateId.value = id;
};

const handleAddTemplate = () => {
  const newId = String(templates.value.length + 1);
  templates.value.push({ id: newId, name: `新模版 ${newId}` });
  activeTemplateId.value = newId;
};

// Right: Field Table
const columns = [
  { title: '字段名称', dataIndex: 'name', key: 'name' },
  { title: '字段类型', dataIndex: 'type', key: 'type' },
  { title: '单位', dataIndex: 'unit', key: 'unit' },
  { title: '表达式', dataIndex: 'expression', key: 'expression' },
  { title: 'OPC标识名', dataIndex: 'opcName', key: 'opcName' },
  { title: '控制类型', dataIndex: 'controlType', key: 'controlType' },
  { title: '告警', dataIndex: 'alarm', key: 'alarm' },
  { title: '告警类型', dataIndex: 'alarmType', key: 'alarmType' },
  { title: '上限值', dataIndex: 'upper', key: 'upper' },
  { title: '下限值', dataIndex: 'lower', key: 'lower' },
  { title: '告警恢复阈值', dataIndex: 'recovery', key: 'recovery' },
  { title: '排序', dataIndex: 'sort', key: 'sort' },
];

const data = ref(deviceTemplateFieldList);

const handleAddField = () => {
  // Mock add
  data.value.push({
    key: String(data.value.length + 1),
    name: '新字段',
    type: '整型',
    unit: '',
    expression: '',
    opcName: '',
    controlType: '只读',
    alarm: false,
    alarmType: '无',
    upper: 0,
    lower: 0,
    recovery: 1,
    sort: data.value.length + 1,
  });
};
</script>

<template>
  <div class="flex h-full p-4 gap-4">
    <!-- Left: Template List -->
    <div class="w-[250px] flex flex-col bg-white rounded-xl shadow-sm dark:bg-black/85 p-4">
      <div class="flex justify-between items-center mb-4">
        <span class="font-bold">模版列表</span>
        <Button size="small" type="primary" @click="handleAddTemplate">新增</Button>
      </div>
      <div class="flex-1 overflow-auto">
        <List size="small" :data-source="templates">
          <template #renderItem="{ item }">
            <List.Item
              class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              :class="{ 'bg-blue-50 dark:bg-blue-900': item.id === activeTemplateId }"
              @click="handleSelectTemplate(item.id)"
            >
              {{ item.name }}
              <template #actions>
                <Popconfirm title="确定删除吗?">
                  <a class="text-red-500">删除</a>
                </Popconfirm>
              </template>
            </List.Item>
          </template>
        </List>
      </div>
    </div>

    <!-- Right: Field Content -->
    <div class="flex-1 flex flex-col bg-white rounded-xl shadow-sm dark:bg-black/85 p-4 overflow-auto">
      <!-- Toolbar -->
      <div class="mb-4 flex flex-wrap gap-2 items-center">
        <Input placeholder="请输入关键字" class="w-[200px]" />
        <Button type="primary">查询</Button>

        <div class="ml-auto flex gap-2">
          <Button>刷新</Button>
          <Button type="primary" @click="handleAddField">新增字段</Button>
          <Button>编辑</Button>
          <Button>删除</Button>
        </div>
      </div>

      <!-- Table -->
      <div class="flex-1">
        <Table
          :columns="columns"
          :data-source="data"
          size="small"
          :pagination="{ pageSize: 15 }"
          :scroll="{ x: 1200 }"
        />
      </div>
    </div>
  </div>
</template>
