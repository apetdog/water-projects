<script lang="ts" setup>
import {
  Button,
  DatePicker,
  Radio,
  Space,
  Table,
} from 'ant-design-vue';
import { ref } from 'vue';

import DeviceTree from '../../components/DeviceTree.vue';

import { historyData } from '../../mock/history';

const { RangePicker } = DatePicker;

const dateRange = ref();
const timeRange = ref('today');

const columns = [
  { title: '地址码', dataIndex: 'address', key: 'address' },
  { title: '采集时间', dataIndex: 'time', key: 'time' },
  { title: '水黑液位', dataIndex: 'waterLevel', key: 'waterLevel' },
  { title: '雨量计', dataIndex: 'rainGauge', key: 'rainGauge' },
];

const data = historyData;
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
      <div class="mb-4 flex flex-wrap gap-2 items-center border-b pb-4">
        <span>日期：</span>
        <RangePicker show-time v-model:value="dateRange" />
        <Radio.Group v-model:value="timeRange" button-style="solid">
          <Radio.Button value="today">本日</Radio.Button>
          <Radio.Button value="week">本周</Radio.Button>
          <Radio.Button value="month">本月</Radio.Button>
        </Radio.Group>
        <Space>
            <Button type="primary">⬇️ 导出Excel</Button>
            <Button type="primary">⬆️ 导入数据</Button>
        </Space>
      </div>

      <!-- Table -->
      <div class="flex-1">
        <Table
          :columns="columns"
          :data-source="data"
          size="small"
          :pagination="{ pageSize: 15, showTotal: (total) => `检索到 ${total} 条` }"
        />
      </div>
    </div>
  </div>
</template>
