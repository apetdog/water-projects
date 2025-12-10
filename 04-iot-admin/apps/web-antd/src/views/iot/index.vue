<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">{{ route.meta.title }}</h1>
    <div class="p-4 bg-white rounded-xl shadow-sm dark:bg-gray-800">
      <p>这里是 {{ route.meta.title }} 的占位页面。</p>
      <p class="text-gray-500 mt-2">路径: {{ route.path }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
