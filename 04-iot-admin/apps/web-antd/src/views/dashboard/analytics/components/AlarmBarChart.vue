<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { onMounted, ref } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

onMounted(() => {
  renderEcharts({
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      top: '0',
      left: '0',
      right: '0',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: Array.from({ length: 31 }, (_, i) => `${i + 1}`),
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '告警数量',
        type: 'bar',
        barWidth: '60%',
        data: [
          10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 220, 10,
          52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 220, 10, 52,
          200,
        ],
        itemStyle: {
          color: '#1890ff',
        },
      },
    ],
  });
});
</script>

<template>
  <div class="h-full w-full bg-white dark:bg-black/85 p-4 rounded-xl shadow-sm">
    <div class="font-bold mb-4">本月告警统计</div>
    <div class="h-[300px]">
      <EchartsUI ref="chartRef" />
    </div>
  </div>
</template>
