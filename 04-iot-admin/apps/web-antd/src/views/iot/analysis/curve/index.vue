<script lang="ts" setup>
import { EchartsUI, useEcharts, type EchartsUIType } from '@vben/plugins/echarts';

import { Button, Card, DatePicker, Radio, Space } from 'ant-design-vue';
import { onMounted, ref } from 'vue';

import DeviceTree from '../../components/DeviceTree.vue';
import { curveSeriesData, curveXAxisData } from '../../mock/curve';

const { RangePicker } = DatePicker;

const dateRange = ref();
const timeRange = ref('today');

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

onMounted(() => {
  renderEcharts({
    title: {
      text: '【2025-01-01 00:00:00 至 2025-12-09 23:59:59 选中设备字段数据曲线】',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['水黑液位'],
      top: 30,
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        saveAsImage: {},
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: curveXAxisData,
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 3500,
    },
    series: [
      {
        name: '水黑液位',
        type: 'line',
        data: curveSeriesData,
        smooth: true,
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' },
          ],
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }],
        },
      },
    ],
  });
});
</script>

<template>
  <div class="flex h-full p-4 gap-4">
    <!-- Left Sidebar -->
    <div class="w-[300px] flex-shrink-0">
      <DeviceTree />
    </div>

    <!-- Right Content -->
    <div class="flex-1 flex flex-col bg-white rounded-xl shadow-sm dark:bg-black/85 p-4">
      <!-- Toolbar -->
      <div class="mb-4 flex flex-wrap gap-2 items-center border-b pb-4">
        <span>日期：</span>
        <RangePicker show-time v-model:value="dateRange" />
        <Radio.Group v-model:value="timeRange" button-style="solid">
          <Radio.Button value="today">本日</Radio.Button>
          <Radio.Button value="week">本周</Radio.Button>
          <Radio.Button value="month">本月</Radio.Button>
          <Radio.Button value="year">本年</Radio.Button>
        </Radio.Group>
        <Button type="primary">📈 生成预览</Button>
        <div class="flex-1"></div>
        <Space>
          <Button type="text" title="切换视图">📐</Button>
          <Button type="text" title="下载">⬇️</Button>
          <Button type="text" title="刷新">🔄</Button>
        </Space>
      </div>

      <!-- Chart -->
      <div class="flex-1 min-h-[400px]">
        <EchartsUI ref="chartRef" width="100%" height="100%" />
      </div>
    </div>
  </div>
</template>
