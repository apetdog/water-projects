<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import * as echarts from 'echarts';

defineOptions({
  name: 'PvPanelDetail'
});

const route = useRoute();
const panelId = String(route.params.id || '');
const status = computed(() => String(route.query.status || 'normal'));
const statusType = computed<'success' | 'warning' | 'error'>(() => {
  if (status.value === 'error') return 'error';
  if (status.value === 'warning') return 'warning';
  return 'success';
});

const vChartRef = ref<HTMLDivElement | null>(null);
const iChartRef = ref<HTMLDivElement | null>(null);
const tChartRef = ref<HTMLDivElement | null>(null);

let vChart: echarts.ECharts | null = null;
let iChart: echarts.ECharts | null = null;
let tChart: echarts.ECharts | null = null;

function genTimes(n = 24) {
  return Array.from({ length: n }).map((_, i) => `${String(i).padStart(2, '0')}:00`);
}

function initCharts() {
  if (vChartRef.value) {
    vChart = echarts.init(vChartRef.value);
    vChart.setOption({
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: genTimes() },
      yAxis: { type: 'value', name: 'V' },
      series: [{ type: 'line', data: Array.from({ length: 24 }).map(() => 34 + Math.random() * 2), smooth: true }]
    });
  }
  if (iChartRef.value) {
    iChart = echarts.init(iChartRef.value);
    iChart.setOption({
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: genTimes() },
      yAxis: { type: 'value', name: 'A' },
      series: [{ type: 'line', data: Array.from({ length: 24 }).map(() => 8 + Math.random() * 1.5), smooth: true }]
    });
  }
  if (tChartRef.value) {
    tChart = echarts.init(tChartRef.value);
    tChart.setOption({
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: genTimes() },
      yAxis: { type: 'value', name: '℃' },
      series: [{ type: 'line', data: Array.from({ length: 24 }).map(() => 45 + Math.random() * 5), smooth: true }]
    });
  }
}

onMounted(() => {
  initCharts();
});

onBeforeUnmount(() => {
  vChart?.dispose();
  iChart?.dispose();
  tChart?.dispose();
});
</script>

<template>
  <div class="flex-col-stretch gap-16px">
    <NCard :bordered="false" :title="`单板数据分析 - ${panelId}`">
      <div class="mb-8px">
        <NTag :type="statusType" size="small">{{ status === 'normal' ? '正常' : status === 'warning' ? '预警' : '故障' }}</NTag>
      </div>
      <div class="text-12px text-#666">已脱敏显示：仅展示匿名编号与统计指标</div>
      <NGrid :x-gap="16" :y-gap="16" cols="1 s:1 m:3">
        <NGi>
          <NCard :bordered="false" title="电压趋势">
            <div ref="vChartRef" style="height: 240px; width: 100%"></div>
          </NCard>
        </NGi>
        <NGi>
          <NCard :bordered="false" title="电流趋势">
            <div ref="iChartRef" style="height: 240px; width: 100%"></div>
          </NCard>
        </NGi>
        <NGi>
          <NCard :bordered="false" title="温度趋势">
            <div ref="tChartRef" style="height: 240px; width: 100%"></div>
          </NCard>
        </NGi>
      </NGrid>
      <div class="mt-12px">
        <NAlert v-if="status !== 'normal'" type="warning" title="异常提示">
          检测到该面板存在性能异常，建议检查连接、遮挡与积灰情况。
        </NAlert>
        <NAlert v-else type="success" title="运行正常">
          该面板运行状态正常，各项指标在合理范围。
        </NAlert>
      </div>
    </NCard>
  </div>
</template>

<style scoped></style>
