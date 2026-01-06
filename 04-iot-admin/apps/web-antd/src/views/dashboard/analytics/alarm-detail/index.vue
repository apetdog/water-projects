<script lang="ts" setup>
import { Card, Descriptions, Tag, Timeline } from 'ant-design-vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.query.id || '1';

// Mock data
const errorInfo = {
  title: '监测数值超限',
  time: '2026-01-09 10:12:00',
  level: 'High',
  description: '传感器监测到水位超过警戒值，当前水位 3.5m，警戒水位 3.0m。',
};

const deviceInfo = {
  name: '智能液位计 H',
  id: 'DEV-2024001',
  location: '2号沉淀池',
  status: 'Online',
  lastMaintenance: '2025-12-01',
};

const waterLevelInfo = {
  current: 3.5,
  warning: 3.0,
  unit: 'm',
  history: [
    { time: '10:00', value: 2.8 },
    { time: '10:05', value: 2.9 },
    { time: '10:10', value: 3.2 },
    { time: '10:15', value: 3.5 },
  ],
};
</script>

<template>
  <div class="p-4">
    <div class="mb-4 text-xl font-bold">告警详情</div>

    <!-- Error Information -->
    <Card title="报错信息" class="mb-4 shadow-sm">
      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <span class="font-medium text-lg">{{ errorInfo.title }}</span>
          <Tag color="red">{{ errorInfo.level }}</Tag>
        </div>
        <div class="text-gray-500 text-sm">{{ errorInfo.time }}</div>
        <div class="mt-2 text-gray-700 bg-red-50 p-3 rounded">
          {{ errorInfo.description }}
        </div>
      </div>
    </Card>

    <!-- Device Information -->
    <Card title="设备信息" class="mb-4 shadow-sm">
      <Descriptions :column="1" size="small">
        <Descriptions.Item label="设备名称">{{ deviceInfo.name }}</Descriptions.Item>
        <Descriptions.Item label="设备ID">{{ deviceInfo.id }}</Descriptions.Item>
        <Descriptions.Item label="安装位置">{{ deviceInfo.location }}</Descriptions.Item>
        <Descriptions.Item label="设备状态">
          <Tag color="green">{{ deviceInfo.status }}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="上次维护">{{ deviceInfo.lastMaintenance }}</Descriptions.Item>
      </Descriptions>
    </Card>

    <!-- Water Level Information -->
    <Card title="水位信息" class="mb-4 shadow-sm">
      <div class="flex items-end gap-2 mb-4">
        <span class="text-4xl font-bold text-blue-600">{{ waterLevelInfo.current }}</span>
        <span class="text-gray-500 mb-1">{{ waterLevelInfo.unit }}</span>
        <span class="ml-auto text-gray-400 text-sm">警戒值: {{ waterLevelInfo.warning }}{{ waterLevelInfo.unit }}</span>
      </div>
      
      <div class="border-t pt-4">
        <div class="text-sm font-medium mb-2">近期趋势</div>
        <Timeline>
          <Timeline.Item v-for="item in waterLevelInfo.history" :key="item.time" :color="item.value > waterLevelInfo.warning ? 'red' : 'blue'">
            <div class="flex justify-between">
              <span>{{ item.time }}</span>
              <span :class="{'text-red-500 font-bold': item.value > waterLevelInfo.warning}">{{ item.value }}{{ waterLevelInfo.unit }}</span>
            </div>
          </Timeline.Item>
        </Timeline>
      </div>
    </Card>
  </div>
</template>
