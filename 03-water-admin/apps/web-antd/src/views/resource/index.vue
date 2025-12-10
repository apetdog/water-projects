<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Table, Tag } from 'ant-design-vue';
import { getResourcesApi } from '#/api/water';
import type { Resource } from '#/mock/water-data';

const columns = [
  { title: '物资名称', dataIndex: 'name', key: 'name' },
  { title: '类型', dataIndex: 'type', key: 'type' },
  { title: '数量', dataIndex: 'quantity', key: 'quantity' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '存放位置', dataIndex: 'location', key: 'location' },
];

const data = ref<Resource[]>([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    data.value = await getResourcesApi();
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="p-4">
    <h2 class="mb-4 text-lg font-bold">物资资源管理</h2>
    <Table :columns="columns" :data-source="data" :loading="loading" :pagination="{ pageSize: 20 }" row-key="id">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          <Tag :color="record.status === 'available' ? 'green' : record.status === 'in_use' ? 'blue' : 'red'">
            {{ record.status === 'available' ? '可用' : record.status === 'in_use' ? '使用中' : '维护中' }}
          </Tag>
        </template>
        <template v-if="column.key === 'type'">
          <Tag color="cyan">{{ record.type }}</Tag>
        </template>
      </template>
    </Table>
  </div>
</template>
