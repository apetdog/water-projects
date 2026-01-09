<script setup lang="ts">
import ModelViewer from '@/components/custom/model-viewer.vue';
</script>

<template>
  <div class="pv-3d-model">
    <h2 class="page-title">光伏系统3D模型</h2>
    <div class="model-container">
      <ModelViewer />
    </div>
  </div>
</template>

<style scoped>
.pv-3d-model {
  --bg-color: #f5f9ff;
  --text-color: #1f1f1f;
  --title-color: #2a5cff;

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

:global(.dark) .pv-3d-model {
  --bg-color: #0f172a;
  --text-color: #f1f5f9;
  --title-color: #60a5fa;
}

.page-title {
  margin: 0;
  padding: 16px 20px;
  font-size: 20px;
  font-weight: bold;
  color: var(--title-color);
}

.model-container {
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
