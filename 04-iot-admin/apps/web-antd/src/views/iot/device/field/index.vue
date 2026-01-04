<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';
import {
  Button,
  Dropdown,
  Input,
  Menu,
  Table,
} from 'ant-design-vue';
import { ref } from 'vue';

import DeviceTree from '../../components/DeviceTree.vue';
import AlarmModal from './components/AlarmModal.vue';
import SaveTemplateModal from './components/SaveTemplateModal.vue';
import { fieldData } from '../../mock/field';

// Modals
const [AlarmModalComponent, alarmModalApi] = useVbenModal({
  connectedComponent: AlarmModal,
});

const [SaveTemplateModalComponent, saveTemplateModalApi] = useVbenModal({
  connectedComponent: SaveTemplateModal,
});

// Search
const searchText = ref('');

// Main Table (Fields)
const fieldColumns = [
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

const alarmColumns = [
  { title: '星期', dataIndex: 'week', key: 'week' },
  { title: '开始时间', dataIndex: 'startTime', key: 'startTime' },
  { title: '结束时间', dataIndex: 'endTime', key: 'endTime' },
  { title: '告警类型', dataIndex: 'type', key: 'type' },
  { title: '上限值', dataIndex: 'upper', key: 'upper' },
  { title: '下限值', dataIndex: 'lower', key: 'lower' },
  { title: '排序', dataIndex: 'sort', key: 'sort' },
];

const alarmData = ref([]);

const handleAddAlarm = () => {
  alarmModalApi.open();
};

const handleSaveTemplate = () => {
  saveTemplateModalApi.open();
};
</script>

<template>
  <div class="flex h-full p-4 gap-4">
    <!-- Left Sidebar -->
    <div class="w-[300px] flex-shrink-0">
      <DeviceTree />
    </div>

    <!-- Right Content -->
    <div class="flex-1 flex flex-col bg-white rounded-xl shadow-sm dark:bg-black/85 p-4 overflow-auto">
      <!-- Toolbar -->
      <div class="mb-4 flex flex-wrap gap-2 items-center">
        <Input v-model:value="searchText" placeholder="请输入要查询的名称关键字" class="w-[200px]" />
        <Button type="primary">查询</Button>

        <div class="ml-auto flex gap-2">
          <Button>刷新</Button>
          <Button>新增</Button>
          <Button>编辑</Button>
          <Button>删除</Button>
          <Dropdown>
            <template #overlay>
              <Menu>
                <Menu.Item key="1">全部删除</Menu.Item>
                <Menu.Item key="2" @click="handleSaveTemplate">另存模版</Menu.Item>
                <Menu.Item key="3">导入模版</Menu.Item>
              </Menu>
            </template>
            <Button>更多</Button>
          </Dropdown>
          <Button>全部删除</Button>
          <Button @click="handleSaveTemplate">另存模版</Button>
          <Button>导入模版</Button>
        </div>
      </div>

      <!-- Main Field Table -->
      <div class="flex-1 min-h-[300px]">
        <Table
          :columns="fieldColumns"
          :data-source="fieldData"
          size="small"
          :pagination="{ pageSize: 15 }"
          :scroll="{ x: 1200 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'alarm'">
              <Switch v-model:checked="record.alarm" size="small" />
            </template>
          </template>
        </Table>
      </div>

      <!-- Alarm Configuration Section -->
      <div class="mt-4 border-t pt-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="font-bold">时段告警配置</span>
        </div>
        <div class="flex justify-end gap-2 mb-2">
          <Button @click="handleAddAlarm">新增告警</Button>
          <Button>编辑告警</Button>
          <Button>删除告警</Button>
        </div>
        <Table
          :columns="alarmColumns"
          :data-source="alarmData"
          size="small"
          :pagination="false"
        />
      </div>
    </div>
    <AlarmModalComponent />
    <SaveTemplateModalComponent />
  </div>
</template>
