<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { onMounted, ref } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

onMounted(() => {
  renderEcharts({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: '运行状态占比',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 10, name: '告警', itemStyle: { color: '#ff4d4f' } },
          { value: 735, name: '在线', itemStyle: { color: '#52c41a' } },
          { value: 50, name: '离线', itemStyle: { color: '#bfbfbf' } },
        ],
      },
    ],
  });
});
</script>

<template>
  <div class="h-full w-full bg-white dark:bg-black/85 p-4 rounded-xl shadow-sm">
    <div class="font-bold mb-2">运行状态占比</div>
    <div class="h-[200px]">
      <EchartsUI ref="chartRef" height="200px" />
    </div>
  </div>
</template>
