<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { AnalysisOverviewItem } from '@vben/common-ui';
import type { TabOption } from '@vben/types';

import {
  AnalysisChartCard,
  AnalysisChartsTabs,
  AnalysisOverview,
} from '@vben/common-ui';
import {
  SvgBellIcon,
  SvgCakeIcon,
  SvgCardIcon,
  SvgDownloadIcon,
} from '@vben/icons';
import { Button, Empty, RangePicker } from 'ant-design-vue';

import AnalyticsTrends from './analytics-trends.vue';
import AnalyticsVisits from './analytics-visits.vue';
import AnalyticsAI from './components/AnalyticsAI.vue';

const loading = ref(false);
const dataReady = ref(false);

// Device connection logic
const deviceCount = ref(0);
const deviceName = ref('');
const handleRefreshDevice = () => {
  setTimeout(() => {
    deviceCount.value = 1;
    deviceName.value = '智能水表-001';
  }, 500);
};

const handleStart = () => {
  loading.value = true;
  dataReady.value = false;
  setTimeout(() => {
    loading.value = false;
    dataReady.value = true;
  }, 1000);
};

const realOverviewItems: AnalysisOverviewItem[] = [
  {
    icon: SvgCardIcon,
    title: '用户量',
    totalTitle: '总用户量',
    totalValue: 150_000,
    value: 25_000,
  },
  {
    icon: SvgCakeIcon,
    title: '访问量',
    totalTitle: '总访问量',
    totalValue: 800_000,
    value: 150_000,
  },
  {
    icon: SvgDownloadIcon,
    title: '下载量',
    totalTitle: '总下载量',
    totalValue: 120_000,
    value: 8000,
  },
  {
    icon: SvgBellIcon,
    title: '使用量',
    totalTitle: '总使用量',
    totalValue: 50_000,
    value: 5000,
  },
];

const overviewItems = computed(() => {
  if (!dataReady.value) {
    return realOverviewItems.map((item) => ({
      ...item,
      totalValue: 0,
      value: 0,
    }));
  }
  return realOverviewItems;
});

const chartTabs: TabOption[] = [
  {
    label: '流量趋势',
    value: 'trends',
  },
  {
    label: '月访问量',
    value: 'visits',
  },
];
</script>

<template>
  <div class="p-5">
    <div class="mb-5 flex items-center gap-4 bg-white p-4 dark:bg-black/85 rounded-xl shadow">
      <RangePicker />
      <Button :loading="loading" type="primary" @click="handleStart">
        {{ loading ? '刷新中...' : '刷新' }}
      </Button>

      <div class="ml-auto flex items-center gap-2 dark:text-gray-300">
        <span>链接设备数：{{ deviceCount }}</span>
        <span v-if="deviceCount > 0" class="mr-2">{{ deviceName }}</span>
         <span
          class="cursor-pointer text-blue-500 transition-all duration-300" 
          @click="handleRefreshDevice" 
        >刷新</span>
      </div>
    </div>

    <AnalysisOverview :items="overviewItems" />
    <AnalysisChartsTabs :tabs="chartTabs" class="mt-5">
      <template #trends>
        <AnalyticsTrends v-if="dataReady" />
        <Empty
          v-else
          description="请先开始分析"
          :image="Empty.PRESENTED_IMAGE_SIMPLE"
        />
      </template>
      <template #visits>
        <AnalyticsVisits v-if="dataReady" />
        <Empty
          v-else
          description="请先开始分析"
          :image="Empty.PRESENTED_IMAGE_SIMPLE"
        />
      </template>
    </AnalysisChartsTabs>

    <div class="mt-5 w-full">
      <AnalyticsAI />
    </div>
  </div>
</template>
