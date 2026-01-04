<script lang="ts" setup>
import { EchartsUI, useEcharts, type EchartsUIType } from '@vben/plugins/echarts';

import {
  DatePicker,
  Radio,
  Table,
} from 'ant-design-vue';
import { onMounted, ref } from 'vue';

import DeviceTree from '../../components/DeviceTree.vue';
import { statusBarChartData, statusPieChartData, statusTableData } from '../../mock/status';

const { RangePicker } = DatePicker;

const dateRange = ref();
const timeRange = ref('today');

const barChartRef = ref<EchartsUIType>();
const { renderEcharts: renderBarChart } = useEcharts(barChartRef);

const pieChartRef = ref<EchartsUIType>();
const { renderEcharts: renderPieChart } = useEcharts(pieChartRef);

onMounted(() => {
  renderBarChart({
    title: { text: '运行状态柱形图', left: 'center', textStyle: { color: '#409EFF' } },
    tooltip: { trigger: 'axis' },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: { type: 'category', data: ['告警', '离线', '正常'] },
    yAxis: { type: 'value' },
    series: [
      {
        data: statusBarChartData,
        type: 'bar',
        barWidth: '40%',
        label: { show: true, position: 'top' },
      },
    ],
  });

  renderPieChart({
    title: { text: '运行状态占比图', left: 'left' },
    tooltip: { trigger: 'item' },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: { show: true },
        dataView: { show: true, readOnly: false },
      },
    },
    legend: { orient: 'vertical', left: 'left', top: '30px' },
    series: [
      {
        name: '状态',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'center',
          formatter: '{d}%',
          fontSize: 20,
          fontWeight: 'bold',
          color: '#fff',
        },
        labelLine: { show: false },
        data: statusPieChartData,
      },
    ],
  });
});

// Table
const columns = [
  { title: '单位', dataIndex: 'unit', key: 'unit' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '数量', dataIndex: 'count', key: 'count' },
];

const data = statusTableData;
</script>

<template>
  <div class="flex h-full p-4 gap-4">
    <!-- Left Sidebar -->
    <div class="w-[300px] flex-shrink-0">
      <DeviceTree />
    </div>

    <!-- Right Content -->
    <div class="flex-1 flex flex-col bg-white rounded-xl shadow-sm dark:bg-black/85 p-4 overflow-auto">
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
      </div>

      <!-- Charts Section -->
      <div class="flex flex-col lg:flex-row gap-4 mb-4 h-[400px]">
        <div class="flex-1 border rounded p-2">
          <EchartsUI ref="barChartRef" width="100%" height="100%" />
        </div>
        <div class="flex-1 border rounded p-2">
          <EchartsUI ref="pieChartRef" width="100%" height="100%" />
        </div>
      </div>

      <!-- Table Section -->
      <div>
        <div class="mb-2 font-bold text-gray-600">📅 运行状态统计报表</div>
        <Table :columns="columns" :data-source="data" size="small" :pagination="{ pageSize: 15 }" />
      </div>
    </div>
  </div>
</template>
