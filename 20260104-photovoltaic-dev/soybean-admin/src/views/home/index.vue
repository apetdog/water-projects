<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { useNow, useDateFormat } from '@vueuse/core';
import { useAppStore } from '@/store/modules/app';
import { useThemeStore } from '@/store/modules/theme';
import * as echarts from 'echarts';

const appStore = useAppStore();
const themeStore = useThemeStore();
const { now } = useNow();
const currentDate = useDateFormat(now, 'YYYY-MM-DD HH:mm:ss');

const mainChartRef = ref<HTMLDivElement | null>(null);
const barChartRef = ref<HTMLDivElement | null>(null);
const pieChartRef = ref<HTMLDivElement | null>(null);
const gaugeChartRef = ref<HTMLDivElement | null>(null);

let mainChart: echarts.ECharts | null = null;
let barChart: echarts.ECharts | null = null;
let pieChart: echarts.ECharts | null = null;
let gaugeChart: echarts.ECharts | null = null;

let originalFooterVisible = themeStore.footer.visible;
let resizeHandler: (() => void) | null = null;

// Mock Data for Inverters
const inverters = ref(Array.from({ length: 12 }).map((_, i) => ({
  id: `INV-${String(i + 1).padStart(2, '0')}`,
  status: Math.random() > 0.8 ? (Math.random() > 0.5 ? 'error' : 'offline') : 'online',
  power: (Math.random() * 50 + 10).toFixed(1)
})));

// Mock Data for Weather
const weatherData = ref({
  temp: 26,
  humidity: 45,
  irradiation: 850,
  windSpeed: 3.2,
  weather: '晴'
});

const timeScope = ref('day');

function updateMainChart() {
  if (!mainChart) return;
  
  let xAxisData: string[] = [];
  let seriesData: number[] = [];
  let title = '';
  let yAxisName = 'kW';
  
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (timeScope.value === 'day') {
    title = `${year}年${String(month).padStart(2, '0')}月${String(day).padStart(2, '0')}日 功率曲线`;
    yAxisName = 'kW';
    xAxisData = Array.from({ length: 24 }).map((_, i) => `${String(i).padStart(2, '0')}:00`);
    
    const currentHour = date.getHours();
    seriesData = Array.from({ length: 24 }).map((_, i) => {
      if (i > currentHour) return null;
      const hour = i;
      if (hour < 6 || hour > 19) return 0;
      const peak = 1200 + Math.random() * 200;
      return Math.round(Math.max(0, peak * (1 - Math.pow((hour - 12.5) / 6.5, 2))));
    }) as number[];
  } else if (timeScope.value === 'month') {
    title = `${year}年${String(month).padStart(2, '0')}月 发电量趋势`;
    yAxisName = 'kWh';
    const daysInMonth = new Date(year, month, 0).getDate();
    xAxisData = Array.from({ length: daysInMonth }).map((_, i) => `${i + 1}日`);
    
    seriesData = Array.from({ length: daysInMonth }).map((_, i) => {
      if (i + 1 > day) return null;
      return 5000 + Math.round(Math.random() * 2000);
    }) as number[];
  } else {
    title = `${year}年 发电量趋势`;
    yAxisName = 'kWh';
    xAxisData = Array.from({ length: 12 }).map((_, i) => `${i + 1}月`);
    
    seriesData = Array.from({ length: 12 }).map((_, i) => {
      if (i + 1 > month) return null;
      return 150000 + Math.round(Math.random() * 50000);
    }) as number[];
  }

    mainChart.setOption({
      title: { text: title, left: 'center', textStyle: { color: '#ccc', fontSize: 14 } },
      grid: { left: 50, right: 20, top: 40, bottom: 30 },
      tooltip: { trigger: 'axis' },
      xAxis: { 
        type: 'category', 
        data: xAxisData,
        axisLabel: { color: '#aaa' }
      },
      yAxis: { 
        type: 'value',
        name: yAxisName,
        axisLabel: { color: '#aaa' },
        nameTextStyle: { color: '#aaa' },
        splitLine: { lineStyle: { color: '#333' } }
      },
      series: [{ 
        type: timeScope.value === 'day' ? 'line' : 'bar',
        smooth: true,
        showSymbol: false,
        areaStyle: timeScope.value === 'day' ? { opacity: 0.3 } : undefined,
        itemStyle: { color: '#409EFF' },
        data: seriesData 
      }]
    }, true);
}

