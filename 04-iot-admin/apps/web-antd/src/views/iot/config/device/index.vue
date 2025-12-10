<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';
import {
  Button,
  message,
  Table,
} from 'ant-design-vue';
import { ref } from 'vue';

import DeviceTree from '../../components/DeviceTree.vue';
import EditParamModal from './components/EditParamModal.vue';
import { configDeviceList } from '../../mock/config-device';

const [EditParamModalComponent, editParamModalApi] = useVbenModal({
  connectedComponent: EditParamModal,
});

const columns = [
  { title: '设备', dataIndex: 'device', key: 'device', width: 120 },
  { title: '类别', dataIndex: 'category', key: 'category', width: 150 },
  { title: '代码', dataIndex: 'code', key: 'code', width: 120 },
  { title: '名称', dataIndex: 'name', key: 'name', width: 200 },
  { title: '值', dataIndex: 'value', key: 'value' },
  { title: '单位', dataIndex: 'unit', key: 'unit', width: 80 },
  { title: '排序', dataIndex: 'sort', key: 'sort', width: 80 },
];

const data = configDeviceList;

const selectedRowKeys = ref<string[]>([]);

const onSelectChange = (keys: (string | number)[]) => {
  selectedRowKeys.value = keys as string[];
};

const handleEdit = (_record: any) => {
  editParamModalApi.open();
};

const handleSetValues = () => {
  message.success('操作成功');
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
      <div class="mb-4 flex justify-end gap-2">
        <Button @click="handleSetValues">设置参数数值</Button>
        <Button>另存模版</Button>
        <Button>导入模版</Button>
      </div>

      <!-- Table -->
      <div class="flex-1">
        <Table
          :columns="columns"
          :data-source="data"
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          size="small"
          :pagination="{ pageSize: 15 }"
          :scroll="{ x: 1000 }"
          :custom-row="(record) => ({
            onDblclick: () => handleEdit(record)
          })"
        />
      </div>
    </div>
    <EditParamModalComponent />
  </div>
</template>
