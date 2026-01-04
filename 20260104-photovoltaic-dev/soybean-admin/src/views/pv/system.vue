<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'PvSystem'
});

const router = useRouter();

interface Panel {
  id: string;
  status: 'normal' | 'warning' | 'error';
}

const rows = 6;
const cols = 12;

const panels = ref<Panel[]>(
  Array.from({ length: rows * cols }).map((_, i) => {
    const r = Math.random();
    const status: Panel['status'] = r > 0.95 ? 'error' : r > 0.85 ? 'warning' : 'normal';
    return { id: `P-${String(i + 1).padStart(3, '0')}`, status };
  })
);

const counts = computed(() => {
  return {
    normal: panels.value.filter(p => p.status === 'normal').length,
    warning: panels.value.filter(p => p.status === 'warning').length,
    error: panels.value.filter(p => p.status === 'error').length
  };
});

function statusColor(s: Panel['status']) {
  if (s === 'error') return '#f5222d';
  if (s === 'warning') return '#faad14';
  return '#52c41a';
}

function openPanelDetail(id: string) {
  const p = panels.value.find(x => x.id === id);
  router.push({ name: 'pv-panel-detail', params: { id }, query: { status: p?.status || 'normal' } });
}
</script>

<template>
  <div class="flex-col-stretch gap-16px">
    <NCard :bordered="false" title="光伏系统模型">
      <div class="mb-12px text-12px text-#666">已脱敏显示：面板编号为匿名编码</div>
      <div
        class="grid"
        :style="{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: '6px'
        }"
      >
        <div
          v-for="p in panels"
          :key="p.id"
          :title="p.id"
          class="cursor-pointer rd-4px flex-center"
          :style="{ backgroundColor: statusColor(p.status), height: '32px' }"
          @click="openPanelDetail(p.id)"
        >
          <span class="text-12px text-white">{{ p.id }}</span>
        </div>
      </div>
      <div class="mt-12px flex-y-center gap-16px">
        <div class="flex-y-center gap-6px">
          <span class="size-12px rd-2px" style="background-color: #52c41a"></span>
          正常 {{ counts.normal }}
        </div>
        <div class="flex-y-center gap-6px">
          <span class="size-12px rd-2px" style="background-color: #faad14"></span>
          预警 {{ counts.warning }}
        </div>
        <div class="flex-y-center gap-6px">
          <span class="size-12px rd-2px" style="background-color: #f5222d"></span>
          故障 {{ counts.error }}
        </div>
      </div>
    </NCard>
  </div>
</template>

<style scoped></style>
