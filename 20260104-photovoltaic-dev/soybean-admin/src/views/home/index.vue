<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import * as echarts from 'echarts';

defineOptions({
  name: 'HomePage'
});

// --- Refs ---
const gaugeChartRef = ref<HTMLDivElement | null>(null);
const trendChartRef = ref<HTMLDivElement | null>(null);
let gaugeChart: echarts.ECharts | null = null;
let trendChart: echarts.ECharts | null = null;
const activeTab = ref<'day' | 'month' | 'year'>('day');

// --- Data ---
const stationInfo = {
  name: '安科瑞光伏电站',
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

const inverters = [
  {
    id: '101001400001',
    name: '安科瑞A楼5F',
    factory: '阳光电源股份有限公司',
    model: 'SG33CX-2P-CN',
    status: 'running',
    power: '33kW',
    type: '组串'
  },
  {
    id: '101001400002',
    name: '安科瑞B楼3F',
    factory: '江苏固德威电源科技有限公司',
    model: 'GW20K-DT',
    status: 'running',
    power: '20kW',
    type: '组串'
  },
  {
    id: '101001400003',
    name: '安科瑞E楼6F',
    factory: '锦浪科技股份有限公司',
    model: 'GCI-3P20K-5G',
    status: 'running',
    power: '20kW',
    type: '组串'
  }
];

// --- Charts ---
function initGaugeChart() {
  if (!gaugeChartRef.value) return;
  gaugeChart = echarts.init(gaugeChartRef.value);
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
          color: '#00f2f1', // Cyan for tech feel
          shadowColor: 'rgba(0,242,241,0.8)',
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
            color: '#00f2f1'
          }
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 12,
            color: [[1, '#1e293b']] // Dark track
          }
        },
        axisTick: {
          splitNumber: 2,
          lineStyle: {
            width: 2,
            color: '#475569'
          }
        },
        splitLine: {
          length: 12,
          lineStyle: {
            width: 3,
            color: '#475569'
          }
        },
        axisLabel: {
          distance: 20,
          color: '#94a3b8',
          fontSize: 10
        },
        title: { show: false },
        detail: {
          backgroundColor: 'rgba(30, 41, 59, 0.8)',
          borderColor: '#00f2f1',
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
              color: '#00f2f1',
              fontFamily: 'monospace'
            },
            unit: {
              fontSize: 12,
              color: '#94a3b8',
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

  // Simulated current date: 2026-01-07
  const currentMonth = 1; // January
  const currentDay = 7;

  if (type === 'day') {
    xAxisData = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
    seriesData = xAxisData.map((_, i) => {
      if (i < 6 || i > 19) return 0;
      const x = (i - 12.5) / 5;
      return Math.max(0, 45 * Math.exp(-x * x) + Math.random() * 5);
    });
  } else if (type === 'month') {
    xAxisData = Array.from({ length: 30 }, (_, i) => `${i + 1}日`);
    seriesData = xAxisData.map((_, i) => {
      // Only show data up to the 7th
      if (i + 1 > currentDay) return 0;
      return Math.random() * 200 + 100;
    });
  } else {
    xAxisData = Array.from({ length: 12 }, (_, i) => `${i + 1}月`);
    seriesData = xAxisData.map((_, i) => {
      // Only show data for January
      if (i + 1 > currentMonth) return 0;
      return Math.random() * 5000 + 3000;
    });
  }

  return { xAxisData, seriesData };
}

function initTrendChart() {
  if (!trendChartRef.value) return;
  trendChart = echarts.init(trendChartRef.value);

  const { xAxisData, seriesData } = getTrendData();

  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      borderColor: '#00f2f1',
      textStyle: { color: '#e2e8f0' }
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
      axisLabel: { color: '#94a3b8' },
      axisLine: { lineStyle: { color: '#334155' } }
    },
    yAxis: {
      type: 'value',
      name: activeTab.value === 'day' ? 'kW' : 'kW·h',
      nameTextStyle: { color: '#94a3b8' },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#334155'
        }
      },
      axisLabel: { color: '#94a3b8' }
    },
    series: [
      {
        name: activeTab.value === 'day' ? '功率' : '发电量',
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 242, 241, 0.4)' }, // Cyan glow
            { offset: 1, color: 'rgba(0, 242, 241, 0.01)' }
          ])
        },
        itemStyle: {
          color: '#00f2f1',
          shadowColor: 'rgba(0, 242, 241, 0.5)',
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

  const { xAxisData, seriesData } = getTrendData();

  trendChart.setOption({
    xAxis: { data: xAxisData },
    yAxis: { name: tab === 'day' ? 'kW' : 'kW·h' },
    series: [
      {
        name: tab === 'day' ? '功率' : '发电量',
        data: seriesData
      }
    ]
  });
}

