<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Table, Tag, Avatar } from 'ant-design-vue';
import { getPersonnelApi } from '#/api/water';
import type { Personnel } from '#/mock/water-data';

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '职位', dataIndex: 'role', key: 'role' },
  { title: '部门', dataIndex: 'department', key: 'department' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '入职日期', dataIndex: 'joinDate', key: 'joinDate' },
  { title: '联系电话', dataIndex: 'phone', key: 'phone' },
];

const data = ref<Personnel[]>([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    data.value = await getPersonnelApi();
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="p-4">
    <h2 class="mb-4 text-lg font-bold">人事管理列表</h2>
    <Table :columns="columns" :data-source="data" :loading="loading" :pagination="{ pageSize: 20 }" row-key="id">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <div class="flex items-center">
            <Avatar class="mr-2" :style="{ backgroundColor: '#f56a00' }">{{ record.name[0] }}</Avatar>
            <span>{{ record.name }}</span>
          </div>
        </template>
        <template v-if="column.key === 'status'">
          <Tag :color="record.status === 'active' ? 'green' : record.status === 'leave' ? 'orange' : 'red'">
            {{ record.status === 'active' ? '在职' : record.status === 'leave' ? '请假' : '离职' }}
          </Tag>
        </template>
      </template>
    </Table>
  </div>
</template>
