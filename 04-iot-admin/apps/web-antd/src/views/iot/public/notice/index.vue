<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';
import {
  Button,
  Input,
  message,
  Modal,
  Table,
  Tag,
} from 'ant-design-vue';
import { reactive, ref } from 'vue';

import NoticeModal from './components/NoticeModal.vue';
import { noticeList } from '../../mock/notice';

const [NoticeModalComponent, noticeModalApi] = useVbenModal({
  connectedComponent: NoticeModal,
});

const searchKeyword = ref('');
const selectedRowKeys = ref<string[]>([]);
const currentRecord = ref<any>(null);

const columns = [
  { title: '标题', dataIndex: 'title', key: 'title' },
  { title: '作者', dataIndex: 'author', key: 'author' },
  { title: '发布时间', dataIndex: 'publishTime', key: 'publishTime' },
  { title: '是否有效', dataIndex: 'isValid', key: 'isValid' },
  { title: '内容', dataIndex: 'content', key: 'content', ellipsis: true },
];

const data = ref(noticeList);

const handleAdd = () => {
  currentRecord.value = null;
  noticeModalApi.open();
};

const handleEdit = () => {
  if (selectedRowKeys.value.length !== 1) {
    message.warning('请选择一条记录进行编辑');
    return;
  }
  const record = data.value.find(item => item.key === selectedRowKeys.value[0]);
  currentRecord.value = record;
  noticeModalApi.open();
};

const handleDelete = () => {
  if (selectedRowKeys.value.length === 0) {
    message.warning('请选择要删除的记录');
    return;
  }
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除选中的 ${selectedRowKeys.value.length} 条记录吗？`,
    onOk() {
      data.value = data.value.filter(item => !selectedRowKeys.value.includes(item.key));
      selectedRowKeys.value = [];
      message.success('删除成功');
    },
  });
};

const onSelectChange = (keys: any[]) => {
  selectedRowKeys.value = keys as string[];
};

const handleModalSuccess = (values: any) => {
  if (currentRecord.value) {
    // Edit
    const index = data.value.findIndex(item => item.key === currentRecord.value.key);
    if (index !== -1) {
      data.value[index] = { ...data.value[index], ...values };
    }
  } else {
    // Add
    data.value.unshift({
      key: Date.now().toString(),
      ...values,
    });
  }
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
        <Button type="primary" @click="handleAdd">+ 新增</Button>
        <Button @click="handleEdit">编辑</Button>
        <Button danger @click="handleDelete">删除</Button>
      </div>
    </div>

    <!-- Table -->
    <div class="flex-1 overflow-auto">
      <Table
        :columns="columns"
        :data-source="data"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        size="small"
        :pagination="{ pageSize: 15, showTotal: total => `共 ${total} 条` }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'isValid'">
             <Tag :color="record.isValid ? 'green' : 'red'">
               {{ record.isValid ? '有效' : '无效' }}
             </Tag>
          </template>
        </template>
      </Table>
    </div>

    <NoticeModalComponent :record="currentRecord" @success="handleModalSuccess" />
  </div>
</template>