watch(timeScope, () => {
  updateMainChart();
});

const handleExport = () => {
  if (!mainChart) return;
  
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  let dateStr = '';
  if (timeScope.value === 'day') dateStr = `${year}${month}${day}`;
  else if (timeScope.value === 'month') dateStr = `${year}${month}`;
  else dateStr = `${year}`;

  const url = mainChart.getDataURL({
    type: 'png',
    pixelRatio: 2,
    backgroundColor: '#100c2a' // Dark background for chart export
  });
  
  const link = document.createElement('a');
  link.download = `功率及发电量趋势-${dateStr}.png`;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function initCharts() {
  if (mainChartRef.value) {
    mainChart = echarts.init(mainChartRef.value);
    // Initial setup handled by updateMainChart
    updateMainChart();
  }

  if (barChartRef.value) {
    barChart = echarts.init(barChartRef.value);
    barChart.setOption({
      title: { text: '近12个月收益趋势', left: 'center', textStyle: { color: '#ccc', fontSize: 14 } },
      grid: { left: 50, right: 20, top: 40, bottom: 30 },
      tooltip: { trigger: 'axis' },
      xAxis: { 
        type: 'category', 
        data: Array.from({ length: 12 }).map((_, i) => `${i + 1}月`),
        axisLabel: { color: '#aaa' }
      },
      yAxis: { 
        type: 'value', 
        name: '万元',
        axisLabel: { color: '#aaa' },
        nameTextStyle: { color: '#aaa' },
        splitLine: { lineStyle: { color: '#333' } }
      },
      series: [
        {
          type: 'bar',
          itemStyle: { color: '#67C23A' },
          data: Array.from({ length: 12 }).map(() => 12 + Math.random() * 5)
        }
      ]
    });
  }

  if (pieChartRef.value) {
    pieChart = echarts.init(pieChartRef.value);
    pieChart.setOption({
      title: { text: '设备状态分布', left: 'center', textStyle: { color: '#ccc', fontSize: 14 } },
      tooltip: { trigger: 'item' },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          label: { show: false },
          data: [
            { value: 48, name: '正常', itemStyle: { color: '#67C23A' } },
            { value: 8, name: '预警', itemStyle: { color: '#E6A23C' } },
            { value: 4, name: '故障', itemStyle: { color: '#F56C6C' } }
          ]
        }
      ]
    });
  }

  if (gaugeChartRef.value) {
    gaugeChart = echarts.init(gaugeChartRef.value);
    gaugeChart.setOption({
      series: [
        {
          type: 'gauge',
          min: 0,
          max: 100,
          detail: { valueAnimation: true, formatter: '{value}%', color: '#fff', fontSize: 16 },
          axisLine: { lineStyle: { width: 10 } },
          progress: { show: true, width: 10 },
          data: [{ value: 82, name: 'PR' }],
          title: { show: true, color: '#ccc', fontSize: 12, offsetCenter: [0, '80%'] }
        }
      ]
    });
  }

  resizeHandler = () => {
    mainChart?.resize();
    barChart?.resize();
    pieChart?.resize();
    gaugeChart?.resize();
  };
  window.addEventListener('resize', resizeHandler);
}

onMounted(() => {
  if (!appStore.fullContent) appStore.toggleFullContent();
  appStore.setSiderCollapse(true);
  originalFooterVisible = themeStore.footer.visible;
  themeStore.footer.visible = false;
  
  // Delay chart initialization slightly to ensure DOM is ready
  setTimeout(initCharts, 100);
});

onBeforeUnmount(() => {
  if (appStore.fullContent) appStore.toggleFullContent();
  appStore.setSiderCollapse(false);
  themeStore.footer.visible = originalFooterVisible;
  mainChart?.dispose();
  barChart?.dispose();
  pieChart?.dispose();
  gaugeChart?.dispose();
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
  }
});
</script>

