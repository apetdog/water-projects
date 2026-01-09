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
  day: '140.83 元',
  month: '799.71 元',
  year: '799.71 元'
};

const weatherInfo = {
  irradiance: '0.0 W/m²',
  temp: '31.9 °C',
  humidity: '71.7 %',
  windSpeed: '1.4 m/s'
};

function statusText(s: string) {
  if (s === 'serious') return '严重';
  if (s === 'accident') return '事故';
  return '运行正常';
}

function statusClass(s: string) {
  if (s === 'serious') return 'text-amber-400';
  if (s === 'accident') return 'text-red-400';
  return 'text-neon-green';
}

function openInvDetail(id: string, status: string) {
  router.push({
    name: 'panel-detail',
    query: { id, status }
  });
}

// --- Charts ---
function initGaugeChart() {
  if (!gaugeChartRef.value) return;
  
  // Dispose existing instance to avoid theme conflicts or just setOption?
  // echarts.init takes theme as second arg, but here we handle colors manually.
  if (gaugeChart) {
    gaugeChart.dispose();
  }
  gaugeChart = echarts.init(gaugeChartRef.value);
  
  const isDark = themeStore.darkMode;
  const primaryColor = isDark ? '#00f2f1' : '#0284c7';
  const shadowColor = isDark ? 'rgba(0,242,241,0.8)' : 'rgba(2,132,199,0.5)';
  const trackColor = isDark ? '#1e293b' : '#e2e8f0';
  const tickColor = isDark ? '#475569' : '#94a3b8';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const valueColor = isDark ? '#00f2f1' : '#0284c7';

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
          color: primaryColor,
          shadowColor,
          shadowBlur: 15
        },
        progress: {
          show: true,
          roundCap: true,
          width: 12
        },
        pointer: {
          icon: 'path://M2.9,22.9C5.3,25.2,8.6,26.5,12,26.5c3.4,0,6.7-1.3,9.1-3.6l10.6-26.6l-29.7,26.6z',
          length: '75%',
          width: 12,
          offsetCenter: [0, '5%'],
          itemStyle: {
            color: primaryColor
          }
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 12,
            color: [[1, trackColor]]
          }
        },
        axisTick: {
          splitNumber: 2,
          lineStyle: {
            width: 2,
            color: tickColor
          }
        },
        splitLine: {
          length: 12,
          lineStyle: {
            width: 3,
            color: tickColor
          }
        },
        axisLabel: {
          distance: 20,
          color: textColor,
          fontSize: 10
        },
        title: { show: false },
        detail: {
          backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.9)',
          borderColor: primaryColor,
          borderWidth: 1,
          width: '70%',
          lineHeight: 24,
          height: 24,
          borderRadius: 12,
          offsetCenter: [0, '40%'],
          valueAnimation: true,
          formatter(value: number) {
            return `{value|${value.toFixed(1)}}{unit|kW}`;
          },
          rich: {
            value: {
              fontSize: 18,
              fontWeight: 'bolder',
              color: valueColor,
              fontFamily: 'monospace'
            },
            unit: {
              fontSize: 12,
              color: textColor,
              padding: [0, 0, 0, 4]
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

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();
  const currentHour = now.getHours();
  const sunrise = 6;
  const sunset = 19;

  if (type === 'day') {
    xAxisData = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
    seriesData = xAxisData.map((_, i) => {
      if (i > currentHour) return 0;
      if (i < sunrise || i >= sunset) return 0;
      const x = (i - 12.5) / 5;
      return Math.max(0, 45 * Math.exp(-x * x) + Math.random() * 5);
    });
  } else if (type === 'month') {
    xAxisData = Array.from({ length: 30 }, (_, i) => `${i + 1}日`);
    seriesData = xAxisData.map((_, i) => {
      if (i + 1 > currentDay) return 0;
      return Math.random() * 200 + 100;
    });
  } else {
    xAxisData = Array.from({ length: 12 }, (_, i) => `${i + 1}月`);
    seriesData = xAxisData.map((_, i) => {
      if (i + 1 > currentMonth) return 0;
      return Math.random() * 5000 + 3000;
    });
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
  
  const primaryColor = isDark ? '#00f2f1' : '#0284c7';
  const tooltipBg = isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)';
  const tooltipText = isDark ? '#e2e8f0' : '#1e293b';
  const axisColor = isDark ? '#94a3b8' : '#64748b';
  const splitLineColor = isDark ? '#334155' : '#e2e8f0';
  const areaGradientStart = isDark ? 'rgba(0, 242, 241, 0.4)' : 'rgba(2, 132, 199, 0.4)';
  const areaGradientEnd = isDark ? 'rgba(0, 242, 241, 0.01)' : 'rgba(2, 132, 199, 0.01)';

  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: tooltipBg,
      borderColor: primaryColor,
      textStyle: { color: tooltipText }
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
      boundaryGap: false,
      data: xAxisData,
      axisLabel: { color: axisColor },
      axisLine: { lineStyle: { color: splitLineColor } }
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
          color: primaryColor,
          shadowColor: isDark ? 'rgba(0, 242, 241, 0.5)' : 'rgba(2, 132, 199, 0.5)',
          shadowBlur: 10
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
  // Re-init to update colors if theme changed
  initTrendChart(); 

  // But if we just want to update data, we could use setOption. 
  // initTrendChart already calls setOption with full config.
  
  // Restart timer for day view
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

function downloadChart() {
  if (!trendChart) return;

  let titleText = '';
  if (activeTab.value === 'day') {
    titleText = '2026年1月7日 10:00 功率趋势';
  } else if (activeTab.value === 'month') {
    titleText = '2026年1月 发电量趋势';
  } else {
    titleText = '2026年 发电量趋势';
  }

  trendChart.setOption({
    title: {
      show: true,
      text: titleText,
      left: 'center',
      top: 10,
      textStyle: {
        color: themeStore.darkMode ? '#e2e8f0' : '#1e293b',
        fontSize: 16,
        fontWeight: 'bold'
      }
    }
  });

  const url = trendChart.getDataURL({
    type: 'png',
    backgroundColor: themeStore.darkMode ? '#0f172a' : '#ffffff',
    pixelRatio: 2
  });

  trendChart.setOption({
    title: {
      show: false
    }
  });

  const link = document.createElement('a');
  link.download = `${titleText}.png`;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

watch(() => themeStore.darkMode, () => {
  initGaugeChart();
  initTrendChart();
});

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
  <div class="tech-dashboard relative flex-col-stretch gap-16px p-16px dark:bg-[#0f172a] dark:text-slate-200">
    <!-- Row 1: Station Info, Energy/Revenue, Video -->
    <NGrid :x-gap="16" :y-gap="16" cols="1 l:4" responsive="screen" item-responsive>
      <!-- Station Info (25%) -->
      <NGi span="1">
        <div class="tech-card relative h-full flex flex-col overflow-hidden p-4 dark:bg-transparent dark:shadow-[inset_0_0_15px_rgba(0,120,255,0.15)]">
          <div class="tech-card-bg absolute inset-0 dark:from-[#0e2a47] dark:to-[#091a2c] dark:bg-gradient-to-b"></div>
          <div class="relative z-10 h-full flex flex-col">
            <div class="mb-2 flex-y-center justify-between">
              <span class="text-gradient-gold text-18px font-bold">{{ stationInfo.name }}</span>
              <div
                class="text-neon-green bg-neon-green/10 border-neon-green/30 flex-y-center gap-1 border rd-full px-2 py-0.5 text-12px"
              >
                <div class="i-carbon-checkmark-filled"></div>
                运行中
              </div>
            </div>

            <!-- Gauge Chart -->
            <div ref="gaugeChartRef" class="h-180px w-full"></div>
            <div class="mb-4 text-center text-12px text-cyan-600/70 dark:text-cyan-200/70 -mt-6">实时发电功率</div>

            <!-- Attributes -->
            <div class="mt-auto flex-col gap-10px text-13px">
              <div class="attr-row">
                <span class="label">
                  <div class="i-carbon-currency text-14px"></div>
                  补贴电价
                </span>
                <span class="value">{{ stationInfo.price }}</span>
              </div>
              <div class="attr-row">
                <span class="label">
                  <div class="i-carbon-flash text-14px"></div>
                  装机容量
                </span>
                <span class="value">{{ stationInfo.capacity }}</span>
              </div>
              <div class="attr-row">
                <span class="label">
                  <div class="i-carbon-server text-14px"></div>
                  逆变器数
                </span>
                <span class="value">{{ stationInfo.inverterCount }} 个</span>
              </div>
              <div class="attr-row">
                <span class="label">
                  <div class="i-carbon-connection-two-way text-14px"></div>
                  并网电压
                </span>
                <span class="value">{{ stationInfo.voltage }}</span>
              </div>
            </div>
          </div>
        </div>
      </NGi>

      <!-- Energy & Revenue (50%) -->
      <NGi span="2">
        <div class="tech-card relative h-full overflow-hidden p-4 dark:bg-transparent dark:shadow-[inset_0_0_15px_rgba(0,120,255,0.15)]">
          <div class="tech-card-bg absolute inset-0 dark:from-[#0e2a47] dark:to-[#091a2c] dark:bg-gradient-to-b"></div>
          <div class="relative z-10 h-full flex-col gap-24px">
            <!-- Energy Section -->
            <div class="flex-col gap-12px">
              <div class="text-neon-blue flex-y-center gap-8px">
                <div class="i-carbon-sun animate-pulse-slow text-20px"></div>
                <span class="text-16px font-bold tracking-wider">发电量信息</span>
              </div>
              <div class="grid grid-cols-3 gap-16px">
                <div class="tech-stat-box">
                  <div class="label">
                    <div class="i-carbon-chart-line"></div>
                    日发电量
                  </div>
                  <div class="value text-neon-cyan">{{ energyData.day }}</div>
                </div>
                <div class="tech-stat-box">
                  <div class="label">
                    <div class="i-carbon-calendar"></div>
                    月发电量
                  </div>
                  <div class="value text-neon-cyan">{{ energyData.month }}</div>
                </div>
                <div class="tech-stat-box">
                  <div class="label">
                    <div class="i-carbon-time"></div>
                    年发电量
                  </div>
                  <div class="value text-neon-cyan">{{ energyData.year }}</div>
                </div>
              </div>
            </div>

            <div class="my-4 h-1px from-transparent via-cyan-500/30 to-transparent bg-gradient-to-r"></div>

            <!-- Revenue Section -->
            <div class="flex-col gap-12px">
              <div class="text-neon-gold flex-y-center gap-8px">
                <div class="i-carbon-currency-yen text-20px"></div>
                <span class="text-16px font-bold tracking-wider">收益信息</span>
                <span class="ml-auto text-12px text-gray-500 dark:text-gray-400 font-normal opacity-70">截止: 2025-01-01</span>
              </div>
              <div class="grid grid-cols-3 gap-16px">
                <div class="tech-stat-box">
                  <div class="label">
                    <div class="i-carbon-chart-bar"></div>
                    日收益
                  </div>
                  <div class="value text-neon-gold">{{ revenueData.day }}</div>
                </div>
                <div class="tech-stat-box">
                  <div class="label">
                    <div class="i-carbon-calendar-heat-map"></div>
                    月收益
                  </div>
                  <div class="value text-neon-gold">{{ revenueData.month }}</div>
                </div>
                <div class="tech-stat-box">
                  <div class="label">
                    <div class="i-carbon-money"></div>
                    年收益
                  </div>
                  <div class="value text-neon-gold">{{ revenueData.year }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NGi>

      <!-- Video (25%) -->
      <NGi span="1">
        <div class="tech-card relative h-full flex flex-col overflow-hidden p-4 dark:bg-transparent dark:shadow-[inset_0_0_15px_rgba(0,120,255,0.15)]">
          <div class="tech-card-bg absolute inset-0 dark:from-[#0e2a47] dark:to-[#091a2c] dark:bg-gradient-to-b"></div>
          <div class="text-neon-purple relative z-10 mb-3 flex-y-center gap-2">
            <div class="i-carbon-video text-18px"></div>
            <span class="font-bold">实时监控</span>
          </div>
          <div
            class="group relative w-full flex-center flex-1 overflow-hidden border border-cyan-500/20 rd-4px bg-black/40"
          >
            <!-- Placeholder for video feed -->
            <div class="absolute inset-0 flex-center from-transparent to-black/60 bg-gradient-to-b">
              <div
                class="i-carbon-video text-64px text-cyan-500/20 transition-colors group-hover:text-cyan-500/40"
              ></div>
            </div>
            <!-- Scan line effect -->
            <div class="scan-line absolute inset-x-0 h-4px bg-cyan-400/30 blur-sm"></div>

            <div class="absolute bottom-3 left-3 text-xs text-cyan-100/80 font-mono">CAM-01 [LIVE]</div>
            <div class="absolute right-3 top-3 flex items-center gap-2">
              <span class="h-2 w-2 animate-ping rounded-full bg-red-500"></span>
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
        <div class="tech-card relative h-full overflow-hidden p-4 dark:bg-transparent dark:shadow-[inset_0_0_15px_rgba(0,120,255,0.15)]">
          <div class="tech-card-bg absolute inset-0 dark:from-[#0e2a47] dark:to-[#091a2c] dark:bg-gradient-to-b"></div>
          <div class="relative z-10 h-full flex flex-col justify-around">
            <div class="text-neon-blue mb-2 flex-y-center gap-2 font-bold">
              <div class="i-carbon-cloud-satellite"></div>
              气象数据
            </div>

            <div class="flex items-center justify-between border-b border-cyan-500/10 py-2">
              <div class="flex-y-center gap-3">
                <div class="i-carbon-sun animate-spin-slow-reverse text-32px text-orange-500 dark:text-orange-400"></div>
                <div class="flex flex-col">
                  <span class="text-12px text-gray-500 dark:text-gray-400">辐照度</span>
                  <span class="text-16px text-gray-700 dark:text-gray-200 font-mono">{{ weatherInfo.irradiance }}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between border-b border-cyan-500/10 py-2">
              <div class="flex-y-center gap-3">
                <div class="i-carbon-temperature text-32px text-cyan-400"></div>
                <div class="flex flex-col">
                  <span class="text-12px text-gray-500 dark:text-gray-400">环境温湿度</span>
                  <span class="text-16px text-gray-700 dark:text-gray-200 font-mono">
                    {{ weatherInfo.temp }} / {{ weatherInfo.humidity }}
                  </span>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between py-2">
              <div class="flex-y-center gap-3">
                <div class="i-carbon-windy animate-pulse text-32px text-green-600 dark:text-green-400"></div>
                <div class="flex flex-col">
                  <span class="text-12px text-gray-500 dark:text-gray-400">风速</span>
                  <span class="text-16px text-gray-700 dark:text-gray-200 font-mono">{{ weatherInfo.windSpeed }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NGi>

      <!-- Trend Chart (75%) -->
      <NGi span="3">
        <div class="tech-card relative h-full overflow-hidden p-4 dark:bg-transparent dark:shadow-[inset_0_0_15px_rgba(0,120,255,0.15)]">
          <div class="tech-card-bg absolute inset-0 dark:from-[#0e2a47] dark:to-[#091a2c] dark:bg-gradient-to-b"></div>
          <div class="relative z-10 h-full flex flex-col">
            <div class="mb-2 flex items-center justify-between">
              <div class="text-neon-cyan flex-y-center gap-2 font-bold">
                <div class="i-carbon-chart-line-data"></div>
                功率及发电量趋势
              </div>
              <div class="flex gap-2">
                <button class="tech-tab" :class="{ active: activeTab === 'day' }" @click="updateTrendChart('day')">
                  日
                </button>
                <button class="tech-tab" :class="{ active: activeTab === 'month' }" @click="updateTrendChart('month')">
                  月
                </button>
                <button class="tech-tab" :class="{ active: activeTab === 'year' }" @click="updateTrendChart('year')">
                  年
                </button>
                <div class="mx-1 h-20px w-1px self-center bg-cyan-500/30"></div>
                <button class="tech-tab flex-y-center gap-1" @click="downloadChart">
                  <div class="i-carbon-download"></div>
                  导出
                </button>
              </div>
            </div>
            <div ref="trendChartRef" class="min-h-240px w-full flex-1"></div>
          </div>
        </div>
      </NGi>
    </NGrid>

    <!-- Row 3: Device List -->
    <div ref="invSectionRef" class="tech-card inverter-section relative overflow-hidden p-4 dark:bg-transparent dark:shadow-[inset_0_0_15px_rgba(0,120,255,0.15)]">
      <div class="tech-card-bg absolute inset-0 dark:from-[#0e2a47] dark:to-[#091a2c] dark:bg-gradient-to-b"></div>
      <div class="relative z-10">
        <div class="text-neon-cyan mb-4 flex-y-center gap-2 font-bold">
          <div class="i-carbon-iot-connect"></div>
          设备状态监控
        </div>
        <div class="inv-topbar">
          <div v-for="inv in deviceStore.devices" :key="inv.id" class="inv-segment">
            <span class="segment-name">{{ inv.name }}</span>
            <span class="segment-status">
              <span class="i-carbon-plug mr-4px text-14px"></span>
              在线
            </span>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-16px md:grid-cols-3">
          <div v-for="inv in deviceStore.devices" :key="inv.id" class="tech-item-card group">
            <div
              class="flex flex-1 flex-col gap-2 cursor-pointer"
              @click="openInvDetail(inv.id, 'normal')"
            >
              <div class="flex justify-between">
                <span class="device-name font-bold text-gray-700 dark:text-gray-200">{{ inv.name }}</span>
                <span :class="statusClass('normal')">{{ statusText('normal') }}</span>
              </div>
              <div class="info-line flex justify-between">
                <span class="text-gray-500 dark:text-gray-400">当前功率</span>
                <span class="info-value power text-gray-700 dark:text-gray-200">{{ (Math.random() * 5 + 2).toFixed(2) }} kW</span>
              </div>
              <div class="info-line flex justify-between">
                <span class="text-gray-500 dark:text-gray-400">日发电量</span>
                <span class="info-value text-gray-700 dark:text-gray-200">{{ (Math.random() * 30 + 10).toFixed(1) }} kWh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* CSS Variables for Theme */
.tech-dashboard {
  --bg-color: #f8fafc;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --card-bg-start: #ffffff;
  --card-bg-end: #f1f5f9;
  --border-color: #e2e8f0;
  
  --neon-cyan: #0284c7; /* Blue for Light */
  --neon-blue: #2563eb;
  --neon-green: #16a34a;
  --neon-gold: #d97706;
  --neon-purple: #9333ea;
  
  --stat-box-bg: rgba(2, 132, 199, 0.05);
  --stat-box-border: rgba(2, 132, 199, 0.1);
  
  background-color: var(--bg-color);
  color: var(--text-primary);
  transition: all 0.3s ease;
}

/* Dark Mode Overrides */
:global(.dark) .tech-dashboard {
  --bg-color: #0f172a;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --card-bg-start: #0e2a47;
  --card-bg-end: #091a2c;
  --border-color: rgba(255, 255, 255, 0.1);
  
  --neon-cyan: #00f2f1;
  --neon-blue: #0078ff;
  --neon-green: #00ff9d;
  --neon-gold: #ffd700;
  --neon-purple: #bc13fe;
  
  --stat-box-bg: rgba(0, 242, 241, 0.05);
  --stat-box-border: rgba(0, 242, 241, 0.1);
  
  background: linear-gradient(180deg, #0e2a47 0%, #0b1f33 50%, #091a2c 100%);
}

.text-neon-cyan { color: var(--neon-cyan); }
.text-neon-blue { color: var(--neon-blue); }
.text-neon-green { color: var(--neon-green); }
.text-neon-gold { color: var(--neon-gold); }
.text-neon-purple { color: var(--neon-purple); }

.bg-neon-green\/10 { background-color: rgba(22, 163, 74, 0.1); }
:global(.dark) .bg-neon-green\/10 { background-color: rgba(0, 255, 157, 0.1); }

.border-neon-green\/30 { border-color: rgba(22, 163, 74, 0.3); }
:global(.dark) .border-neon-green\/30 { border-color: rgba(0, 255, 157, 0.3); }

/* Text Gradient for Light/Dark */
.text-gradient-gold {
  background: linear-gradient(to right, var(--neon-gold), var(--neon-cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Card Styling */
.tech-card {
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: var(--card-bg-start);
}
:global(.dark) .tech-card {
  box-shadow: 0 0 15px rgba(0, 120, 255, 0.15) inset;
  background: transparent; /* Uses tech-card-bg div for gradient */
}

.tech-card-bg {
  background: linear-gradient(135deg, var(--card-bg-start), var(--card-bg-end));
  opacity: 0.8;
}

/* Attribute Rows */
.attr-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-color);
}
.attr-row:last-child {
  border-bottom: none;
}
.attr-row .label {
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 6px;
}
.attr-row .value {
  color: var(--text-primary);
  font-family: 'Courier New', monospace;
  font-weight: bold;
}

/* Stat Boxes */
.tech-stat-box {
  background: var(--stat-box-bg);
  border: 1px solid var(--stat-box-border);
  border-radius: 6px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: all 0.3s ease;
}
.tech-stat-box:hover {
  background: rgba(0, 120, 255, 0.1);
  border-color: var(--neon-cyan);
}
.tech-stat-box .label {
  font-size: 12px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 6px;
}
.tech-stat-box .value {
  font-size: 16px;
  font-weight: bold;
  font-family: monospace;
}

/* Tabs */
.tech-tab {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 2px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}
.tech-tab:first-child {
  border-radius: 4px 0 0 4px;
}
.tech-tab:last-child {
  border-radius: 0 4px 4px 0;
}
.tech-tab:hover,
.tech-tab.active {
  background: rgba(0, 120, 255, 0.1);
  border-color: var(--neon-cyan);
  color: var(--neon-cyan);
}

/* Inverter Items */
.tech-item-card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.3s;
}
:global(.dark) .tech-item-card {
  background: rgba(255, 255, 255, 0.02);
}
.tech-item-card:hover {
  background: rgba(0, 120, 255, 0.05);
  border-color: var(--neon-cyan);
  transform: translateY(-2px);
}

.inverter-section .device-name {
  font-size: 18px;
  color: var(--text-primary);
}
.inverter-section .info-line {
  color: var(--text-secondary);
  font-size: 15px;
}
.inverter-section .info-value {
  color: var(--text-primary);
}
.inverter-section .power {
  font-weight: 600;
}
.inverter-section {
  background: var(--card-bg-start);
  border-color: var(--border-color);
}
:global(.dark) .inverter-section {
  background: rgba(9, 26, 44, 0.65);
  border-color: rgba(56, 113, 199, 0.25);
}

.inv-topbar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  background: rgba(0, 120, 255, 0.05);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 8px 10px;
  margin-bottom: 12px;
}
.inv-segment {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  border-right: 1px solid var(--border-color);
}
.inv-segment:last-child {
  border-right: none;
}
.segment-name {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 15px;
}
.segment-status {
  color: #10b981;
  display: inline-flex;
  align-items: center;
  font-size: 14px;
}

/* Animations */
.scan-line {
  animation: scan 3s linear infinite;
}
@keyframes scan {
  0% { top: -10%; opacity: 0; }
  50% { opacity: 1; }
  100% { top: 110%; opacity: 0; }
}

.animate-spin-slow-reverse {
  animation: spin-reverse 8s linear infinite;
}
@keyframes spin-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>