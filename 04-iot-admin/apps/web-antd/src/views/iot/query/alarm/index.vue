<script lang="ts" setup>
import {
  Button,
  DatePicker,
  Radio,
  Space,
  Table,
  Tag,
} from 'ant-design-vue';
import { ref } from 'vue';

import DeviceTree from '../../components/DeviceTree.vue';

import { alarmData } from '../../mock/alarm';

const { RangePicker } = DatePicker;

const timeRange = ref('today');
const customRange = ref<[string, string] | undefined>(undefined);

const columns = [
  { title: '设备名称', dataIndex: 'deviceName', key: 'deviceName', width: 150 },
  { title: '设备地址', dataIndex: 'address', key: 'address', width: 150 },
  { title: '告警时间', dataIndex: 'time', key: 'time', width: 180 },
  { title: '告警内容', dataIndex: 'content', key: 'content' },
  { title: '告警级别', dataIndex: 'level', key: 'level', width: 100 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
];

const data = alarmData;
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
      <div class="mb-4 flex flex-wrap gap-4 items-center border-b pb-4">
        <Space>
          <Radio.Group v-model:value="timeRange" button-style="solid">
            <Radio.Button value="today">本日</Radio.Button>
            <Radio.Button value="yesterday">昨天</Radio.Button>
            <Radio.Button value="last7days">近7天</Radio.Button>
            <Radio.Button value="last30days">近30天</Radio.Button>
            <Radio.Button value="custom">自定义</Radio.Button>
          </Radio.Group>
          <RangePicker v-if="timeRange === 'custom'" v-model:value="customRange" />
          <Button type="primary">查询</Button>
          <Button>导出Excel</Button>
        </Space>
      </div>

      <!-- Table -->
      <div class="flex-1">
        <Table
          :columns="columns"
          :data-source="data"
          size="small"
          :pagination="{ pageSize: 15, showTotal: (total) => `检索到 ${total} 条` }"
        >
          <template #bodyCell="{ column, text }">
            <template v-if="column.key === 'level'">
              <Tag color="error" v-if="text === 'high'">严重</Tag>
              <Tag color="warning" v-else-if="text === 'medium'">一般</Tag>
              <Tag color="blue" v-else>提示</Tag>
            </template>
            <template v-else-if="column.key === 'status'">
              <Tag color="red" v-if="text === 'unresolved'">未恢复</Tag>
              <Tag color="success" v-else>已恢复</Tag>
            </template>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>
