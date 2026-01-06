<script lang="ts" setup>
import { useRouter } from 'vue-router';
import AlarmBarChart from './components/AlarmBarChart.vue';
import InfoList from './components/InfoList.vue';
import StatsCard from './components/StatsCard.vue';
import StatusPieChart from './components/StatusPieChart.vue';

const router = useRouter();

const stats = [
  {
    title: '告警',
    count: 3,
    icon: 'lucide:file-warning',
    color: 'bg-orange-500',
  },
  {
    title: '日志总数',
    count: 0,
    icon: 'lucide:pie-chart',
    color: 'bg-red-500',
  },
  {
    title: '月告警数',
    count: 0,
    icon: 'lucide:bar-chart-3',
    color: 'bg-orange-600',
  },
  {
    title: '联网设备',
    count: 0,
    icon: 'lucide:globe',
    color: 'bg-purple-500',
  },
  {
    title: '正常',
    count: 0,
    icon: 'lucide:file-check',
    color: 'bg-green-600',
  },
  {
    title: '离线',
    count: 0,
    icon: 'lucide:file-x',
    color: 'bg-gray-500',
  },
];

const anomalyAlarms = [
  '压力控制器 C - 压力数据异常 - 2026-01-09 10:29:55',
  '模拟设备 H - 监测数值超限 - 2026-01-09 10:12:00',
  '模拟设备 K - 传感器数据波动 - 2026-01-09 10:15:00',
  '模拟设备 N - 关键指标告警 - 2026-01-09 10:18:00',
  '温湿度传感器 A - 温度数据异常 - 2026-01-09 10:30:00',
];

const deviceAlarms = [
  '智能电表 B - 设备离线 - 2026-01-09 09:20:00',
  '模拟设备 G - 信号丢失 - 2026-01-09 10:11:00',
  '模拟设备 J - 连接超时 - 2026-01-09 10:14:00',
  '模拟设备 M - 维护模式 - 2026-01-09 10:17:00',
  '视频监控 E - 视频流中断 - 2026-01-09 10:35:10',
];

function handleCardClick(title: string) {
  if (title === '告警') {
    router.push('/dashboard/alarm-detail');
  }
}
</script>

<template>
  <div class="p-4">
    <!-- Top Section -->
    <div class="flex flex-col lg:flex-row gap-4 mb-4">
      <!-- Left: Stats Grid -->
      <div class="flex-[3] grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          v-for="(stat, index) in stats"
          :key="index"
          v-bind="stat"
          :class="{ 'cursor-pointer hover:opacity-90': stat.title === '告警' }"
          @click="handleCardClick(stat.title)"
        />
      </div>
      <!-- Right: Pie Chart -->
      <div class="flex-1 min-w-[300px]">
        <StatusPieChart />
      </div>
    </div>

    <!-- Middle: Bar Chart -->
    <div class="mb-4">
      <AlarmBarChart />
    </div>

    <!-- Bottom: Info Panels -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InfoList title="异常数据报警" :items="anomalyAlarms" />
      <InfoList title="设备报警" :items="deviceAlarms" />
    </div>
  </div>
</template>
