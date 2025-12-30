<script lang="ts" setup>
import { Empty } from 'ant-design-vue';
</script>

<template>
  <div class="h-full w-full bg-white dark:bg-black/85 p-4 rounded-xl shadow-sm">
    <div class="font-bold mb-4">本月告警统计</div>
    <div class="h-[300px] flex items-center justify-center">
      <Empty description="暂无数据" />
    </div>
  </div>
</template>
