<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import * as echarts from 'echarts';
import { useThemeStore } from '@/store/modules/theme';

defineOptions({
  name: 'PvPanelDetail'
});

const route = useRoute();
const themeStore = useThemeStore();
const panelId = computed(() => String(route.query.id || ''));
const status = computed(() => {
  const s = String(route.query.status || 'normal');
  if (s === 'serious') return 'warning';
  if (s === 'accident') return 'error';
  return s;
});
const statusType = computed<'success' | 'warning' | 'error'>(() => {
  if (status.value === 'error') return 'error';
  if (status.value === 'warning') return 'warning';
  return 'success';
});

const statusText = computed(() => {
  if (status.value === 'normal') return '正常';
  if (status.value === 'warning') return '预警';
  return '故障';
});

const abnormalTitle = computed(() => {
  if (status.value === 'warning') return '预警提示';
  if (status.value === 'error') return '故障提示';
  return '运行正常';
});

const pageTitle = computed(() => `单板数据分析 - ${panelId.value}（${statusText.value}）`);

const vChartRef = ref<HTMLDivElement | null>(null);
const iChartRef = ref<HTMLDivElement | null>(null);
const tChartRef = ref<HTMLDivElement | null>(null);

let vChart: echarts.ECharts | null = null;
let iChart: echarts.ECharts | null = null;
let tChart: echarts.ECharts | null = null;

function genTimes(n = 24) {
  return Array.from({ length: n }).map((_, i) => `${String(i).padStart(2, '0')}:00`);
}

function seedFromId(id: string) {
  let s = 1;
  for (let i = 0; i < id.length; i += 1) {
    s = (s * 131 + id.charCodeAt(i)) % 2147483647;
  }
  return s;
}

function createLCG(seed: number) {
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;
  function nextLCG() {
    state = (state * 48271) % 2147483647;
    return state / 2147483647;
  }
  return nextLCG;
}

function genSeriesByIdAndStatus(id: string, s: 'normal' | 'warning' | 'error') {
  const rnd = createLCG(seedFromId(id));
  const hours = 24;
  const v: number[] = [];
  const i: number[] = [];
  const t: number[] = [];

  let perfFactor = 1;
  let tempFactor = 1;
  if (s === 'warning') {
    perfFactor = 0.93;
    tempFactor = 1.05;
  } else if (s === 'error') {
    perfFactor = 0.82;
    tempFactor = 1.12;
  }

  for (let h = 0; h < hours; h += 1) {
    const x = (h - 12.5) / 5;
    const shape = Math.max(0, Math.exp(-x * x));
    const jitterV = (rnd() - 0.5) * 1.2;
    const jitterI = (rnd() - 0.5) * 0.9;
    const jitterT = (rnd() - 0.5) * 2.0;

    let vVal = (34 + 1.6 * shape + jitterV) * perfFactor;
    let iVal = (8 + 3.2 * shape + jitterI) * perfFactor;
    let tVal = (42 + 6.5 * shape + jitterT) * tempFactor;

    if (s === 'error' && h >= 10 && h <= 15) {
      vVal *= 0.95;
      iVal *= 0.9;
      tVal *= 1.03;
    }

    v.push(Number(vVal.toFixed(2)));
    i.push(Number(iVal.toFixed(2)));
    t.push(Number(tVal.toFixed(2)));
  }

  return { v, i, t };
}

function initCharts() {
  const isDark = themeStore.darkMode;
  
  const textColor = isDark ? '#e2e8f0' : '#1e293b';
  const axisColor = isDark ? '#94a3b8' : '#64748b';
  const splitColor = isDark ? '#334155' : '#e2e8f0';
  const tooltipBg = isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)';

  const getOption = (unit: string, color: string) => ({
    tooltip: { 
      trigger: 'axis',
      backgroundColor: tooltipBg,
      borderColor: color,
      textStyle: { color: textColor }
    },
    grid: {
      top: '15%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: { 
      type: 'category', 
      data: genTimes(),
      axisLabel: { color: axisColor },
      axisLine: { lineStyle: { color: splitColor } }
    },
    yAxis: { 
      type: 'value', 
      name: unit,
      nameTextStyle: { color: axisColor },
      axisLabel: { color: axisColor },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: splitColor
        }
      }
    },
    series: [{ 
      type: 'line', 
      data: [], 
      smooth: true,
      showSymbol: false,
      itemStyle: { color },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color }, // You might want to use rgba here for transparency
          { offset: 1, color: isDark ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)' }
        ])
      }
    }]
  });

  const vColor = isDark ? '#00f2f1' : '#0284c7';
  const iColor = isDark ? '#00ff9d' : '#16a34a';
  const tColor = isDark ? '#ff9f0e' : '#d97706';

  if (vChartRef.value) {
    if (vChart) vChart.dispose();
    vChart = echarts.init(vChartRef.value);
    vChart.setOption(getOption('V', vColor));
  }
  if (iChartRef.value) {
    if (iChart) iChart.dispose();
    iChart = echarts.init(iChartRef.value);
    iChart.setOption(getOption('A', iColor));
  }
  if (tChartRef.value) {
    if (tChart) tChart.dispose();
    tChart = echarts.init(tChartRef.value);
    tChart.setOption(getOption('℃', tColor));
  }
}

function updateCharts() {
  const series = genSeriesByIdAndStatus(panelId.value, status.value as 'normal' | 'warning' | 'error');
  vChart?.setOption({ series: [{ data: series.v }] });
  iChart?.setOption({ series: [{ data: series.i }] });
  tChart?.setOption({ series: [{ data: series.t }] });
}

onMounted(() => {
  initCharts();
  updateCharts();
});

onBeforeUnmount(() => {
  vChart?.dispose();
  iChart?.dispose();
  tChart?.dispose();
});

watch([panelId, status], () => {
  updateCharts();
});
</script>

<template>
  <div class="flex-col-stretch gap-16px">
    <NCard :bordered="false" :title="pageTitle">
      <div class="mb-8px">
        <NTag :type="statusType" size="small">
          {{ statusText }}
        </NTag>
      </div>
      <div class="text-12px text-gray-500 dark:text-gray-400">已脱敏显示：仅展示匿名编号与统计指标</div>
      <NGrid :x-gap="16" :y-gap="16" cols="1 s:1 m:3">
        <NGi>
          <NCard :bordered="false" title="电压趋势">
            <div ref="vChartRef" class="chart-container"></div>
          </NCard>
        </NGi>
        <NGi>
          <NCard :bordered="false" title="电流趋势">
            <div ref="iChartRef" class="chart-container"></div>
          </NCard>
        </NGi>
        <NGi>
          <NCard :bordered="false" title="温度趋势">
            <div ref="tChartRef" class="chart-container"></div>
          </NCard>
        </NGi>
      </NGrid>
      <div class="mt-12px">
        <NAlert v-if="status !== 'normal'" :type="statusType" :title="abnormalTitle">
          检测到该面板存在
          <span v-if="status === 'warning'">预警</span>
          <span v-else>故障</span>
          ，建议检查连接、遮挡与积灰情况。
        </NAlert>
        <NAlert v-else type="success" title="运行正常">该面板运行状态正常，各项指标在合理范围。</NAlert>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  height: 240px;
}
</style>