<template>
  <div class="h-full">
    <div class="big-screen-wrapper">
      <div class="header-section">
      <h1 class="page-title">智慧光伏电站监控大屏</h1>
      <div class="header-info">
        <span>{{ currentDate }}</span>
        <span class="ml-4">天气: {{ weatherData.weather }}</span>
      </div>
    </div>

    <div class="main-layout">
      <!-- Left Column -->
      <div class="col-left">
        <!-- Station Info -->
        <NCard :bordered="false" title="电站概况" class="glass-card mb-4">
          <div class="info-item">
            <span class="label">电站名称:</span>
            <span class="value">华东一号光伏电站</span>
          </div>
          <div class="info-item">
            <span class="label">装机容量:</span>
            <span class="value">50 MW</span>
          </div>
          <div class="info-item">
            <span class="label">投运时间:</span>
            <span class="value">2023-01-15</span>
          </div>
          <div class="info-item">
            <span class="label">地理位置:</span>
            <span class="value">江苏省苏州市工业园区</span>
          </div>
        </NCard>

        <!-- Weather -->
        <NCard :bordered="false" title="气象环境" class="glass-card mb-4">
          <NGrid :cols="2" :y-gap="12">
            <NGi>
              <div class="weather-item">
                <div class="label">温度</div>
                <div class="value">{{ weatherData.temp }}°C</div>
              </div>
            </NGi>
            <NGi>
              <div class="weather-item">
                <div class="label">湿度</div>
                <div class="value">{{ weatherData.humidity }}%</div>
              </div>
            </NGi>
            <NGi>
              <div class="weather-item">
                <div class="label">辐照度</div>
                <div class="value">{{ weatherData.irradiation }} W/m²</div>
              </div>
            </NGi>
            <NGi>
              <div class="weather-item">
                <div class="label">风速</div>
                <div class="value">{{ weatherData.windSpeed }} m/s</div>
              </div>
            </NGi>
          </NGrid>
        </NCard>

        <!-- Video Monitor -->
        <NCard :bordered="false" title="实时监控" class="glass-card flex-1">
          <div class="video-placeholder">
            <div class="live-badge">LIVE</div>
            <div class="camera-icon">📷 摄像头01</div>
          </div>
        </NCard>
      </div>

      <!-- Center Column -->
      <div class="col-center">
        <!-- KPI Cards -->
        <div class="kpi-row mb-4">
          <NCard :bordered="false" class="kpi-card glass-card">
            <div class="kpi-label">当前功率</div>
            <div class="kpi-num">1.32 <span class="unit">MW</span></div>
          </NCard>
          <NCard :bordered="false" class="kpi-card glass-card">
            <div class="kpi-label">今日发电</div>
            <div class="kpi-num">6.05 <span class="unit">MWh</span></div>
          </NCard>
          <NCard :bordered="false" class="kpi-card glass-card">
            <div class="kpi-label">今日收益</div>
            <div class="kpi-num text-orange">3.2 <span class="unit">万元</span></div>
          </NCard>
          <NCard :bordered="false" class="kpi-card glass-card">
            <div class="kpi-label">累计收益</div>
            <div class="kpi-num text-green">450 <span class="unit">万元</span></div>
          </NCard>
        </div>

        <!-- Main Chart -->
        <NCard :bordered="false" class="glass-card mb-4 flex-1">
          <template #header>
            <div class="flex items-center justify-between">
              <span>功率及发电量趋势</span>
              <div class="flex items-center gap-2">
                <NRadioGroup v-model:value="timeScope" size="small">
                  <NRadioButton value="day">日</NRadioButton>
                  <NRadioButton value="month">月</NRadioButton>
                  <NRadioButton value="year">年</NRadioButton>
                </NRadioGroup>
                <NButton size="small" type="primary" ghost @click="handleExport">导出</NButton>
              </div>
            </div>
          </template>
          <div ref="mainChartRef" class="chart h-300px"></div>
        </NCard>

        <!-- Bottom Charts -->
        <div class="bottom-row">
          <NCard :bordered="false" class="glass-card flex-1 mr-4">
            <div ref="barChartRef" class="chart h-200px"></div>
          </NCard>
          <NCard :bordered="false" class="glass-card w-200px">
            <div ref="gaugeChartRef" class="chart h-200px"></div>
          </NCard>
        </div>
      </div>

      <!-- Right Column -->
      <div class="col-right">
        <!-- Inverter Status -->
        <NCard :bordered="false" title="逆变器状态" class="glass-card mb-4">
          <div class="inverter-grid">
            <div 
              v-for="inv in inverters" 
              :key="inv.id" 
              class="inverter-item"
              :class="inv.status"
            >
              <div class="inv-id">{{ inv.id }}</div>
              <div class="inv-power">{{ inv.status === 'online' ? inv.power + 'kW' : inv.status === 'error' ? '故障' : '离线' }}</div>
            </div>
          </div>
        </NCard>

        <!-- Status Pie -->
        <NCard :bordered="false" class="glass-card mb-4">
           <div ref="pieChartRef" class="chart h-150px"></div>
        </NCard>

        <!-- Alarms -->
        <NCard :bordered="false" title="实时告警" class="glass-card flex-1">
          <div class="alarm-list">
             <div class="alarm-item warning">
               <span class="time">10:12</span>
               <span class="msg">逆变器-03 输出功率波动</span>
             </div>
             <div class="alarm-item error">
               <span class="time">09:57</span>
               <span class="msg">汇流箱-12 支路电流异常</span>
             </div>
             <div class="alarm-item warning">
               <span class="time">08:31</span>
               <span class="msg">组件P-088 温度偏高</span>
             </div>
          </div>
        </NCard>

         <NCard :bordered="false" class="glass-card mt-4">
          <div class="text-center text-gray-400 text-sm mb-2">快捷入口</div>
          <NSpace justify="center">
            <NButton size="small" type="primary" ghost @click="$router.push({ name: 'pv-realtime' })">实时数据</NButton>
            <NButton size="small" type="info" ghost @click="$router.push({ name: 'pv-system' })">系统模型</NButton>
          </NSpace>
        </NCard>
      </div>
    </div>
  </div>
  <div class="big-screen-bg"></div>