function downloadChart() {
  if (!trendChart) return;

  // Determine title based on active tab and simulated date (2026-01-07)
  let titleText = '';
  if (activeTab.value === 'day') {
    titleText = '2026年1月7日 功率趋势';
  } else if (activeTab.value === 'month') {
    titleText = '2026年1月 发电量趋势';
  } else {
    titleText = '2026年 发电量趋势';
  }

  // Temporarily show title for export
  trendChart.setOption({
    title: {
      show: true,
      text: titleText,
      left: 'center',
      top: 10,
      textStyle: {
        color: '#e2e8f0',
        fontSize: 16,
        fontWeight: 'bold'
      }
    }
  });

  const url = trendChart.getDataURL({
    type: 'png',
    backgroundColor: '#0f172a', // Match theme background
    pixelRatio: 2 // Higher resolution
  });

  // Hide title again
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

onMounted(() => {
  initGaugeChart();
  initTrendChart();

  window.addEventListener('resize', () => {
    gaugeChart?.resize();
    trendChart?.resize();
  });
});

onBeforeUnmount(() => {
  gaugeChart?.dispose();
  trendChart?.dispose();
});
</script>

<template>
  <div class="tech-dashboard flex-col-stretch gap-16px p-16px text-gray-100">
    <!-- Row 1: Station Info, Energy/Revenue, Video -->
    <NGrid :x-gap="16" :y-gap="16" cols="1 l:4" responsive="screen" item-responsive>
      <!-- Station Info (25%) -->
      <NGi span="1">
        <div class="tech-card relative h-full flex flex-col overflow-hidden p-4">
          <div class="tech-card-bg absolute inset-0"></div>
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
            <div class="mb-4 text-center text-12px text-cyan-200/70 -mt-6">实时发电功率</div>

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
        <div class="tech-card relative h-full overflow-hidden p-4">
          <div class="tech-card-bg absolute inset-0"></div>
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
                <span class="ml-auto text-12px text-gray-400 font-normal opacity-70">截止: 2025-01-01</span>
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
        <div class="tech-card relative h-full flex flex-col overflow-hidden p-4">
          <div class="tech-card-bg absolute inset-0"></div>
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
        <div class="tech-card relative h-full overflow-hidden p-4">
          <div class="tech-card-bg absolute inset-0"></div>
          <div class="relative z-10 h-full flex flex-col justify-around">
            <div class="text-neon-blue mb-2 flex-y-center gap-2 font-bold">
              <div class="i-carbon-cloud-satellite"></div>
              气象数据
            </div>

            <div class="flex items-center justify-between border-b border-cyan-500/10 py-2">
              <div class="flex-y-center gap-3">
                <div class="i-carbon-sun animate-spin-slow-reverse text-32px text-orange-400"></div>
                <div class="flex flex-col">
                  <span class="text-12px text-gray-400">辐照度</span>
                  <span class="text-16px text-gray-200 font-mono">{{ weatherInfo.irradiance }}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between border-b border-cyan-500/10 py-2">
              <div class="flex-y-center gap-3">
                <div class="i-carbon-temperature text-32px text-cyan-400"></div>
                <div class="flex flex-col">
                  <span class="text-12px text-gray-400">环境温湿度</span>
                  <span class="text-16px text-gray-200 font-mono">
                    {{ weatherInfo.temp }} / {{ weatherInfo.humidity }}
                  </span>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between py-2">
              <div class="flex-y-center gap-3">
                <div class="i-carbon-windy animate-pulse text-32px text-green-400"></div>
                <div class="flex flex-col">
                  <span class="text-12px text-gray-400">风速</span>
                  <span class="text-16px text-gray-200 font-mono">{{ weatherInfo.windSpeed }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NGi>

      <!-- Trend Chart (75%) -->
      <NGi span="3">
        <div class="tech-card relative h-full overflow-hidden p-4">
          <div class="tech-card-bg absolute inset-0"></div>
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

    <!-- Row 3: Inverter List -->
    <div class="tech-card relative overflow-hidden p-4">
      <div class="tech-card-bg absolute inset-0"></div>
      <div class="relative z-10">
        <div class="text-neon-cyan mb-4 flex-y-center gap-2 font-bold">
          <div class="i-carbon-iot-connect"></div>
          逆变器状态监控
        </div>
        <div class="grid grid-cols-1 gap-16px lg:grid-cols-3 md:grid-cols-2">
          <div v-for="inv in inverters" :key="inv.id" class="tech-item-card group">
            <!-- Device Image -->
            <div
              class="relative h-100px w-80px flex-center overflow-hidden border border-cyan-500/20 rd-4px bg-cyan-900/20"
            >
              <img src="@/assets/imgs/inverter.png" class="h-full w-full object-contain" alt="Inverter" />
              <div class="absolute bottom-0 h-1px w-full bg-cyan-400 shadow-[0_0_10px_#00f2f1]"></div>
            </div>

            <!-- Info -->
            <div class="flex-col flex-1 gap-6px text-12px">
              <div class="mb-1 flex items-start justify-between border-b border-cyan-500/10 pb-2">
                <span class="text-14px text-gray-200 font-bold">{{ inv.name }}</span>
                <div
                  class="text-neon-green bg-neon-green/10 border-neon-green/20 flex-y-center gap-4px border rd-full px-2"
                >
                  <span class="bg-neon-green h-1.5 w-1.5 animate-pulse rd-full"></span>
                  <span>在线</span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-x-4 gap-y-2">
                <div class="text-gray-500">
                  厂家:
                  <span class="text-gray-300">{{ inv.factory.substring(0, 4) }}...</span>
                </div>
                <div class="text-gray-500">
                  型号:
                  <span class="text-gray-300">{{ inv.model }}</span>
                </div>
                <div class="text-gray-500">
                  功率:
                  <span class="text-neon-cyan">{{ inv.power }}</span>
                </div>
                <div class="text-gray-500">
                  类型:
                  <span class="text-gray-300">{{ inv.type }}</span>
                </div>
              </div>
              <div class="mt-1 text-xs text-gray-500">ID: {{ inv.id }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Theme Variables */
.tech-dashboard {
  --neon-cyan: #00f2f1;
  --neon-blue: #0078ff;
  --neon-green: #00ff9d;
  --neon-gold: #ffd700;
  --neon-purple: #bd00ff;
  --bg-dark: #0f172a;
  --card-bg: rgba(15, 23, 42, 0.6);
  --card-border: rgba(0, 242, 241, 0.2);

  background: radial-gradient(circle at center, #1e293b 0%, #0f172a 100%);
  min-height: 100%;
}

/* Card Styling */
.tech-card {
  border: 1px solid var(--card-border);
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 242, 241, 0.05);
  backdrop-filter: blur(10px);
}
.tech-card-bg {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
  z-index: 0;
}

/* Typography */
.text-neon-cyan {
  color: var(--neon-cyan);
  text-shadow: 0 0 5px rgba(0, 242, 241, 0.5);
}
.text-neon-green {
  color: var(--neon-green);
  text-shadow: 0 0 5px rgba(0, 255, 157, 0.5);
}
.text-neon-gold {
  color: var(--neon-gold);
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
}
.text-neon-blue {
  color: var(--neon-blue);
  text-shadow: 0 0 5px rgba(0, 120, 255, 0.5);
}
.text-neon-purple {
  color: var(--neon-purple);
  text-shadow: 0 0 5px rgba(189, 0, 255, 0.5);
}

.text-gradient-gold {
  background: linear-gradient(to right, #ffd700, #ffaa00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Attribute Rows */
.attr-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
}
.attr-row:last-child {
  border-bottom: none;
}
.attr-row .label {
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 6px;
}
.attr-row .value {
  color: #e2e8f0;
  font-family: 'Courier New', monospace;
  font-weight: bold;
}

/* Stat Boxes */
.tech-stat-box {
  background: rgba(0, 242, 241, 0.05);
  border: 1px solid rgba(0, 242, 241, 0.1);
  border-radius: 6px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: all 0.3s ease;
}
.tech-stat-box:hover {
  background: rgba(0, 242, 241, 0.1);
  border-color: rgba(0, 242, 241, 0.3);
  box-shadow: 0 0 10px rgba(0, 242, 241, 0.1);
}
.tech-stat-box .label {
  font-size: 12px;
  color: #94a3b8;
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
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #94a3b8;
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
  background: rgba(0, 242, 241, 0.2);
  border-color: var(--neon-cyan);
  color: var(--neon-cyan);
}

/* Inverter Items */
.tech-item-card {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  transition: all 0.3s;
}
.tech-item-card:hover {
  background: rgba(0, 242, 241, 0.05);
  border-color: rgba(0, 242, 241, 0.3);
  transform: translateY(-2px);
}

/* Animations */
.scan-line {
  animation: scan 3s linear infinite;
}
@keyframes scan {
  0% {
    top: -10%;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    top: 110%;
    opacity: 0;
  }
}

.animate-spin-slow-reverse {
  animation: spin-reverse 8s linear infinite;
}
@keyframes spin-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
