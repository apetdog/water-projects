<script lang="ts" setup>
import { IconifyIcon } from '@vben/icons';

interface Props {
  title: string;
  count: number | string;
  icon: string;
  color: string;
}

defineProps<Props>();
</script>

<template>
  <div
    class="flex items-center justify-between p-4 text-white rounded-xl shadow-sm h-full"
    :class="color"
  >
    <div class="flex flex-col">
      <span class="text-3xl font-bold">{{ count }}</span>
      <span class="text-sm opacity-90 mt-1">{{ title }}</span>
    </div>
    <div>
      <IconifyIcon :icon="icon" class="text-4xl opacity-80" />
    </div>
  </div>
</template>
