<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { Button, Card, Table, Tag } from 'ant-design-vue';

import { realtimeList } from '../../mock/realtime';

const router = useRouter();

const columns = [
  { title: '设备ID', dataIndex: 'id', key: 'id' },
  { title: '设备名称', dataIndex: 'name', key: 'name' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '最后活跃时间', dataIndex: 'lastActive', key: 'lastActive' },
  { title: '操作', key: 'action' },
];

const data = realtimeList;

const handleView = (record: any) => {
  router.push({ name: 'RealtimeMonitoringDetail', params: { id: record.id } });
};
</script>

<template>
  <div class="p-4">
    <Card title="实时监测列表" :bordered="false">
      <Table :columns="columns" :data-source="data">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <Tag color="success" v-if="record.status === 'online'">在线</Tag>
            <Tag color="default" v-else-if="record.status === 'offline'">离线</Tag>
            <Tag color="error" v-else>告警</Tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <Button type="link" @click="handleView(record)">查看详情</Button>
          </template>
        </template>
      </Table>
    </Card>
  </div>
</template>
