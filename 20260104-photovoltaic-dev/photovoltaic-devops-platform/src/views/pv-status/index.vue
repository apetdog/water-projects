<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'PvSystem'
});

const router = useRouter();

interface Panel {
  id: string;
  status: 'normal' | 'warning' | 'error' | 'displacement';
  isFixed?: boolean;
}

const rows = 6;
const cols = 8; // Reduced cols for better aspect ratio in demo

const panels = ref<Panel[]>([]);

const fixedPanelIndex = 10; // Choose a specific panel index to fix (e.g., 2nd row, 3rd col)

function initPanels() {
  panels.value = Array.from({ length: rows * cols }).map((_, i) => {
    return { id: `P-${String(i + 1).padStart(3, '0')}`, status: 'normal' };
  });

  // Default set fixed panel to error
  // panels.value[fixedPanelIndex].status = 'error';
  panels.value[fixedPanelIndex].isFixed = true;

  // Simulate random events
  setInterval(() => {
    // Filter out fixed panels to avoid selecting them for random events
    const availableIndices = panels.value
      .map((p, i) => ({ ...p, originalIndex: i }))
      .filter(p => !p.isFixed)
      .map(p => p.originalIndex);
    
    if (availableIndices.length === 0) return;

    const randomIdx = Math.floor(Math.random() * availableIndices.length);
    const idx = availableIndices[randomIdx];
    
    const r = Math.random();
    if (r > 0.7) {
      // Randomly set a status, then revert after some time
      const types: Panel['status'][] = ['error', 'warning', 'displacement'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      // Double check if it's fixed (though filtered above)
      if (panels.value[idx].isFixed) return;
      
      panels.value[idx].status = type;

      setTimeout(() => {
        // Only revert if it hasn't become fixed in the meantime
        if (!panels.value[idx].isFixed) {
          panels.value[idx].status = 'normal';
        }
      }, 3000);
    }
  }, 2000);
}

onMounted(() => {
  initPanels();
});

const counts = computed(() => {
  return {
    normal: panels.value.filter(p => p.status === 'normal').length,
    warning: panels.value.filter(p => p.status === 'warning').length,
    error: panels.value.filter(p => p.status === 'error').length,
    displacement: panels.value.filter(p => p.status === 'displacement').length
  };
});

function openPanelDetail(id: string) {
  const p = panels.value.find(x => x.id === id);
  if (!p) return;

  // If it is the fixed panel, toggle status and do not navigate
  if (p.isFixed) {
    p.status = p.status === 'error' ? 'normal' : 'error';
    return;
  }

  router.push({
    name: '3d-model',
    query: {
      panelId: id,
      status: p?.status || 'normal'
    }
  });
}

function toggleFixedError() {
  const p = panels.value[fixedPanelIndex];
  if (p) {
    p.status = p.status === 'error' ? 'normal' : 'error';
  }
}
</script>

<template>
  <div class="h-full w-full flex flex-col gap-4 bg-gray-50 p-4 transition-colors duration-300 dark:bg-black">
    <!-- Header Legend -->
    <div class="bento-card flex items-center justify-between px-6 py-4">
      <h2 class="flex items-center gap-2 text-xl text-gray-900 font-bold dark:text-white">
        <div class="i-carbon-grid text-blue-500"></div>
        光伏阵列实时监控
      </h2>
      <div class="flex gap-6">
        <div class="flex items-center gap-2">
          <span class="h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
          <span class="text-sm text-gray-600 font-medium dark:text-gray-300">正常运行 ({{ counts.normal }})</span>
        </div>
        <div
          class="flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-80"
          @click="toggleFixedError"
        >
          <span class="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
          <span class="text-sm text-gray-600 font-medium dark:text-gray-300">异物遮挡 ({{ counts.error }})</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="h-2.5 w-2.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></span>
          <span class="text-sm text-gray-600 font-medium dark:text-gray-300">水浸异常 ({{ counts.warning }})</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="h-2.5 w-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></span>
          <span class="text-sm text-gray-600 font-medium dark:text-gray-300">位移偏差 ({{ counts.displacement }})</span>
        </div>
      </div>
    </div>

    <!-- Main Water Surface & Grid -->
    <div class="bento-card perspective-container relative flex flex-1 items-center justify-center overflow-hidden">
      <!-- Water Background Effect -->
      <div
        class="pointer-events-none absolute inset-0 from-blue-50/30 to-blue-100/30 bg-gradient-to-b dark:from-blue-900/5 dark:to-blue-800/5"
      ></div>

      <!-- Floating Tube Container -->
      <div
        class="transform-style-3d rotate-x-effect relative border-4 border-gray-200 rounded-[30px] bg-gray-100/50 p-6 shadow-2xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/30"
      >
        <!-- Connecting Tubes (Visual Decoration) -->
        <div
          class="absolute border-[12px] border-gray-200 rounded-[40px] opacity-60 -inset-[14px] dark:border-gray-700"
        ></div>

        <!-- The Grid -->
        <div class="relative z-10 grid gap-3" :style="{ gridTemplateColumns: `repeat(${cols}, 1fr)` }">
          <div
            v-for="p in panels"
            :key="p.id"
            class="group relative h-20 w-16 cursor-pointer transition-all duration-300 hover:transform hover:shadow-xl hover:-translate-y-2"
            @click="openPanelDetail(p.id)"
          >
            <!-- Panel Body -->
            <div
              class="relative h-full w-full overflow-hidden border border-white/20 rounded-sm shadow-inner dark:border-white/10"
              :class="[
                p.status === 'normal'
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                  : p.status === 'error'
                    ? 'bg-gradient-to-br from-red-500 to-red-600'
                    : p.status === 'warning'
                      ? 'bg-gradient-to-br from-yellow-500 to-yellow-600'
                      : 'bg-gradient-to-br from-purple-500 to-purple-600'
              ]"
            >
              <!-- Grid Lines on Panel -->
              <div class="absolute inset-0 grid grid-cols-2 grid-rows-4 opacity-30">
                <div class="border-b border-r border-white/30"></div>
                <div class="border-b border-white/30"></div>
                <div class="border-b border-r border-white/30"></div>
                <div class="border-b border-white/30"></div>
                <div class="border-b border-r border-white/30"></div>
                <div class="border-b border-white/30"></div>
                <div class="border-r border-white/30"></div>
                <div></div>
              </div>

              <!-- Glass Sheen -->
              <div class="pointer-events-none absolute inset-0 from-white/20 to-transparent bg-gradient-to-br"></div>
            </div>

            <!-- Error Spot Animation -->
            <div
              v-if="p.status === 'error'"
              class="pointer-events-none absolute left-1/2 top-1/2 h-full w-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
            >
              <div class="animate-flash-explode h-4 w-4 rounded-full bg-red-500 blur-sm"></div>
              <div class="absolute h-full w-full animate-pulse bg-red-500/20 blur-md"></div>
            </div>

            <!-- Warning/Info Indicators -->
            <div
              v-if="p.status === 'warning'"
              class="absolute h-3 w-3 animate-bounce border border-white/50 rounded-full bg-yellow-400 shadow-md -right-1 -top-1"
            ></div>
            <div
              v-if="p.status === 'displacement'"
              class="absolute h-3 w-3 animate-ping rounded-full bg-purple-400 opacity-75 -bottom-1 -left-1"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bento-card {
  @apply bg-white dark:bg-[#1c1c1e] rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-lg;
}

.perspective-container {
  perspective: 1000px;
}

.rotate-x-effect {
  transform: rotateX(20deg) scale(0.95);
  transition: transform 0.5s ease;
}

.rotate-x-effect:hover {
  transform: rotateX(10deg) scale(1);
}

@keyframes flash-explode {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(2);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

.animate-flash-explode {
  animation: flash-explode 1.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
