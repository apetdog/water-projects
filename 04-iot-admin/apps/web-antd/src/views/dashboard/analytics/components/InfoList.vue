<script lang="ts" setup>
interface Props {
  title: string;
  items: string[];
}

defineProps<Props>();
</script>

<template>
  <div class="h-full w-full bg-white dark:bg-black/85 p-4 rounded-xl shadow-sm-md">
    <div class="font-bold mb-4 border-l-4 border-blue-500 pl-2">
      {{ title }}
    </div>
    <ul class="list-none pl-0">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="border-b border-gray-100 dark:border-gray-900 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 cursor-pointer transition-colors"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>
