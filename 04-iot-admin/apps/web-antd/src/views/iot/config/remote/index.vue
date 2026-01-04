<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';
import {
  Button,
  Checkbox,
  Table,
  Tag,
} from 'ant-design-vue';
import { ref } from 'vue';

import DeviceTree from '../../components/DeviceTree.vue';
import ReadParamModal from './components/ReadParamModal.vue';
import { configRemoteList } from '../../mock/config-remote';

const [ReadParamModalComponent, readParamModalApi] = useVbenModal({
  connectedComponent: ReadParamModal,
});

const autoRefresh = ref(true);

const columns = [
  { title: '地址码', dataIndex: 'address', key: 'address', width: 150 },
  { title: '日志类型', dataIndex: 'type', key: 'type', width: 100 },
  { title: '日志名称', dataIndex: 'name', key: 'name', width: 150 },
  { title: '记录时间', dataIndex: 'time', key: 'time', width: 180 },
  { title: '原始数据', dataIndex: 'rawData', key: 'rawData' },
  { title: '日志信息', dataIndex: 'info', key: 'info', width: 250 },
];

const data = configRemoteList;

const handleReadAnalog = () => {
  readParamModalApi.open();
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
      <div class="mb-4">
        <div class="flex flex-wrap gap-2 mb-2">
          <Button>读取实时数据</Button>
          <Button>读取RTU终端参数</Button>
          <Button @click="handleReadAnalog">读取模拟量参数</Button>
          <Button>读取寄存器参数</Button>
          <Checkbox v-model:checked="autoRefresh" class="inline-flex items-center">自动刷新</Checkbox>
        </div>
        <div class="flex flex-wrap gap-2">
          <Button>读取历史数据</Button>
          <Button>配置RTU终端参数</Button>
          <Button>配置模拟量参数</Button>
          <Button>配置寄存器参数</Button>
        </div>
      </div>

      <!-- Table -->
      <div class="flex-1">
        <Table
          :columns="columns"
          :data-source="data"
          size="small"
          :pagination="{ pageSize: 15, showTotal: (total) => `检索到 ${total} 条, 查询耗时 139 毫秒`, showSizeChanger: true }"
          :scroll="{ x: 1200 }"
        >
          <template #bodyCell="{ column, text }">
            <template v-if="column.key === 'type'">
              <Tag color="success" v-if="text === '接收'">{{ text }}</Tag>
              <Tag color="default" v-else-if="text === '新增' || text === '发送'">{{ text }}</Tag>
              <Tag v-else>{{ text }}</Tag>
            </template>
            <template v-else-if="column.key === 'rawData'">
              <div class="max-w-[400px] break-all font-mono text-xs text-gray-500">
                {{ text }}
              </div>
            </template>
          </template>
        </Table>
      </div>
    </div>
    <ReadParamModalComponent />
  </div>
</template>
