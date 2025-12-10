<script setup>
  import { ref, computed } from "vue";
  import { use } from "echarts/core";
  import { CanvasRenderer } from "echarts/renderers";
  import { BarChart } from "echarts/charts";
  import { GridComponent, TooltipComponent, MarkLineComponent } from "echarts/components";
  import ECharts from "vue-echarts";
  import { getModuleConfig } from "../config/panelConfig.js";

  use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, MarkLineComponent]);

  // 从配置文件获取数据
  const config = getModuleConfig("rightCenter");
  const categories = config.text.categories;
  const expenses = config.numbers.expenses;
  const colors = config.colors.echarts;

  function hexToRgba(hex, a) {
    const h = hex.replace("#", "");
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  const total = computed(() => expenses.reduce((s, v) => s + v, 0));
  const placeholder = computed(() => {
    const result = [0];
    let acc = total.value;
    for (let i = 0; i < expenses.length; i++) {
      acc -= expenses[i];
      result.push(acc);
    }
    return result;
  });
  
  const levels = computed(() => {
    const result = [total.value];
    let acc = total.value;
    for (let i = 0; i < expenses.length; i++) {
      acc -= expenses[i];
      result.push(acc);
    }
    return result;
  });

  const segmentedMarkLines = computed(() => 
    levels.value.map((y, idx) => ([
      {
        yAxis: y,
        xAxis: categories[0],
        lineStyle: {
          type: "dashed",
          color: hexToRgba(colors[idx] || "#ffffff", 0.7),
          width: 1,
        },
      },
      {
        yAxis: y,
        xAxis: categories[Math.min(idx, categories.length - 1)],
      },
    ]))
  );

  const option = computed(() => ({
    grid: {
      left: "0",
      right: "6%",
      top: "6%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      splitLine: { show: false },
      data: categories,
      axisLabel: { color: config.colors.axisLabel, fontSize: 6 },
      axisLine: { lineStyle: { color: config.colors.axisLine } },
    },
    yAxis: {
      type: "value",
      splitLine: { show: false },
      axisLabel: { color: config.colors.axisLabel, fontSize: 6 },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: function (params) {
        var tar = params[1];
        return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
      },
      textStyle: { fontSize: 10 },
    },
    series: [
      {
        name: "Placeholder",
        type: "bar",
        stack: "Total",
        itemStyle: { borderColor: "transparent", color: "transparent" },
        emphasis: {
          itemStyle: { borderColor: "transparent", color: "transparent" },
        },
        data: placeholder.value,
      },
      {
        name: "Life Cost",
        type: "bar",
        stack: "Total",
        label: {
          show: true,
          position: "top",
          color: config.colors.label,
          fontSize: 6,
        },
        data: [total.value, ...expenses],
        itemStyle: {
          color: function (p) {
            return colors[p.dataIndex] || "#39a8ff";
          },
        },
        markLine: {
          symbol: "none",
          silent: true,
          label: { show: false },
          data: segmentedMarkLines.value,
        },
      },
    ],
  }));
</script>

<template>
  <div class="industry-bar-panel">
    <ECharts
      class="industry-bar"
      :option="option"
      autoresize />
  </div>
</template>

<style lang="scss" scoped>
  .industry-bar-panel {
    padding: 0 0.2vw;
    display: flex;
    justify-content: center;
  }

  .industry-bar {
    width: 90%;
    height: 12vw;
  }
</style>
