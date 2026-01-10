<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import * as echarts from 'echarts';
import { useDeviceStore } from '@/store/modules/device';
import { useThemeStore } from '@/store/modules/theme';

defineOptions({
  name: 'HomePage'
});

const deviceStore = useDeviceStore();
const themeStore = useThemeStore();
const router = useRouter();

// --- Refs ---
const gaugeChartRef = ref<HTMLDivElement | null>(null);
const trendChartRef = ref<HTMLDivElement | null>(null);
let gaugeChart: echarts.ECharts | null = null;
let trendChart: echarts.ECharts | null = null;
const activeTab = ref<'day' | 'month' | 'year'>('day');
let trendTimer: number | null = null;

const stationInfo = {
  name: '光伏电站概览',
  price: '0.67 元/kW·h',
  capacity: '94 kWp',
  inverterCount: 3,
  voltage: '380 V',
  realtimePower: 6.2 // kW
};

const energyData = {
  day: '210.20 kW·h',
  month: '1193.60 kW·h',
  year: '1193.60 kW·h'
};

const revenueData = {
  day: '126.00 元',
  month: '4914.00 元',
  year: '54054.00 元'
};

const weatherInfo = {
  irradiance: '0.0 W/m²',
  temp: '12.5 °C',
  humidity: '71.7 %',
  windSpeed: '1.4 m/s'
};

function openInvDetail(id: string, status: string) {
  router.push({
    name: 'panel-detail',
    query: { id, status }
  });
}

// --- Charts ---
function initGaugeChart() {
  if (!gaugeChartRef.value) return;

  if (gaugeChart) {
    gaugeChart.dispose();
  }
  gaugeChart = echarts.init(gaugeChartRef.value);

  const isDark = themeStore.darkMode;
  const primaryColor = isDark ? '#0a84ff' : '#007aff'; // Apple Blue
  const trackColor = isDark ? '#3a3a3c' : '#e5e5ea';
  const textColor = isDark ? '#98989d' : '#8e8e93';
  const valueColor = isDark ? '#ffffff' : '#000000';

  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 5,
        radius: '90%',
        itemStyle: {
          color: primaryColor
        },
        progress: {
          show: true,
          roundCap: true,
          width: 12
        },
        pointer: {
          show: false // Cleaner look without pointer, just progress
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 12,
            color: [[1, trackColor]]
          }
        },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        title: { show: false },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, '0%'],
          formatter(value: number) {
            return `{value|${value.toFixed(1)}}\n{unit|kW}`;
          },
          rich: {
            value: {
              fontSize: 32,
              fontWeight: '600',
              color: valueColor,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
            },
            unit: {
              fontSize: 14,
              color: textColor,
              padding: [5, 0, 0, 0]
            }
          }
        },
        data: [{ value: stationInfo.realtimePower }]
      }
    ]
  };
  gaugeChart.setOption(option);
}

function getTrendData() {
  const type = activeTab.value;
  let xAxisData: string[] = [];
  let seriesData: number[] = [];

  if (type === 'day') {
    xAxisData = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
    seriesData = [12, 15, 22, 28, 32, 35, 36, 35, 34, 38, 45, 52, 58, 62, 60, 55, 50, 48, 52, 60, 68, 75, 78, 80];
  } else if (type === 'month') {
    xAxisData = Array.from({ length: 30 }, (_, i) => `${i + 1}日`);
    seriesData = [
      120, 132, 145, 150, 148, 155, 165, 170, 180, 175, 160, 155, 165, 180, 200, 210, 220, 215, 200, 190, 205, 225, 240,
      255, 250, 260, 275, 290, 300, 310
    ];
  } else {
    xAxisData = Array.from({ length: 12 }, (_, i) => `${i + 1}月`);
    seriesData = [3200, 3400, 3600, 4100, 4500, 4800, 5100, 4900, 4700, 5300, 5600, 5900];
  }

  return { xAxisData, seriesData };
}

