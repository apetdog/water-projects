<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
} from 'ant-design-vue';
import dayjs from 'dayjs';
import { reactive } from 'vue';

const props = defineProps<{
  record?: any;
}>();

const emit = defineEmits(['success']);

const [Modal, modalApi] = useVbenModal({
  title: '新增',
  fullscreenButton: false,
  class: 'w-[800px]',
  onOpenChange(isOpen) {
    if (isOpen) {
      if (props.record) {
        modalApi.setState({ title: '编辑' });
        formState.title = props.record.title;
        formState.author = props.record.author;
        formState.publishTime = props.record.publishTime ? dayjs(props.record.publishTime) : undefined;
        formState.isValid = props.record.isValid;
        formState.content = props.record.content;
      } else {
        modalApi.setState({ title: '新增' });
        resetForm();
      }
    }
  },
});

interface FormState {
  title: string;
  author: string;
  publishTime: dayjs.Dayjs | undefined;
  isValid: boolean;
  content: string;
}

const formState = reactive<FormState>({
  title: '',
  author: '请输入作者',
  publishTime: dayjs(),
  isValid: true,
  content: '',
});

const resetForm = () => {
  formState.title = '';
  formState.author = '请输入作者';
  formState.publishTime = dayjs();
  formState.isValid = true;
  formState.content = '';
};

const closeAndConfirm = reactive({ checked: true });

const handleConfirm = () => {
  if (!formState.title) {
    message.error('请输入标题');
    return;
  }
  console.log('Save news:', formState);
  emit('success', { ...formState, publishTime: formState.publishTime?.format('YYYY-MM-DD HH:mm:ss') });
  message.success('保存成功');
  if (closeAndConfirm.checked) {
    modalApi.close();
  }
};

// Mock Editor Toolbar items
const toolbarItems = ['H', 'B', 'I', 'U', 'S', 'A', 'List', 'List', 'Quote', 'Code', 'Table', 'Link', 'Image', 'Minus', 'Indent', 'Outdent'];
</script>

<template>
  <Modal>
    <Form
      :model="formState"
      :label-col="{ span: 3 }"
      :wrapper-col="{ span: 20 }"
      layout="horizontal"
      class="pt-4"
    >
      <Form.Item label="标题" required>
        <Input v-model:value="formState.title" placeholder="请输入标题" />
      </Form.Item>
      <div class="flex gap-4">
        <Form.Item label="作者" class="flex-1" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" required>
          <Input v-model:value="formState.author" placeholder="请输入作者" />
        </Form.Item>
        <Form.Item label="发布时间" class="flex-1" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <DatePicker v-model:value="formState.publishTime" show-time class="w-full" />
        </Form.Item>
      </div>
      <Form.Item label=" " :colon="false">
        <Checkbox v-model:checked="formState.isValid">有效</Checkbox>
      </Form.Item>
      
      <Form.Item label="内容">
        <div class="border rounded border-gray-300">
          <!-- Mock Toolbar -->
          <div class="flex flex-wrap gap-2 p-2 border-b border-gray-200 bg-gray-50">
             <div 
               v-for="(item, index) in toolbarItems" 
               :key="index"
               class="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-100 text-xs text-gray-600 font-bold"
             >
               {{ item[0] }}
             </div>
          </div>
          <!-- Editor Area -->
          <textarea 
            v-model="formState.content"
            class="w-full h-[300px] p-2 outline-none resize-none"
            placeholder="这里输入文章内容..."
          ></textarea>
        </div>
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
