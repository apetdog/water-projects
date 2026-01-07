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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f5f9ff;
  color: #1f1f1f;
}

.page-title {
  margin: 0;
  padding: 16px 20px;
  font-size: 20px;
  font-weight: bold;
  color: #2a5cff;
}

.model-container {
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
