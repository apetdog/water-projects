<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

import {
  Button,
  Checkbox,
  Input,
  Modal,
  Space,
  Table,
} from 'ant-design-vue';

const [ModalComponent, modalApi] = useVbenModal({
  title: '远程透传命令',
  draggable: true,
  fullscreenButton: false,
  onCancel: () => {
    modalApi.close();
  },
  onConfirm: () => {
    modalApi.close();
  },
});

const columns = [
  {
    title: '设备',
    dataIndex: 'device',
    key: 'device',
  },
  {
    title: '日志类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '日志名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '记录时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'ASC码',
    dataIndex: 'asc',
    key: 'asc',
  },
  {
    title: '16进制',
    dataIndex: 'hex',
    key: 'hex',
  },
];

const data = [
  {
    key: '1',
    device: 'DEV-001',
    type: '发送',
    name: '透传指令',
    time: '2025-12-09 10:30:05',
    asc: 'READ',
    hex: '52 45 41 44',
  },
  {
    key: '2',
    device: 'DEV-001',
    type: '接收',
    name: '响应数据',
    time: '2025-12-09 10:30:06',
    asc: 'OK',
    hex: '4F 4B',
  },
];
</script>

<template>
  <ModalComponent class="w-[800px]">
    <div class="p-4">
      <div class="flex items-center mb-4">
        <span class="mr-2 whitespace-nowrap">透传数据：</span>
        <Input placeholder="请输入透传数据" />
      </div>
      <div class="flex items-center justify-between mb-4">
        <Space>
          <Checkbox checked>ASC码</Checkbox>
          <Checkbox>16进制</Checkbox>
          <Button type="primary">发送</Button>
          <Button>清除日志信息</Button>
          <Button>刷新</Button>
          <Checkbox checked>自动刷新</Checkbox>
        </Space>
      </div>
      <Table
        :columns="columns"
        :data-source="data"
        :pagination="false"
        size="small"
        :scroll="{ y: 300 }"
      />
    </div>
    <template #footer>
        <Space>
            <Button type="primary" @click="() => modalApi.close()">确认</Button>
            <Button @click="() => modalApi.close()">关闭</Button>
        </Space>
    </template>
  </ModalComponent>
</template>
