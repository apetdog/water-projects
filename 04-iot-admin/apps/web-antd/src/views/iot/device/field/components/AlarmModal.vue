<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';
import {
  Button,
  Checkbox,
  Form,
  InputNumber,
  Select,
  TimePicker,
} from 'ant-design-vue';
import { reactive } from 'vue';

const [Modal, modalApi] = useVbenModal({
  title: '新增告警',
  fullscreenButton: false,
});

const formState = reactive({
  week: [] as string[],
  startTime: undefined as string | undefined,
  endTime: undefined as string | undefined,
  alarmType: 'limit',
  upperLimit: 0,
  lowerLimit: 0,
  sort: 1,
});

const weekOptions = [
  { label: '一', value: '1' },
  { label: '二', value: '2' },
  { label: '三', value: '3' },
  { label: '四', value: '4' },
  { label: '五', value: '5' },
  { label: '六', value: '6' },
  { label: '日', value: '7' },
];

const handleConfirm = () => {
  console.log('Save alarm:', formState);
  modalApi.close();
};
</script>

<template>
  <Modal class="w-[600px]">
    <Form
      :model="formState"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      layout="horizontal"
      class="pt-4"
    >
      <Form.Item label="星期" name="week" :rules="[{ required: true, message: '请选择星期' }]">
        <Checkbox.Group v-model:value="formState.week" :options="weekOptions" />
      </Form.Item>
      <Form.Item label="开始时间" name="startTime">
        <TimePicker v-model:value="formState.startTime" format="HH:mm" value-format="HH:mm" class="w-full" />
      </Form.Item>
      <Form.Item label="结束时间" name="endTime">
        <TimePicker v-model:value="formState.endTime" format="HH:mm" value-format="HH:mm" class="w-full" />
      </Form.Item>
      <Form.Item label="告警类型" name="alarmType">
        <Select v-model:value="formState.alarmType">
          <Select.Option value="limit">上下限告警</Select.Option>
          <Select.Option value="switch">开关量告警</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="上限值" name="upperLimit">
        <InputNumber v-model:value="formState.upperLimit" class="w-full" />
      </Form.Item>
      <Form.Item label="下限值" name="lowerLimit">
        <InputNumber v-model:value="formState.lowerLimit" class="w-full" />
      </Form.Item>
      <Form.Item label="排序" name="sort">
        <InputNumber v-model:value="formState.sort" class="w-full" />
      </Form.Item>
    </Form>

    <template #footer>
      <div class="flex justify-end gap-2">
        <Button @click="modalApi.close()">取消</Button>
        <Button type="primary" @click="handleConfirm">确认</Button>
      </div>
    </template>
  </Modal>
</template>
