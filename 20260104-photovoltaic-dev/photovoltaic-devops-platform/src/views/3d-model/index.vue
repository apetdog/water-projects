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
  <div class="h-full w-full flex flex-col lg:flex-row gap-6 p-6 bg-gray-50 dark:bg-black transition-colors duration-300 overflow-hidden">
    
    <!-- Left: 3D Model Area -->
    <div class="bento-card flex-1 lg:flex-[2] relative p-0 overflow-hidden group">
      <!-- Title Overlay -->
      <div class="absolute top-6 left-6 z-10">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">单体组件详情</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 font-mono bg-white/50 dark:bg-black/50 px-2 py-1 rounded-md backdrop-blur-md inline-block">ID: PV-2024-X89</p>
      </div>
      
      <!-- Model Viewer Component -->
      <div class="w-full h-full transform transition-transform duration-700 group-hover:scale-[1.02]">
        <ModelViewer />
      </div>

      <!-- Decorative Grid Overlay -->
      <div class="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    </div>

    <!-- Right: Data Panels -->
    <div class="flex-1 flex flex-col gap-5 min-w-[300px]">
      
      <!-- Card 1: Power Generation -->
      <div class="bento-card flex-1 flex flex-col relative overflow-hidden">
        <div class="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
          <div class="i-carbon-flash text-8xl text-yellow-500"></div>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <div class="i-carbon-flash-filled text-yellow-500"></div>
          实时发电效率
        </h3>
        <div class="flex-1 flex flex-col justify-center items-center">
          <div class="text-5xl font-mono font-bold text-gray-900 dark:text-white mb-4">
            {{ power.toFixed(2) }} <span class="text-xl text-gray-400 font-normal">kW</span>
          </div>
          <!-- Power Bar Animation -->
          <div class="w-full h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-yellow-400 to-orange-500 relative transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(234,179,8,0.3)]" :style="{ width: `${(power / 3.5) * 100}%` }">
              <div class="absolute inset-0 bg-white/30 w-full h-full animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
          <div class="w-full flex justify-between text-xs text-gray-400 mt-2 font-mono">
            <span>0 kW</span>
            <span>3.5 kW</span>
          </div>
        </div>
      </div>

      <!-- Card 2: Water Level Sensor -->
      <div class="bento-card flex-1 flex flex-col relative overflow-hidden">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <div class="i-carbon-humidity text-blue-500"></div>
          水浸传感器数据
        </h3>
        <div class="flex-1 flex items-center gap-8 justify-center">
          <!-- Water Tank Visual -->
          <div class="w-20 h-28 border-2 border-gray-200 dark:border-gray-700 rounded-xl relative overflow-hidden bg-gray-50 dark:bg-gray-900 shadow-inner">
             <div 
               class="absolute bottom-0 w-full bg-blue-500/80 transition-all duration-1000 ease-in-out"
               :style="{ height: `${waterLevel}%` }"
             >
               <div class="absolute top-0 w-full h-2 bg-blue-400/50 animate-[wave_2s_infinite_linear]"></div>
             </div>
             <!-- Lines -->
             <div class="absolute top-1/4 w-full h-px bg-gray-400/20"></div>
             <div class="absolute top-2/4 w-full h-px bg-gray-400/20"></div>
             <div class="absolute top-3/4 w-full h-px bg-gray-400/20"></div>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-4xl font-bold text-blue-600 dark:text-blue-400 font-mono">{{ waterLevel.toFixed(1) }}%</span>
            <span class="text-sm font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 inline-block text-center" :class="waterLevel > 80 ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-gray-500 dark:text-gray-400'">
              {{ waterLevel > 80 ? '警告: 水位过高' : '水位正常' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Card 3: Temp & Humidity -->
      <div class="bento-card flex-1 flex flex-col relative overflow-hidden">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <div class="i-carbon-temperature text-red-500"></div>
          环境温湿度
        </h3>
        <div class="flex-1 flex justify-around items-center">
          <!-- Temp -->
          <div class="flex flex-col items-center gap-3">
            <div class="relative w-24 h-24 flex items-center justify-center rounded-full">
               <!-- Background circle -->
               <svg class="absolute inset-0 transform -rotate-90 w-full h-full">
                 <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="6" fill="transparent" class="text-gray-100 dark:text-gray-800" />
                 <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="6" fill="transparent" 
                   stroke-linecap="round"
                   :stroke-dasharray="251"
                   :stroke-dashoffset="251 - (temperature / 50) * 251"
                   class="text-orange-500 transition-all duration-1000" />
               </svg>
               <span class="text-2xl font-bold text-gray-800 dark:text-gray-200 font-mono">{{ temperature.toFixed(1) }}°</span>
            </div>
            <span class="text-sm text-gray-500 font-medium">温度</span>
          </div>
          
          <div class="w-px h-16 bg-gray-200 dark:bg-gray-800"></div>
          
          <!-- Humidity -->
          <div class="flex flex-col items-center gap-3">
            <div class="relative w-24 h-24 flex items-center justify-center rounded-full">
               <svg class="absolute inset-0 transform -rotate-90 w-full h-full">
                 <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="6" fill="transparent" class="text-gray-100 dark:text-gray-800" />
                 <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="6" fill="transparent" 
                   stroke-linecap="round"
                   :stroke-dasharray="251"
                   :stroke-dashoffset="251 - (humidity / 100) * 251"
                   class="text-cyan-500 transition-all duration-1000" />
               </svg>
               <span class="text-2xl font-bold text-gray-800 dark:text-gray-200 font-mono">{{ humidity.toFixed(0) }}%</span>
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
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes wave {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-2px); }
  100% { transform: translateY(0px); }
}
</style>