function initTrendChart() {
  if (!trendChartRef.value) return;
  if (trendChart) {
    trendChart.dispose();
  }
  trendChart = echarts.init(trendChartRef.value);

  const { xAxisData, seriesData } = getTrendData();
  const isDark = themeStore.darkMode;

  const primaryColor = isDark ? '#0a84ff' : '#007aff';
  const tooltipBg = isDark ? 'rgba(28, 28, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)';
  const tooltipText = isDark ? '#ffffff' : '#000000';
  const axisColor = isDark ? '#98989d' : '#8e8e93';
  const splitLineColor = isDark ? '#3a3a3c' : '#e5e5ea';
  const areaGradientStart = isDark ? 'rgba(10, 132, 255, 0.3)' : 'rgba(0, 122, 255, 0.3)';
  const areaGradientEnd = isDark ? 'rgba(10, 132, 255, 0.0)' : 'rgba(0, 122, 255, 0.0)';

  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: tooltipBg,
      borderColor: 'transparent',
      textStyle: { color: tooltipText },
      padding: [10, 15],
      borderRadius: 12,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowBlur: 10
    },
    grid: {
      top: '10%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
      axisLabel: { color: axisColor },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: activeTab.value === 'day' ? 'kW' : 'kW·h',
      nameTextStyle: { color: axisColor },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: splitLineColor
        }
      },
      axisLabel: { color: axisColor }
    },
    series: [
      {
        name: activeTab.value === 'day' ? '功率' : '发电量',
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: areaGradientStart },
            { offset: 1, color: areaGradientEnd }
          ])
        },
        itemStyle: {
          color: primaryColor
        },
        lineStyle: {
          width: 3
        },
        data: seriesData
      }
    ]
  };
  trendChart.setOption(option);
}

function updateTrendChart(tab: 'day' | 'month' | 'year') {
  activeTab.value = tab;
  if (!trendChart) return;
  initTrendChart();

  if (trendTimer) {
    clearInterval(trendTimer);
    trendTimer = null;
  }
  if (tab === 'day') {
    trendTimer = window.setInterval(() => {
      const { xAxisData: xa, seriesData: sd } = getTrendData();
      trendChart?.setOption({
        xAxis: { data: xa },
        series: [{ data: sd }]
      });
    }, 60000);
  }
}

watch(
  () => themeStore.darkMode,
  () => {
    initGaugeChart();
    initTrendChart();
  }
);

onMounted(() => {
  initGaugeChart();
  initTrendChart();
  updateTrendChart(activeTab.value);

  window.addEventListener('resize', () => {
    gaugeChart?.resize();
    trendChart?.resize();
  });
});

onBeforeUnmount(() => {
  gaugeChart?.dispose();
  trendChart?.dispose();
  if (trendTimer) {
    clearInterval(trendTimer);
    trendTimer = null;
  }
});
</script>

