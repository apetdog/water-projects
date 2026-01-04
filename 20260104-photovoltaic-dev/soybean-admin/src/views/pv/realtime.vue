<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as echarts from 'echarts';

defineOptions({
  name: 'PvRealtime'
});

const chartRef = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts | null = null;
let timer: number | null = null;

const times: string[] = [];
const powerData: number[] = [];

function initData() {
  const now = Date.now();
  for (let i = 60; i > 0; i--) {
    const t = new Date(now - i * 60 * 1000);
    times.push(`${t.getHours().toString().padStart(2, '0')}:${t.getMinutes().toString().padStart(2, '0')}`);
    powerData.push(800 + Math.round(Math.random() * 400));
  }
}

function initChart() {
  if (!chartRef.value) return;
  try {
    chart = echarts.init(chartRef.value);
    chart.setOption({
      grid: { left: 40, right: 20, top: 20, bottom: 30 },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: times },
      yAxis: { type: 'value', name: 'kW' },
      series: [
        {
          name: '实时功率',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: powerData
        }
      ]
    });
  } catch (e) {
    console.error('Chart init failed:', e);
  }
}

function startRealtime() {
  timer = window.setInterval(() => {
    const t = new Date();
    times.push(`${t.getHours().toString().padStart(2, '0')}:${t.getMinutes().toString().padStart(2, '0')}`);
    powerData.push(800 + Math.round(Math.random() * 400));
    if (times.length > 120) {
      times.shift();
      powerData.shift();
    }
    chart?.setOption({
      xAxis: { data: times },
      series: [{ data: powerData }]
    });
  }, 5000);
}

onMounted(() => {
  initData();
  initChart();
  startRealtime();
});

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer);
  chart?.dispose();
  chart = null;
});
</script>

<template>
  <div class="flex-col-stretch gap-16px">
    <NGrid :x-gap="16" :y-gap="16" cols="1 s:1 m:4">
      <NGi>
        <NCard :bordered="false" title="当前功率">
          <div class="text-28px font-semibold">1.2 MW</div>
          <div class="text-12px text-#999">已脱敏显示</div>
        </NCard>
      </NGi>
      <NGi>
        <NCard :bordered="false" title="今日发电量">
          <div class="text-28px font-semibold">5.8 MWh</div>
          <div class="text-12px text-#999">已脱敏显示</div>
        </NCard>
      </NGi>
      <NGi>
        <NCard :bordered="false" title="等效小时">
          <div class="text-28px font-semibold">4.1 h</div>
          <div class="text-12px text-#999">已脱敏显示</div>
        </NCard>
      </NGi>
      <NGi>
        <NCard :bordered="false" title="PR(性能比)">
          <div class="text-28px font-semibold">82%</div>
          <div class="text-12px text-#999">已脱敏显示</div>
        </NCard>
      </NGi>
    </NGrid>

    <NCard :bordered="false" title="发电实时曲线">
      <div ref="chartRef" style="height: 360px; width: 100%"></div>
    </NCard>
  </div>
</template>

<style scoped></style>

