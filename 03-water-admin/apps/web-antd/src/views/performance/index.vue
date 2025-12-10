<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Table, Tag, Avatar } from 'ant-design-vue';
import { getPerformancesApi } from '#/api/water';
import type { Performance } from '#/mock/water-data';

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '考核周期', dataIndex: 'period', key: 'period' },
  { title: '评分', dataIndex: 'score', key: 'score' },
  { title: '等级', dataIndex: 'grade', key: 'grade' },
  { title: '评估人', dataIndex: 'evaluator', key: 'evaluator' },
];

const data = ref<Performance[]>([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    data.value = await getPerformancesApi();
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="p-4">
    <h2 class="mb-4 text-lg font-bold">人员绩效考核</h2>
    <Table :columns="columns" :data-source="data" :loading="loading" :pagination="{ pageSize: 20 }" row-key="id">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <div class="flex items-center">
            <Avatar class="mr-2" :style="{ backgroundColor: '#1890ff' }">{{ record.name[0] }}</Avatar>
            <span>{{ record.name }}</span>
          </div>
        </template>
        <template v-if="column.key === 'grade'">
          <Tag :color="record.grade === 'A' ? 'green' : record.grade === 'B' ? 'blue' : record.grade === 'C' ? 'orange' : 'red'">
            {{ record.grade }}
          </Tag>
        </template>
        <template v-if="column.key === 'score'">
          <span :class="{'text-green-600': record.score >= 90, 'text-blue-600': record.score >= 80 && record.score < 90, 'text-orange-600': record.score < 80}">
            {{ record.score }}
          </span>
        </template>
      </template>
    </Table>
  </div>
</template>
