<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useVbenModal } from '@vben/common-ui';

import {
  Button,
  Checkbox,
  Input,
  Space,
  Table,
  Tabs,
  Tag,
} from 'ant-design-vue';

import PassthroughModal from './components/PassthroughModal.vue';
import { realtimeDetailData, realtimeLogData } from '../../mock/realtime-detail';

const router = useRouter();

const [PassthroughModalComponent, passthroughModalApi] = useVbenModal({
  connectedComponent: PassthroughModal,
});

const handleBack = () => {
  router.back();
};

const handlePassthrough = () => {
  passthroughModalApi.open();
};

const activeKey = 'realtime';

const realtimeColumns = [
  { title: '告警', dataIndex: 'alarm', key: 'alarm' },
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '值', dataIndex: 'value', key: 'value' },
  { title: '单位', dataIndex: 'unit', key: 'unit' },
  { title: '控制类型', dataIndex: 'controlType', key: 'controlType' },
  { title: '分析', dataIndex: 'analysis', key: 'analysis' },
  { title: '排序', dataIndex: 'order', key: 'order' },
];

const realtimeData = realtimeDetailData;

const logColumns = [
  { title: '日志类型', dataIndex: 'type', key: 'type' },
  { title: '日志名称', dataIndex: 'name', key: 'name' },
  { title: '记录时间', dataIndex: 'time', key: 'time' },
  { title: '原始数据', dataIndex: 'rawData', key: 'rawData' },
  { title: '日志信息', dataIndex: 'info', key: 'info' },
];

const logData = realtimeLogData;
</script>

<template>
  <div class="h-full flex flex-col p-4">
    <!-- Top Actions -->
    <div class="mb-4 flex justify-between items-center bg-white p-2 rounded-xl shadow-sm dark:bg-black/85">
      <Space>
        <Button @click="handleBack">⬅ 返回列表</Button>
        <Button type="primary">查读实时数据</Button>
        <Button @click="handlePassthrough">远程透传命令</Button>
        <Button>断开链接</Button>
        <Button>组态</Button>
        <Checkbox>隐藏日志列表</Checkbox>
      </Space>
    </div>

    <!-- Realtime Data Table -->
    <div class="mb-4 flex-1 bg-white p-4 rounded-xl shadow-sm dark:bg-black/85">
      <div class="font-bold mb-2">读实时数据</div>
      <Table
        :columns="realtimeColumns"
        :data-source="realtimeData"
        :pagination="{ pageSize: 15 }"
        size="small"
      >
        <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'analysis'">
                <span class="text-green-500 font-bold text-lg cursor-pointer">{{ text }}</span>
            </template>
        </template>
      </Table>
    </div>

    <!-- Log Data Table -->
    <div class="flex-1 bg-white p-4 rounded-xl shadow-sm dark:bg-black/85">
      <div class="font-bold mb-2">通讯日志数据</div>
      <Table
        :columns="logColumns"
        :data-source="logData"
        :pagination="{ pageSize: 15 }"
        size="small"
      >
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'type'">
            <Tag :color="text === '发送' ? 'blue' : 'green'">{{ text }}</Tag>
          </template>
          <template v-if="column.dataIndex === 'rawData'">
            <div class="max-w-[400px] break-all text-xs text-gray-500">
              {{ text }}
            </div>
          </template>
        </template>
      </Table>
    </div>

    <PassthroughModalComponent />
  </div>
</template>