</div>
</template>

<style scoped>
.big-screen-wrapper {
  position: relative;
  height: 100vh;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  color: #fff;
  overflow: hidden;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 20px;
  background: rgba(13, 28, 45, 0.6);
  border-radius: 8px;
  height: 60px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.page-title {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(to right, #409EFF, #00f2fe);
  -webkit-background-clip: text;
  color: transparent;
}

.header-info {
  font-size: 14px;
  color: #aaa;
}

.main-layout {
  flex: 1;
  display: grid;
  grid-template-columns: 300px 1fr 300px;
  gap: 16px;
  overflow: hidden;
}

.col-left, .col-center, .col-right {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.glass-card {
  background: rgba(19, 34, 55, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 8px;
}

:deep(.n-card-header__main) {
  color: #eee;
  font-size: 16px;
}

:deep(.n-card__content) {
  padding: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 13px;
}
.info-item .label { color: #999; }
.info-item .value { color: #fff; font-weight: 500; }

.weather-item {
  text-align: center;
  background: rgba(255,255,255,0.05);
  padding: 8px;
  border-radius: 4px;
}
.weather-item .label { font-size: 12px; color: #999; }
.weather-item .value { font-size: 14px; color: #409EFF; font-weight: bold; }

.video-placeholder {
  width: 100%;
  height: 100%;
  min-height: 150px;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 4px;
}
.live-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: red;
  color: white;
  padding: 2px 6px;
  font-size: 10px;
  border-radius: 2px;
}
.camera-icon { color: #666; }

.kpi-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.kpi-card { text-align: center; padding: 10px 0; }
.kpi-label { color: #999; font-size: 12px; margin-bottom: 4px; }
.kpi-num { font-size: 20px; font-weight: bold; color: #fff; }
.kpi-num.text-orange { color: #E6A23C; }
.kpi-num.text-green { color: #67C23A; }
.unit { font-size: 12px; font-weight: normal; color: #999; }

.bottom-row {
  display: flex;
  height: 250px;
}

.inverter-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.inverter-item {
  background: rgba(255,255,255,0.05);
  padding: 8px;
  border-radius: 4px;
  text-align: center;
  border: 1px solid transparent;
}
.inverter-item.online { border-color: #67C23A; color: #67C23A; }
.inverter-item.error { border-color: #F56C6C; color: #F56C6C; background: rgba(245, 108, 108, 0.1); }
.inverter-item.offline { border-color: #909399; color: #909399; }
.inv-id { font-size: 12px; margin-bottom: 2px; }
.inv-power { font-size: 12px; font-weight: bold; }

.alarm-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.alarm-item {
  display: flex;
  justify-content: space-between;
  padding: 6px;
  background: rgba(255,255,255,0.05);
  border-radius: 4px;
  font-size: 12px;
}
.alarm-item.warning { border-left: 3px solid #E6A23C; }
.alarm-item.error { border-left: 3px solid #F56C6C; }
.alarm-item .time { color: #999; }
.alarm-item .msg { color: #eee; }

.big-screen-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: radial-gradient(circle at center, #1a2a3a 0%, #0b0f1a 100%);
}
</style>
