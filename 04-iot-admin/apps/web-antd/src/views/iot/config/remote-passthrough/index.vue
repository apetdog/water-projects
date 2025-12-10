<script lang="ts" setup>
import {
  Button,
  Checkbox,
  Input,
  Table,
} from 'ant-design-vue';
import { ref } from 'vue';

import DeviceTree from '../../components/DeviceTree.vue';
import { configPassthroughList } from '../../mock/config-passthrough';

const passthroughData = ref('');
const isAscii = ref(false);
const isHex = ref(false);
const autoRefresh = ref(true);

const columns = [
  { title: '设备', dataIndex: 'device', key: 'device', width: 150 },
  { title: '日志类型', dataIndex: 'type', key: 'type', width: 100 },
  { title: '日志名称', dataIndex: 'name', key: 'name', width: 150 },
  { title: '记录时间', dataIndex: 'time', key: 'time', width: 180 },
  { title: 'ASC码', dataIndex: 'asc', key: 'asc' },
  { title: '16进制', dataIndex: 'hex', key: 'hex' },
];

const data = ref(configPassthroughList);
</script>

<template>
  <div class="flex h-full p-4 gap-4">
    <!-- Left Sidebar -->
    <div class="w-[300px] flex-shrink-0">
      <DeviceTree />
    </div>

    <!-- Right Content -->
    <div class="flex-1 flex flex-col bg-white rounded-xl shadow-sm dark:bg-black/85 p-4 overflow-auto">
      <div class="mb-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="flex-shrink-0">透传数据:</span>
          <Input v-model:value="passthroughData" placeholder="请输入透传数据" class="flex-1" />
        </div>
        <div class="flex items-center gap-4">
          <Checkbox v-model:checked="isAscii">ASCII码</Checkbox>
          <Checkbox v-model:checked="isHex">16进制</Checkbox>
          <Button type="primary">
            发送
          </Button>
          <Button>清除日志信息</Button>
          <Button>刷新</Button>
          <Checkbox v-model:checked="autoRefresh">自动刷新</Checkbox>
        </div>
      </div>

      <!-- Table -->
      <div class="flex-1">
        <Table
          :columns="columns"
          :data-source="data"
          size="small"
          :pagination="{ pageSize: 15 }"
          :scroll="{ x: 1000 }"
        />
      </div>
    </div>
  </div>
</template>