<template>
  <div class="flex flex-col gap-4 p-4 dark:text-white">
    <!-- Row 1: Station Info, Energy/Revenue, Video -->
    <NGrid :x-gap="16" :y-gap="16" cols="1 l:4" responsive="screen" item-responsive>
      <!-- Station Info (25%) -->
      <NGi span="1">
        <div class="bento-card h-full flex flex-col justify-between">
          <div class="mb-4 flex items-center justify-between">
            <span class="text-lg font-semibold">{{ stationInfo.name }}</span>
            <div
              class="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs text-green-600 font-medium dark:bg-green-900/30 dark:text-green-400"
            >
              <div class="i-carbon-checkmark-filled"></div>
              运行中
            </div>
          </div>

          <!-- Gauge Chart -->
          <div ref="gaugeChartRef" class="h-40 w-full"></div>

          <!-- Attributes -->
          <div class="mt-4 space-y-3">
            <div class="flex items-center justify-between text-sm">
              <span class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <div class="i-carbon-currency"></div>
                补贴电价
              </span>
              <span class="font-medium font-mono">{{ stationInfo.price }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <div class="i-carbon-flash"></div>
                装机容量
              </span>
              <span class="font-medium font-mono">{{ stationInfo.capacity }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <div class="i-carbon-server"></div>
                逆变器数
              </span>
              <span class="font-medium font-mono">{{ stationInfo.inverterCount }} 个</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <div class="i-carbon-connection-two-way"></div>
                并网电压
              </span>
              <span class="font-medium font-mono">{{ stationInfo.voltage }}</span>
            </div>
          </div>
        </div>
      </NGi>

      <!-- Energy & Revenue (50%) -->
      <NGi span="2">
        <div class="bento-card h-full flex flex-col gap-6">
          <!-- Energy Section -->
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2 text-blue-500 dark:text-blue-400">
              <div class="i-carbon-sun text-xl"></div>
              <span class="text-base font-semibold">发电量信息</span>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div class="flex flex-col gap-1 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
                <div class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <div class="i-carbon-chart-line"></div>
                  日发电量
                </div>
                <div class="text-xl text-gray-900 font-semibold font-mono dark:text-white">{{ energyData.day }}</div>
              </div>
              <div class="flex flex-col gap-1 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
                <div class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <div class="i-carbon-calendar"></div>
                  月发电量
                </div>
                <div class="text-xl text-gray-900 font-semibold font-mono dark:text-white">{{ energyData.month }}</div>
              </div>
              <div class="flex flex-col gap-1 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
                <div class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <div class="i-carbon-time"></div>
                  年发电量
                </div>
                <div class="text-xl text-gray-900 font-semibold font-mono dark:text-white">{{ energyData.year }}</div>
              </div>
            </div>
          </div>

          <div class="h-px bg-gray-100 dark:bg-gray-800"></div>

          <!-- Trend Chart Section -->
          <div class="flex flex-col flex-1 gap-3">
            <div class="bento-card h-full flex flex-col">
              <div class="mb-4 flex items-center justify-between">
                <div class="flex items-center gap-2 text-lg text-gray-900 font-bold dark:text-white">
                  <div class="i-carbon-chart-line-data text-blue-500"></div>
                  功率及发电量趋势
                </div>
                <div class="flex gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
                  <button
                    class="rounded-md px-3 py-1 text-xs font-medium transition-all"
                    :class="
                      activeTab === 'day'
                        ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                    "
                    @click="updateTrendChart('day')"
                  >
                    日
                  </button>
                  <button
                    class="rounded-md px-3 py-1 text-xs font-medium transition-all"
                    :class="
                      activeTab === 'month'
                        ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                    "
                    @click="updateTrendChart('month')"
                  >
                    月
                  </button>
                  <button
                    class="rounded-md px-3 py-1 text-xs font-medium transition-all"
                    :class="
                      activeTab === 'year'
                        ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                    "
                    @click="updateTrendChart('year')"
                  >
                    年
                  </button>
                </div>
              </div>
              <div ref="trendChartRef" class="min-h-[300px] w-full flex-1"></div>
            </div>
          </div>
        </div>
      </NGi>

      <!-- Video (25%) -->
      <NGi span="1">
        <div class="bento-card h-full flex flex-col overflow-hidden p-0">
          <div
            class="flex items-center gap-2 border-b border-gray-100 py-2 text-purple-500 dark:border-gray-800 dark:text-purple-400"
          >
            <span class="font-semibold">实时监控</span>
          </div>
          <div class="group relative flex-1 cursor-pointer rounded-xl bg-black">
            <div class="absolute inset-0 flex items-center justify-center">
              <div
                class="i-carbon-play-filled text-4xl text-white/50 transition-all group-hover:scale-110 group-hover:text-white/80"
              ></div>
            </div>
            <div class="absolute bottom-3 left-3 rounded bg-black/50 px-2 py-1 text-xs text-white/80 font-mono">
              CAM-01 [LIVE]
            </div>
            <div class="absolute right-3 top-3 flex items-center gap-2 rounded-full bg-black/50 px-2 py-1">
              <span class="h-2 w-2 animate-pulse rounded-full bg-red-500"></span>
              <span class="text-xs text-red-400 font-bold tracking-widest">REC</span>
            </div>
          </div>
        </div>
      </NGi>
    </NGrid>

    <!-- Row 2: Weather & Trend -->
    <NGrid :x-gap="16" :y-gap="16" cols="1 l:4" responsive="screen" item-responsive>
      <!-- Weather (25%) -->
      <NGi span="1">
        <div class="bento-card h-full flex flex-col justify-around">
          <div class="mb-2 flex items-center gap-2 text-blue-500 font-semibold dark:text-blue-400">
            <div class="i-carbon-cloud-satellite"></div>
            气象数据
          </div>

          <div class="flex items-center justify-between border-b border-gray-100 py-3 dark:border-gray-800">
            <div class="flex items-center gap-4">
              <div class="i-carbon-sun text-3xl text-orange-500"></div>
              <div class="flex flex-col">
                <span class="text-xs text-gray-500 dark:text-gray-400">辐照度</span>
                <span class="text-lg font-medium font-mono">{{ weatherInfo.irradiance }}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between border-b border-gray-100 py-3 dark:border-gray-800">
            <div class="flex items-center gap-4">
              <div class="i-carbon-temperature text-3xl text-blue-400"></div>
              <div class="flex flex-col">
                <span class="text-xs text-gray-500 dark:text-gray-400">环境温湿度</span>
                <span class="text-lg font-medium font-mono">{{ weatherInfo.temp }} / {{ weatherInfo.humidity }}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between py-3">
            <div class="flex items-center gap-4">
              <div class="i-carbon-windy text-3xl text-green-500"></div>
              <div class="flex flex-col">
                <span class="text-xs text-gray-500 dark:text-gray-400">风速</span>
                <span class="text-lg font-medium font-mono">{{ weatherInfo.windSpeed }}</span>
              </div>
            </div>
          </div>
        </div>
      </NGi>

      <!-- Revenue Section (75%) -->
      <NGi span="3">
        <div class="bento-card h-full flex flex-col justify-center">
          <!-- Revenue Section -->
          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between text-orange-500 dark:text-orange-400">
              <div class="flex items-center gap-2">
                <div class="i-carbon-currency-yen text-xl"></div>
                <span class="text-base font-semibold">收益信息</span>
              </div>
              <span class="text-xs text-gray-400 font-normal">截止: 2025-01-01</span>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div class="flex flex-col gap-1 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
                <div class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <div class="i-carbon-chart-bar"></div>
                  日收益
                </div>
                <div class="text-xl text-gray-900 font-semibold font-mono dark:text-white">{{ revenueData.day }}</div>
              </div>
              <div class="flex flex-col gap-1 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
                <div class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <div class="i-carbon-calendar-heat-map"></div>
                  月收益
                </div>
                <div class="text-xl text-gray-900 font-semibold font-mono dark:text-white">{{ revenueData.month }}</div>
              </div>
              <div class="flex flex-col gap-1 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
                <div class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <div class="i-carbon-money"></div>
                  年收益
                </div>
                <div class="text-xl text-gray-900 font-semibold font-mono dark:text-white">{{ revenueData.year }}</div>
              </div>
            </div>
          </div>
        </div>
      </NGi>
    </NGrid>

    <!-- Row 3: Device List -->
    <div class="bento-card">
      <div class="mb-6 flex items-center justify-between">
        <div class="flex items-center gap-2 text-lg text-gray-900 font-bold dark:text-white">
          <div class="i-carbon-iot-connect text-blue-500"></div>
          设备状态监控
        </div>
        <div class="flex gap-4">
          <div v-for="inv in deviceStore.devices" :key="inv.id" class="flex items-center gap-2 text-sm">
            <span class="text-gray-700 font-medium dark:text-gray-300">{{ inv.name }}</span>
            <span
              class="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-500 dark:bg-green-900/20"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>
              在线
            </span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div
          v-for="inv in deviceStore.devices"
          :key="inv.id"
          class="group cursor-pointer rounded-xl bg-gray-50 p-4 transition-all dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800"
          @click="openInvDetail(inv.id, 'normal')"
        >
          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <span class="text-gray-900 font-bold dark:text-white">{{ inv.name }}</span>
              <span
                class="rounded bg-green-100 px-2 py-1 text-xs text-green-600 font-medium dark:bg-green-900/30 dark:text-green-400"
              >
                运行正常
              </span>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500 dark:text-gray-400">当前功率</span>
                <span class="text-gray-900 font-medium font-mono dark:text-white">
                  {{ (Math.random() * 5 + 2).toFixed(2) }} kW
                </span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500 dark:text-gray-400">日发电量</span>
                <span class="text-gray-900 font-medium font-mono dark:text-white">
                  {{ (Math.random() * 30 + 10).toFixed(1) }} kWh
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bento-card {
  @apply bg-white dark:bg-[#1c1c1e] rounded-[24px] p-6 shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-lg relative;
}
</style>
