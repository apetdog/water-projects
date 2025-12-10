<script lang="ts" setup>
import {
  Button,
  Table,
} from 'ant-design-vue';
import { ref } from 'vue';

import DeviceTree from '../../components/DeviceTree.vue';
import { configTaskList } from '../../mock/config-task';

const columns = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '任务类型', dataIndex: 'type', key: 'type' },
  { title: '间隔类型', dataIndex: 'intervalType', key: 'intervalType' },
  { title: '间隔时长', dataIndex: 'interval', key: 'interval' },
  { title: '首次执行时间', dataIndex: 'firstTime', key: 'firstTime' },
  { title: '下一次执行时间', dataIndex: 'nextTime', key: 'nextTime' },
  { title: '任务状态', dataIndex: 'status', key: 'status' },
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
  { title: '操作', dataIndex: 'action', key: 'action' },
];

const data = ref(configTaskList);
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
      <div class="mb-4 flex justify-end gap-2">
        <Button>刷新</Button>
        <Button>新增</Button>
        <Button>删除</Button>
      </div>

      <!-- Table -->
      <div class="flex-1">
        <Table
          :columns="columns"
          :data-source="data"
          size="small"
          :pagination="{ pageSize: 15 }"
        >
          <template #emptyText>
            <div class="text-red-500 text-left p-2">没有找到想要的相关数据!</div>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>
