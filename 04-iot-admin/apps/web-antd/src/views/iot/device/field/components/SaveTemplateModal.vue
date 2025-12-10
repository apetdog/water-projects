<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';
import { Form, Input, InputNumber } from 'ant-design-vue';
import { reactive } from 'vue';

const [Modal, modalApi] = useVbenModal({
  title: '另存模版',
  fullscreenButton: false,
});

const formState = reactive({
  name: '',
  sort: 1,
});

const handleConfirm = () => {
  console.log('Save template:', formState);
  modalApi.close();
};
</script>

<template>
  <Modal class="w-[500px]">
    <Form
      :model="formState"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      layout="horizontal"
      class="pt-4"
    >
      <Form.Item label="名称" name="name" :rules="[{ required: true, message: '请输入名称' }]">
        <Input v-model:value="formState.name" />
      </Form.Item>
      <Form.Item label="排序" name="sort">
        <InputNumber v-model:value="formState.sort" class="w-full" />
      </Form.Item>
    </Form>

    <template #footer>
      <div class="flex justify-end gap-2">
        <a-button @click="modalApi.close()">取消</a-button>
        <a-button type="primary" @click="handleConfirm">确认</a-button>
      </div>
    </template>
  </Modal>
</template>
