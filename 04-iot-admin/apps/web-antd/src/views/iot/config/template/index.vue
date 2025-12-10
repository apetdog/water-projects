<script lang="ts" setup>
import {
  Button,
  Table,
} from 'ant-design-vue';
import { ref } from 'vue';
import { configTemplateList } from '../../mock/config-template';

const columns = [
  { title: '类别', dataIndex: 'category', key: 'category' },
  { title: '代码', dataIndex: 'code', key: 'code' },
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '参数', dataIndex: 'params', key: 'params' },
];

const data = ref(configTemplateList);
</script>

<template>
  <div class="flex h-full p-4 gap-4">
    <!-- Left Sidebar (Empty for now to match layout, or reuse DeviceTree if needed, though screenshot shows just left panel) -->
    <div class="w-[300px] flex-shrink-0 bg-white rounded-xl shadow-sm dark:bg-black/85 p-2">
      <div class="text-gray-400 p-2">请输入关键字，并回车</div>
    </div>

    <!-- Right Content -->
    <div class="flex-1 flex flex-col bg-white rounded-xl shadow-sm dark:bg-black/85 p-4 overflow-auto">
      <!-- Toolbar -->
      <div class="mb-4 flex justify-end gap-2">
        <Button>新增</Button>
        <Button>编辑</Button>
        <Button>删除</Button>
        <Button>全部删除</Button>
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
