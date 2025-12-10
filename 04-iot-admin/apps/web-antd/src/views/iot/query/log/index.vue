<script lang="ts" setup>
import {
  Radio,
  Table,
  Tag,
} from 'ant-design-vue';
import { ref } from 'vue';

import DeviceTree from '../../components/DeviceTree.vue';

import { logData } from '../../mock/log';

const timeRange = ref('today');

const columns = [
  { title: '地址码', dataIndex: 'address', key: 'address', width: 150 },
  { title: '日志类型', dataIndex: 'type', key: 'type', width: 100 },
  { title: '日志名称', dataIndex: 'name', key: 'name', width: 150 },
  { title: '记录时间', dataIndex: 'time', key: 'time', width: 180 },
  { title: '原始数据', dataIndex: 'rawData', key: 'rawData' },
  { title: '日志信息', dataIndex: 'info', key: 'info', width: 200 },
];

const data = logData;
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
        <Radio.Group v-model:value="timeRange" button-style="solid">
          <Radio.Button value="yesterday">昨天</Radio.Button>
          <Radio.Button value="today">本日</Radio.Button>
          <Radio.Button value="last7days">近7天</Radio.Button>
        </Radio.Group>
      </div>

      <!-- Table -->
      <div class="flex-1">
        <Table
          :columns="columns"
          :data-source="data"
          size="small"
          :pagination="{ pageSize: 15, showTotal: (total) => `检索到 ${total} 条` }"
          :scroll="{ x: 1000 }"
        >
          <template #bodyCell="{ column, text }">
            <template v-if="column.key === 'type'">
              <Tag color="success" v-if="text === '接收'">{{ text }}</Tag>
              <Tag color="default" v-else-if="text === '新增'">{{ text }}</Tag>
              <Tag color="warning" v-else-if="text === '发送'">{{ text }}</Tag>
              <Tag v-else>{{ text }}</Tag>
            </template>
            <template v-else-if="column.key === 'rawData'">
              <div class="max-w-[500px] break-all font-mono text-xs text-gray-500">
                {{ text }}
              </div>
            </template>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>
