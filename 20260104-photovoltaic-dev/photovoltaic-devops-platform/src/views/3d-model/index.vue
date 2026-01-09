<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ModelViewer from '@/components/custom/model-viewer.vue';

const waterLevel = ref(45);
const temperature = ref(26);
const humidity = ref(60);
const power = ref(2.4);

// Simulate data changes
onMounted(() => {
  setInterval(() => {
    waterLevel.value = 40 + Math.random() * 10;
    temperature.value = 25 + Math.random() * 2;
    humidity.value = 55 + Math.random() * 10;
    power.value = 2.0 + Math.random() * 0.8;
  }, 3000);
});
</script>

<template>
  <div
    class="h-full w-full flex flex-col gap-6 overflow-hidden bg-gray-50 p-6 transition-colors duration-300 lg:flex-row dark:bg-black"
  >
    <!-- Left: 3D Model Area -->
    <div class="bento-card group relative flex-1 overflow-hidden p-0 lg:flex-[2]">
      <!-- Title Overlay -->
      <div class="absolute left-10 top-10 z-10">
        <h2 class="text-2xl text-gray-900 font-bold dark:text-white">单体组件详情</h2>
        <p
          class="mt-1 inline-block rounded-md bg-white/20 px-2 py-1 text-sm text-gray-500 font-mono backdrop-blur-md dark:bg-black/50 dark:text-gray-400"
        >
          ID: PV-2024-X89
        </p>
      </div>

      <!-- Model Viewer Component -->
      <div
        class="h-full w-full transform overflow-hidden rounded-xl transition-transform duration-700 group-hover:scale-[1.02]"
      >
        <ModelViewer />
      </div>

      <!-- Decorative Grid Overlay -->
      <div
        class="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]"
      ></div>
    </div>

    <!-- Right: Data Panels -->
    <div class="min-w-[300px] flex flex-col flex-1 gap-5">
      <!-- Card 1: Power Generation -->
      <div class="bento-card relative flex flex-col flex-1 overflow-hidden">
        <div class="pointer-events-none absolute right-0 top-0 p-3 opacity-5">
          <div class="i-carbon-flash text-8xl text-yellow-500"></div>
        </div>
        <h3 class="mb-4 flex items-center gap-2 text-lg text-gray-900 font-semibold dark:text-white">
          <div class="i-carbon-flash-filled text-yellow-500"></div>
          实时发电效率
        </h3>
        <div class="flex flex-col flex-1 items-center justify-center">
          <div class="mb-4 text-5xl text-gray-900 font-bold font-mono dark:text-white">
            {{ power.toFixed(2) }}
            <span class="text-xl text-gray-400 font-normal">kW</span>
          </div>
          <!-- Power Bar Animation -->
          <div class="h-4 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <div
              class="relative h-full from-yellow-400 to-orange-500 bg-gradient-to-r shadow-[0_0_10px_rgba(234,179,8,0.3)] transition-all duration-1000 ease-out"
              :style="{ width: `${(power / 3.5) * 100}%` }"
            >
              <div class="absolute inset-0 h-full w-full animate-[shimmer_2s_infinite] bg-white/30"></div>
            </div>
          </div>
          <div class="mt-2 w-full flex justify-between text-xs text-gray-400 font-mono">
            <span>0 kW</span>
            <span>3.5 kW</span>
          </div>
        </div>
      </div>

      <!-- Card 2: Water Level Sensor -->
      <div class="bento-card relative flex flex-col flex-1 overflow-hidden">
        <h3 class="mb-4 flex items-center gap-2 text-lg text-gray-900 font-semibold dark:text-white">
          <div class="i-carbon-humidity text-blue-500"></div>
          水浸传感器数据
        </h3>
        <div class="flex flex-1 items-center justify-center gap-8">
          <!-- Water Tank Visual -->
          <div
            class="relative h-28 w-20 overflow-hidden border-2 border-gray-200 rounded-xl bg-gray-50 shadow-inner dark:border-gray-700 dark:bg-gray-900"
          >
            <div
              class="absolute bottom-0 w-full bg-blue-500/80 transition-all duration-1000 ease-in-out"
              :style="{ height: `${waterLevel}%` }"
            >
              <div class="absolute top-0 h-2 w-full animate-[wave_2s_infinite_linear] bg-blue-400/50"></div>
            </div>
            <!-- Lines -->
            <div class="absolute top-1/4 h-px w-full bg-gray-400/20"></div>
            <div class="absolute top-2/4 h-px w-full bg-gray-400/20"></div>
            <div class="absolute top-3/4 h-px w-full bg-gray-400/20"></div>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-4xl text-blue-600 font-bold font-mono dark:text-blue-400">
              {{ waterLevel.toFixed(1) }}%
            </span>
            <span
              class="inline-block rounded-full bg-gray-100 px-3 py-1 text-center text-sm font-medium dark:bg-gray-800"
              :class="
                waterLevel > 80 ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-gray-500 dark:text-gray-400'
              "
            >
              {{ waterLevel > 80 ? '警告: 水位过高' : '水位正常' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Card 3: Temp & Humidity -->
      <div class="bento-card relative flex flex-col flex-1 overflow-hidden">
        <h3 class="mb-4 flex items-center gap-2 text-lg text-gray-900 font-semibold dark:text-white">
          <div class="i-carbon-temperature text-red-500"></div>
          环境温湿度
        </h3>
        <div class="flex flex-1 items-center justify-around">
          <!-- Temp -->
          <div class="flex flex-col items-center gap-3">
            <div class="relative h-24 w-24 flex items-center justify-center rounded-full">
              <!-- Background circle -->
              <svg class="absolute inset-0 h-full w-full transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  stroke-width="6"
                  fill="transparent"
                  class="text-gray-100 dark:text-gray-800"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  stroke-width="6"
                  fill="transparent"
                  stroke-linecap="round"
                  :stroke-dasharray="251"
                  :stroke-dashoffset="251 - (temperature / 50) * 251"
                  class="text-orange-500 transition-all duration-1000"
                />
              </svg>
              <span class="text-2xl text-gray-800 font-bold font-mono dark:text-gray-200">
                {{ temperature.toFixed(1) }}°
              </span>
            </div>
            <span class="text-sm text-gray-500 font-medium">温度</span>
          </div>

          <div class="h-16 w-px bg-gray-200 dark:bg-gray-800"></div>

          <!-- Humidity -->
          <div class="flex flex-col items-center gap-3">
            <div class="relative h-24 w-24 flex items-center justify-center rounded-full">
              <svg class="absolute inset-0 h-full w-full transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  stroke-width="6"
                  fill="transparent"
                  class="text-gray-100 dark:text-gray-800"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  stroke-width="6"
                  fill="transparent"
                  stroke-linecap="round"
                  :stroke-dasharray="251"
                  :stroke-dashoffset="251 - (humidity / 100) * 251"
                  class="text-cyan-500 transition-all duration-1000"
                />
              </svg>
              <span class="text-2xl text-gray-800 font-bold font-mono dark:text-gray-200">
                {{ humidity.toFixed(0) }}%
              </span>
            </div>
            <span class="text-sm text-gray-500 font-medium">湿度</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bento-card {
  @apply bg-white dark:bg-[#1c1c1e] rounded-[24px] p-6 shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-lg;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes wave {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
