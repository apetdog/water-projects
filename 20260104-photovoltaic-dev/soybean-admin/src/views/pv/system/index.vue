<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'PvSystem'
});

const router = useRouter();

interface Panel {
  id: string;
  status: 'normal' | 'warning' | 'error' | 'displacement';
}

const rows = 6;
const cols = 12;

const panels = ref<Panel[]>(
  Array.from({ length: rows * cols }).map((_, i) => {
    const r = Math.random();
    let status: Panel['status'] = 'normal';
    if (r > 0.95) {
      status = 'error'; // 异物遮挡 (Red)
    } else if (r > 0.9) {
      status = 'warning'; // 水浸问题 (Yellow)
    } else if (r > 0.85) {
      status = 'displacement'; // 位移偏差 (Blue)
    }
    return { id: `P-${String(i + 1).padStart(3, '0')}`, status };
  })
);

const counts = computed(() => {
  return {
    normal: panels.value.filter(p => p.status === 'normal').length,
    warning: panels.value.filter(p => p.status === 'warning').length,
    error: panels.value.filter(p => p.status === 'error').length,
    displacement: panels.value.filter(p => p.status === 'displacement').length
  };
});

function statusColor(s: Panel['status']) {
  if (s === 'error') return '#f5222d'; // Red
  if (s === 'warning') return '#faad14'; // Yellow
  if (s === 'displacement') return '#1890ff'; // Blue
  return '#52c41a'; // Green
}

function openPanelDetail(id: string) {
  const p = panels.value.find(x => x.id === id);
  // Jump to 3D model page with panel info
  router.push({
    name: 'pv_3d-model',
    query: {
      panelId: id,
      status: p?.status || 'normal'
    }
  });
}
</script>

<template>
  <div class="flex-col-stretch gap-16px">
    <NCard :bordered="false" title="光伏板状态">
      <div class="mb-12px text-12px text-#666">已脱敏显示：面板编号为匿名编码</div>
      <div class="grid-container" :style="{ gridTemplateColumns: `repeat(${cols}, 1fr)` }">
        <div
          v-for="p in panels"
          :key="p.id"
          :title="p.id"
          class="panel-item flex-center cursor-pointer rd-4px"
          :style="{ backgroundColor: statusColor(p.status) }"
          @click="openPanelDetail(p.id)"
        >
          <span class="text-12px text-white">{{ p.id }}</span>
        </div>
      </div>
      <div class="mt-12px flex-y-center flex-wrap gap-16px">
        <div class="flex-y-center gap-6px">
          <span class="size-12px rd-2px bg-success"></span>
          正常 {{ counts.normal }}
        </div>
        <div class="flex-y-center gap-6px">
          <span class="size-12px rd-2px bg-error"></span>
          异物遮挡 {{ counts.error }}
        </div>
        <div class="flex-y-center gap-6px">
          <span class="size-12px rd-2px bg-warning"></span>
          水浸问题 {{ counts.warning }}
        </div>
        <div class="flex-y-center gap-6px">
          <span class="size-12px rd-2px bg-info"></span>
          位移偏差 {{ counts.displacement }}
        </div>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  gap: 6px;
}
.panel-item {
  height: 32px;
}
.bg-success {
  background-color: #52c41a;
}
.bg-warning {
  background-color: #faad14;
}
.bg-error {
  background-color: #f5222d;
}
.bg-info {
  background-color: #1890ff;
}
</style>
