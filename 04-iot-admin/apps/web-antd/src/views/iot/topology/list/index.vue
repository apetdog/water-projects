<script lang="ts" setup>
import {
  Button,
  Input,
  message,
  Modal,
  Table,
} from 'ant-design-vue';
import { ref } from 'vue';

import { topologyList, type TopologyItem } from '../../mock/topology';

const searchKeyword = ref('');
const selectedRowKeys = ref<string[]>([]);

const list = ref<TopologyItem[]>(topologyList);

const columns = [
  { title: '组态名称', dataIndex: 'name', key: 'name' },
  { title: '描述', dataIndex: 'description', key: 'description' },
  { title: '最后修改时间', dataIndex: 'updateTime', key: 'updateTime' },
  { title: '操作', key: 'action', width: 200 },
];

const handleAdd = () => {
  message.success('点击了新建组态，跳转到编辑器...');
};

const handleEdit = (record: any) => {
  message.info(`编辑组态: ${record.name}`);
};

const handlePreview = (record: any) => {
  message.info(`预览组态: ${record.name}`);
};

const handleDelete = (record?: any) => {
  if (record) {
    // Single delete
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除组态 "${record.name}" 吗？`,
      onOk() {
        list.value = list.value.filter(item => item.id !== record.id);
        message.success('删除成功');
      },
    });
  } else {
    // Batch delete
    if (selectedRowKeys.value.length === 0) {
      message.warning('请选择要删除的记录');
      return;
    }
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除选中的 ${selectedRowKeys.value.length} 条记录吗？`,
      onOk() {
        list.value = list.value.filter(item => !selectedRowKeys.value.includes(item.id));
        selectedRowKeys.value = [];
        message.success('删除成功');
      },
    });
  }
};

const onSelectChange = (keys: any[]) => {
  selectedRowKeys.value = keys as string[];
};
</script>

<template>
  <div class="p-4 flex flex-col h-full bg-white dark:bg-black/85 rounded-xl shadow-sm m-4">
    <!-- Top Bar -->
    <div class="flex justify-between items-center mb-4">
      <div class="flex gap-2">
        <Input v-model:value="searchKeyword" placeholder="请输入查询关键字" class="w-64" />
        <Button type="primary">查询</Button>
      </div>
      <div class="flex gap-2">
        <Button>刷新</Button>
        <Button type="primary" @click="handleAdd">新建组态</Button>
        <Button danger @click="() => handleDelete()">删除</Button>
      </div>
    </div>

    <!-- Table -->
    <div class="flex-1 overflow-auto">
      <Table
        :columns="columns"
        :data-source="list"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        row-key="id"
        size="small"
        :pagination="{ pageSize: 15, showTotal: total => `共 ${total} 条` }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <div class="flex gap-2">
              <Button type="link" size="small" @click="handlePreview(record)">预览</Button>
              <Button type="link" size="small" @click="handleEdit(record)">编辑</Button>
              <Button type="link" danger size="small" @click="handleDelete(record)">删除</Button>
            </div>
          </template>
        </template>
      </Table>
    </div>
  </div>
</template>
