<script setup>
  import { ref, computed } from "vue";
  import { use } from "echarts/core";
  import { CanvasRenderer } from "echarts/renderers";
  import { LineChart } from "echarts/charts";
  import {
    GridComponent,
    DataZoomComponent,
    AxisPointerComponent,
    TooltipComponent,
  } from "echarts/components";
  import ECharts from "vue-echarts";
  import { getModuleConfig } from "../config/panelConfig.js";

  use([
    CanvasRenderer,
    LineChart,
    GridComponent,
    DataZoomComponent,
    AxisPointerComponent,
    TooltipComponent,
  ]);

  // 从配置文件获取数据
  const config = getModuleConfig("leftCenter");
  const times = config.numbers.times;
  const flowData = config.numbers.flowData;
  const echartsColors = config.colors.echarts;

  const flowOption = computed(() => ({
    grid: { left: 40, right: 20, top: 40, bottom: 60 },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        lineStyle: { color: echartsColors.axisPointer, width: 1, opacity: 0.6 },
      },
    },
    xAxis: {
      type: "category",
      data: times,
      axisLabel: { 
        color: config.colors.axisLabel,
        fontSize: config.echartsTextSize.xAxisLabel
      },
      axisLine: { lineStyle: { color: config.colors.axisLine } },
      splitLine: {
        show: true,
        interval: 0,
        lineStyle: { color: config.colors.splitLine },
      },
    },
    yAxis: {
      type: "value",
      name: config.text.yAxisUnit,
      nameTextStyle: { 
        color: config.colors.yAxisUnit,
        fontSize: config.echartsTextSize.yAxisUnit
      },
      axisLabel: { 
        color: config.colors.axisLabel,
        fontSize: config.echartsTextSize.yAxisLabel
      },
      axisLine: { show: false },
      splitLine: {
        show: false,
        lineStyle: { color: "rgba(255,255,255,0.08)" },
      },
      max: config.numbers.maxValue,
    },
    series: [
      {
        type: "line",
        smooth: true,
        symbol: "none",
        showSymbol: false,
        lineStyle: { color: echartsColors.line, width: 3 },
        itemStyle: { color: echartsColors.line },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: echartsColors.area.start },
              { offset: 1, color: echartsColors.area.end },
            ],
          },
        },
        data: flowData,
        markPoint: {
          symbol: "circle",
          symbolSize: 10,
          itemStyle: {
            color: echartsColors.markPoint.color,
            shadowBlur: 16,
            shadowColor: echartsColors.markPoint.shadowColor,
          },
          label: { show: false },
          data: [{ coord: config.numbers.markPointData.coord }],
        },
      },
    ],
  }));
</script>

<template>
  <div class="center-flow-panel">
    <ECharts
      class="flow-chart"
      :option="flowOption"
      autoresize />
  </div>
</template>

<style lang="scss" scoped>
  .center-flow-panel {
    padding: 3.6vw 2vw 0;
  }

  .unit-title {
    color: #cde7ff;
    font-size: 1vw;
    margin-bottom: 0.6vw;
  }

  .flow-chart {
    width: 100%;
    height: 13vw;
  }
</style>
