<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Table, Tag } from 'ant-design-vue';
import { getAuditsApi } from '#/api/water';
import type { Audit } from '#/mock/water-data';

const columns = [
  { title: '项目名称', dataIndex: 'projectName', key: 'projectName' },
  { title: '审计日期', dataIndex: 'auditDate', key: 'auditDate' },
  { title: '审计单位', dataIndex: 'auditor', key: 'auditor' },
  { title: '结果', dataIndex: 'result', key: 'result' },
  { title: '备注', dataIndex: 'comments', key: 'comments' },
];

const data = ref<Audit[]>([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    data.value = await getAuditsApi();
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="p-4">
    <h2 class="mb-4 text-lg font-bold">项目审计记录</h2>
    <Table :columns="columns" :data-source="data" :loading="loading" :pagination="{ pageSize: 20 }" row-key="id">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'result'">
          <Tag :color="record.result === 'pass' ? 'green' : record.result === 'rectify' ? 'orange' : 'red'">
            {{ record.result === 'pass' ? '通过' : record.result === 'rectify' ? '需整改' : '不通过' }}
          </Tag>
        </template>
      </template>
    </Table>
  </div>
</template>
