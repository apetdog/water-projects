<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';
import {
  Button,
  Checkbox,
  Form,
  Input,
} from 'ant-design-vue';
import { reactive } from 'vue';

const [Modal, modalApi] = useVbenModal({
  title: '编辑',
  fullscreenButton: false,
  class: 'w-[500px]',
});

const formState = reactive({
  device: '002512010117',
  category: 'RTU终端配置参数',
  code: 'TPITV',
  name: '采集周期(分)',
  value: '5',
});

const closeAndConfirm = reactive({ checked: true });

const handleConfirm = () => {
  console.log('Update param:', formState);
  modalApi.close();
};
</script>

<template>
  <Modal>
    <Form
      :model="formState"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
      layout="horizontal"
      class="pt-4"
    >
      <Form.Item label="设备">
        <Input v-model:value="formState.device" disabled />
      </Form.Item>
      <Form.Item label="分类">
        <Input v-model:value="formState.category" disabled />
      </Form.Item>
      <Form.Item label="代码">
        <Input v-model:value="formState.code" disabled />
      </Form.Item>
      <Form.Item label="名称">
        <Input v-model:value="formState.name" disabled />
      </Form.Item>
      <Form.Item label="参数值">
        <Input v-model:value="formState.value" />
      </Form.Item>
    </Form>

    <template #footer>
      <div class="flex justify-between items-center w-full">
        <Checkbox v-model:checked="closeAndConfirm.checked">确认并关闭窗口</Checkbox>
        <div class="flex gap-2">
          <Button type="primary" @click="handleConfirm">确认</Button>
          <Button @click="modalApi.close()">关闭</Button>
        </div>
      </div>
    </template>
  </Modal>
</template>
