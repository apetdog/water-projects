<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';
import {
  Button,
  Checkbox,
  Table,
} from 'ant-design-vue';
import { ref } from 'vue';

const [Modal, modalApi] = useVbenModal({
  title: '读取模拟量参数 【快速并发读取的模拟量参数】',
  fullscreenButton: false,
  class: 'w-[600px]',
});

const closeAndConfirm = ref(true);

const columns = [
  { title: '代码', dataIndex: 'code', key: 'code', width: 100 },
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '值', dataIndex: 'value', key: 'value', width: 100 },
];

const data = ref([]); // Initially empty as per screenshot "没有找到想要的相关数据!"

const handleConfirm = () => {
  modalApi.close();
};
</script>

<template>
  <Modal>
    <div class="h-[300px] flex flex-col">
      <Table
        :columns="columns"
        :data-source="data"
        size="small"
        :pagination="false"
        :scroll="{ y: 260 }"
      >
        <template #emptyText>
          <div class="text-red-500 text-left p-2">没有找到想要的相关数据!</div>
        </template>
      </Table>
    </div>

    <template #footer>
      <div class="flex justify-between items-center w-full">
        <Checkbox v-model:checked="closeAndConfirm">确认并关闭窗口</Checkbox>
        <div class="flex gap-2">
          <Button type="primary" @click="handleConfirm">确认</Button>
          <Button @click="modalApi.close()">关闭</Button>
        </div>
      </div>
    </template>
  </Modal>
</template>
