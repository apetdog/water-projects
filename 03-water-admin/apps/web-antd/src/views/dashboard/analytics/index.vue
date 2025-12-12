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
import AnalyticsVisitsData from './analytics-visits-data.vue';
import AnalyticsVisitsSales from './analytics-visits-sales.vue';
import AnalyticsVisitsSource from './analytics-visits-source.vue';
import AnalyticsVisits from './analytics-visits.vue';

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
  setTimeout(() => {
    loading.value = false;
    dataReady.value = true;
  }, 3000);
};

const realOverviewItems: AnalysisOverviewItem[] = [
  {
    icon: SvgCardIcon,
    title: '用户量',
    totalTitle: '总用户量',
    totalValue: 120_000,
    value: 2000,
  },
  {
    icon: SvgCakeIcon,
    title: '访问量',
    totalTitle: '总访问量',
    totalValue: 500_000,
    value: 20_000,
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

    <div class="mt-5 w-full md:flex">
      <AnalysisChartCard class="mt-5 md:mr-4 md:mt-0 md:w-1/3" title="访问数量">
        <AnalyticsVisitsData v-if="dataReady" />
        <Empty v-else description="暂无数据" />
      </AnalysisChartCard>
      <AnalysisChartCard class="mt-5 md:mr-4 md:mt-0 md:w-1/3" title="访问来源">
        <AnalyticsVisitsSource v-if="dataReady" />
        <Empty v-else description="暂无数据" />
      </AnalysisChartCard>
      <AnalysisChartCard class="mt-5 md:mt-0 md:w-1/3" title="访问来源">
        <AnalyticsVisitsSales v-if="dataReady" />
        <Empty v-else description="暂无数据" />
      </AnalysisChartCard>
    </div>
  </div>
</template>
