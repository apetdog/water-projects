<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Table, Tag } from 'ant-design-vue';
import { getProjectsApi } from '#/api/water';
import type { Project } from '#/mock/water-data';

const columns = [
  { title: '工程名称', dataIndex: 'name', key: 'name' },
  { title: '地点', dataIndex: 'location', key: 'location' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '预算', dataIndex: 'budget', key: 'budget' },
  { title: '开始日期', dataIndex: 'startDate', key: 'startDate' },
  { title: '负责人', dataIndex: 'manager', key: 'manager' },
];

const data = ref<Project[]>([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    data.value = await getProjectsApi();
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="p-4">
    <h2 class="mb-4 text-lg font-bold">水利工程项目列表</h2>
    <Table :columns="columns" :data-source="data" :loading="loading" :pagination="{ pageSize: 20 }" row-key="id">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          <Tag :color="record.status === 'ongoing' ? 'blue' : record.status === 'completed' ? 'green' : record.status === 'planning' ? 'orange' : 'red'">
            {{ record.status === 'ongoing' ? '进行中' : record.status === 'completed' ? '已完工' : record.status === 'planning' ? '规划中' : '已暂停' }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'budget'">
          ¥{{ record.budget.toLocaleString() }}
        </template>
      </template>
    </Table>
  </div>
</template>
