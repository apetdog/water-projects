<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';
import {
  Button,
  Table,
} from 'ant-design-vue';
import { ref } from 'vue';

import DeviceTree from '../../components/DeviceTree.vue';
import AddPresetModal from './components/AddPresetModal.vue';

const [AddPresetModalComponent, addPresetModalApi] = useVbenModal({
  connectedComponent: AddPresetModal,
});

const columns = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '通讯口', dataIndex: 'interface', key: 'interface' },
  { title: '命令类型', dataIndex: 'type', key: 'type' },
  { title: '命令号码', dataIndex: 'number', key: 'number' },
  { title: '命令内容', dataIndex: 'content', key: 'content' },
  { title: '命令回复', dataIndex: 'response', key: 'response' },
  { title: '补足位数', dataIndex: 'complement', key: 'complement' },
  { title: '校验方式', dataIndex: 'check', key: 'check' },
  { title: '错误时间', dataIndex: 'errorTime', key: 'errorTime' },
];

const data = ref([]);

const handleAdd = () => {
  addPresetModalApi.open();
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
        <div class="ml-auto flex gap-2">
          <Button>刷新</Button>
          <Button type="primary" @click="handleAdd">新增</Button>
          <Button>新增 Modbus 安全包</Button>
          <Button>编辑</Button>
          <Button>删除</Button>
          <Button>另存模版</Button>
          <Button>导入模版</Button>
        </div>
      </div>

      <!-- Table -->
      <div class="flex-1">
        <Table
          :columns="columns"
          :data-source="data"
          size="small"
          :pagination="false"
        >
          <template #emptyText>
            <div class="text-red-500 text-left p-2">没有找到想要的相关数据!</div>
          </template>
        </Table>
      </div>
    </div>
    <AddPresetModalComponent />
  </div>
</template>
