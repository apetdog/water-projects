<script lang="ts" setup>
import AlarmBarChart from './components/AlarmBarChart.vue';
import InfoList from './components/InfoList.vue';
import StatsCard from './components/StatsCard.vue';
import StatusPieChart from './components/StatusPieChart.vue';

const stats = [
  {
    title: '告警',
    count: 0,
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

const news = [
  '物联网行业最新动态发布',
  '5G技术在工业物联网中的应用',
  '2025年物联网发展趋势预测',
  '智能家居市场分析报告',
  '边缘计算与云计算的协同发展',
];

const notices = [
  '系统维护通知：本周六晚22:00进行升级',
  '关于加强账号安全管理的通知',
  '新功能上线公告：设备远程调试功能',
  '2025年春节放假安排',
  '客户服务热线变更通知',
];
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
      <InfoList title="行业新闻" :items="news" />
      <InfoList title="通知公告" :items="notices" />
    </div>
  </div>
</template>
