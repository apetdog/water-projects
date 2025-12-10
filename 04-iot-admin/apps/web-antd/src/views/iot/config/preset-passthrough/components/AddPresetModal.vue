<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
} from 'ant-design-vue';
import { reactive } from 'vue';

const [Modal, modalApi] = useVbenModal({
  title: '新增',
  fullscreenButton: false,
  class: 'w-[600px]',
});

const formState = reactive({
  name: '',
  interface: '通讯口一',
  commandType: 'ASCII',
  content: '',
});

const closeAndConfirm = reactive({ checked: true });

const handleConfirm = () => {
  console.log('Add preset:', formState);
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
      <Form.Item label="名称" name="name" :rules="[{ required: true, message: '请输入名称' }]">
        <Input v-model:value="formState.name" />
      </Form.Item>
      <Form.Item label="通讯口" name="interface">
        <Select v-model:value="formState.interface">
          <Select.Option value="通讯口一">通讯口一</Select.Option>
          <Select.Option value="通讯口二">通讯口二</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="命令" name="commandType">
        <Radio.Group v-model:value="formState.commandType">
          <Checkbox :checked="formState.commandType === 'ASCII'" @update:checked="val => val && (formState.commandType = 'ASCII')">ASCII码</Checkbox>
          <Checkbox :checked="formState.commandType === '16Hex'" @update:checked="val => val && (formState.commandType = '16Hex')">16进制</Checkbox>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="命令内容" name="content">
        <Input v-model:value="formState.content" />
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
