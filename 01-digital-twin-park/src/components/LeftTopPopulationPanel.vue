<script setup>
  import { ref, computed } from "vue";
  import { use } from "echarts/core";
  import { CanvasRenderer } from "echarts/renderers";
  import { PieChart } from "echarts/charts";
  import {
    LegendComponent,
    TooltipComponent,
    TitleComponent,
    GraphicComponent,
  } from "echarts/components";
  import ECharts from "vue-echarts";
  import { getModuleConfig } from "../config/panelConfig.js";

  use([
    CanvasRenderer,
    PieChart,
    LegendComponent,
    TooltipComponent,
    TitleComponent,
    GraphicComponent,
  ]);

  // 从配置文件获取数据
  const config = getModuleConfig("topContent");
  const stats = config.stats;

  // 计算总数（如果配置中有指定值则使用配置值，否则自动计算）
  const total = computed(() => {
    if (config.total.value !== null && config.total.value !== undefined) {
      return config.total.value;
    }
    return stats.reduce((s, item) => s + item.value, 0);
  });
  const digits = computed(() => String(total.value).split(""));

  // ECharts 配置
  const option = computed(() => ({
    color: stats.map(s => s.echartsColor),
    tooltip: { trigger: "item" },
    series: [
      {
        type: "pie",
        radius: ["60%", "75%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: true,
        label: { show: false },
        labelLine: { show: false },
        data: stats.map((s) => ({ name: s.name, value: s.value })),
      },
    ],
    graphic: [
      {
        type: "text",
        left: "center",
        top: "40%",
        style: {
          text: total.value.toLocaleString(),
          fill: config.total.textColor.value,
          fontSize: config.total.textSize.value,
          fontWeight: 700,
          textAlign: "center",
        },
      },
      {
        type: "text",
        left: "center",
        top: "56%",
        style: {
          text: config.text.totalLabel,
          fill: config.total.textColor.label,
          fontSize: config.total.textSize.label,
          textAlign: "center",
        },
      },
    ],
  }));
</script>

<template>
  <div class="population-panel">
    <div class="population-header">
      <span class="header-text">{{ config.text.date }}</span>
      <div class="digits">
        <span
          v-for="(d, i) in digits"
          :key="i"
          class="digit"
          >{{ d }}</span
        >
        <span class="unit">{{ config.text.unit }}</span>
      </div>
    </div>
    <div class="top-content-inner">
      <div class="chart-wrapper">
        <ECharts
          class="population-chart"
          :option="option"
          autoresize />
      </div>
      <div class="legend-wrapper">
        <div
          class="legend-item"
          v-for="s in stats"
          :key="s.name">
          <div class="legend-names">
            <span
              class="dot"
              :style="{ background: s.echartsColor }"></span>
            <div 
              class="legend-name"
              :style="{
                color: s.textColor.name,
                fontSize: s.textSize.name
              }">{{ s.name }}</div>
          </div>
          <div 
            class="legend-value"
            :style="{
              color: s.textColor.value,
              fontSize: s.textSize.value
            }">
            {{ s.value.toLocaleString() }}<span 
              class="unit"
              :style="{
                color: s.textColor.unit,
                fontSize: s.textSize.unit
              }">{{ s.unit }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .population-panel {
  }
  .population-header {
    display: flex;
    align-items: center;
    padding: 6vh 0 0 1vw;
  }

  .header-text {
    color: #ffffff;
    font-size: 0.75vw;
    font-weight: 600;
  }

  .digits {
    display: flex;
    align-items: center;
  }

  .digit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.6vw;
    height: 2vw;
    margin-right: 0.3vw;
    color: #f0a00a;
    font-weight: 700;
    font-size: 1.4vw;
    border-radius: 0.2vw;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.12),
      rgba(0, 0, 0, 0.25)
    );
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.25);
  }

  .unit {
    color: #ffffff;
    font-size: 0.95vw;
  }

  .top-content-inner {
    display: flex;
    gap: 1vw;
    align-items: center;
  }

  .chart-wrapper {
    flex: 0 0 40%;
  }

  .population-chart {
    width: 100%;
    height: 10.5vw;
  }

  .legend-wrapper {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 1.2vw;
    grid-column-gap: 1.2vw;
    align-content: start;
  }

  .legend-item {
    display: flex;
    flex-direction: column;
  }

  .dot {
    width: 0.6vw;
    height: 0.6vw;
    margin-right: 0.3vw;
  }

  .legend-names {
    display: flex;
    align-items: center;
  }

  .legend-name {
    // 颜色和大小通过内联样式从配置读取
  }

  .legend-value {
    font-weight: 600;
    // 颜色和大小通过内联样式从配置读取
    .unit {
      margin-left: 0.1vw;
      // 颜色和大小通过内联样式从配置读取
    }
  }
</style>
