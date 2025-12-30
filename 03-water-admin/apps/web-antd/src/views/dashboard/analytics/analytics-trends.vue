<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { onMounted, ref, nextTick } from 'vue';

import { EchartsUI } from '@vben/plugins/echarts';
import * as echarts from 'echarts';

const chartRef = ref<EchartsUIType>();

const chartOptions = {
  animation: true,
  animationDuration: 8000,
  animationThreshold: 2000,
  grid: {
    bottom: 20,
    containLabel: true,
    left: '1%',
    right: '1%',
    top: '2%',
  },
  series: [
    {
      areaStyle: {},
      animation: true,
      animationDuration: 8000,
      data: [
        3000, 15_000, 35_000, 53_000, 63_000, 70_000, 72_000, 73_000, 74_500,
        75_000, 72_000, 60_000, 48_000, 35_000, 22_000, 12_000, 5000, 2000,
      ],
      itemStyle: {
        color: '#5ab1ef',
      },
      smooth: true,
      type: 'line',
    },
    {
      areaStyle: {},
      animation: true,
      animationDuration: 8000,
      data: [
        1000, 4000, 9000, 15_000, 20_000, 23_000, 24_000, 23_500, 22_000,
        20_000, 18_000, 15_000, 12_000, 9000, 6000, 3500, 1500, 500,
      ],
      itemStyle: {
        color: '#019680',
      },
      smooth: true,
      type: 'line',
    },
  ],
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: '#019680',
        width: 1,
      },
    },
    trigger: 'axis',
  },
  xAxis: {
    axisTick: {
      show: false,
    },
    boundaryGap: false,
    data: [
      '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00',
      '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
      '22:00', '23:00',
    ],
    splitLine: {
      lineStyle: {
        type: 'solid',
        width: 1,
      },
      show: true,
    },
    type: 'category',
  },
  yAxis: [
    {
      axisTick: {
        show: false,
      },
      max: 80_000,
      splitArea: {
        show: true,
      },
      splitNumber: 4,
      type: 'value',
    },
  ],
};

onMounted(async () => {
  await nextTick();
  
  setTimeout(() => {
    const el = chartRef.value?.$el;
    if (!el) return;
    
    // 直接使用 echarts.init 初始化，完全绕过 useEcharts
    const chartInstance = echarts.init(el);
    
    // 设置配置
    chartInstance.setOption(chartOptions);
    
    console.log('图表已初始化，动画配置:', chartOptions.animationDuration);
  }, 100);
});
</script>

<template>
  <EchartsUI ref="chartRef" />
</template>