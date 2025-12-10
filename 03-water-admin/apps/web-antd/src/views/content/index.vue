<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Table, Tag, Badge } from 'ant-design-vue';
import { getNoticesApi } from '#/api/water';
import type { Notice } from '#/mock/water-data';

const columns = [
  { title: '标题', dataIndex: 'title', key: 'title' },
  { title: '分类', dataIndex: 'category', key: 'category' },
  { title: '日期', dataIndex: 'date', key: 'date' },
  { title: '作者', dataIndex: 'author', key: 'author' },
  { title: '状态', dataIndex: 'status', key: 'status' },
];

const data = ref<Notice[]>([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    data.value = await getNoticesApi();
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="p-4">
    <h2 class="mb-4 text-lg font-bold">通知公告管理</h2>
    <Table :columns="columns" :data-source="data" :loading="loading" :pagination="{ pageSize: 20 }" row-key="id">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
           <Badge :status="record.status === 'published' ? 'success' : 'warning'" :text="record.status === 'published' ? '已发布' : '草稿'" />
        </template>
        <template v-else-if="column.key === 'category'">
           <Tag color="cyan">{{ record.category }}</Tag>
        </template>
      </template>
    </Table>
  </div>
</template>
