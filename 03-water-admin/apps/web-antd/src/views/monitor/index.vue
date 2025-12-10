<script setup lang="ts">
import { ref } from 'vue';
import { Card, Checkbox, Button, Row, Col } from 'ant-design-vue';
import {
  CheckCircleFilled,
  FullscreenOutlined,
  ColumnHeightOutlined,
  PicCenterOutlined,
  BlockOutlined,
  AppstoreOutlined,
  SearchOutlined
} from '@ant-design/icons-vue';

// Layers control
const layers = ref([
  '渗透压力', '裂缝', '温度', '降雨量', '库水位', '渗流量', '河道水位'
]);
const selectedLayers = ref(['渗透压力', '裂缝', '温度', '降雨量', '库水位', '渗流量', '河道水位']);

// Drawing selection
const drawings = ref([
  { name: '全景图', id: 'overview', icon: FullscreenOutlined },
  { name: 'A-A', id: 'aa', icon: ColumnHeightOutlined },
  { name: 'B-B', id: 'bb', icon: ColumnHeightOutlined },
  { name: 'C-C', id: 'cc', icon: ColumnHeightOutlined },
  { name: '左岸绕', id: 'left', icon: PicCenterOutlined },
  { name: '右岸绕', id: 'right', icon: PicCenterOutlined },
  { name: '静力水...', id: 'static', icon: BlockOutlined },
  { name: '正面全...', id: 'front', icon: AppstoreOutlined },
]);
const activeDrawing = ref('overview');

// Background image
const bgImage = ref(`${import.meta.env.BASE_URL}bg03.png`); // Using bg03.png as it likely matches the dam scene better or is the new one

// Statistics Data
const stats = ref([
  { title: '当前水位', value: '470.31', unit: 'm', color: 'bg-blue-500' },
  { title: '当前库容', value: '457.0', unit: '万m³', color: 'bg-teal-500' },
  { title: '当前气温', value: '18.4', unit: '°C', color: 'bg-purple-500' },
  { title: '最大小时降雨量', value: '0', unit: 'mm', color: 'bg-purple-300' },
  { title: '24小时累计雨量', value: '0', unit: 'mm', color: 'bg-green-500' },
  { title: '最大压力', value: '864.37', unit: 'KPa', color: 'bg-teal-300' },
]);

// Markers (Mock positions on the dam image)
const markers = ref([
  { id: 'CF10', label: 'CF10 (-0.69mm)', top: '60%', left: '35%' },
  { id: 'CF9', label: 'CF9 (-0.37mm)', top: '62%', left: '42%' },
  { id: 'CF8', label: 'CF8 (-5.02mm)', top: '62%', left: '48%' },
  { id: 'CF7', label: 'CF7 (2.68mm)', top: '62%', left: '55%' },
  { id: 'CF6', label: 'CF6 (-2.5mm)', top: '62%', left: '62%' },
  { id: 'CF5', label: 'CF5 (37.77mm)', top: '62%', left: '70%' },
  { id: 'CF3', label: 'CF3 (20.25mm)', top: '60%', left: '85%' },
  { id: 'Top1', label: '坝上雨量站 (470.31m)', top: '48%', left: '30%' },
  { id: 'LSY', label: '上测LSY (0.027L/s)', top: '75%', left: '62%' },
  { id: 'LSY2', label: '下测LSY (0.506L/s)', top: '80%', left: '62%' },
]);

</script>

<template>
  <div class="monitor-container" :style="{ backgroundImage: `url(${bgImage})` }">
    <!-- Left Panel: Layer Control & Drawing Selection -->
    <div class="left-panel">
      <Card :bordered="false" class="control-card mb-2" :bodyStyle="{ padding: '12px' }">
        <template #title>
          <span class="text-sm font-bold">图层控制</span>
        </template>
        <div class="flex flex-col gap-2">
          <Checkbox.Group v-model:value="selectedLayers" class="flex flex-col gap-2">
             <Checkbox v-for="layer in layers" :key="layer" :value="layer" class="!ml-0 text-xs">
               {{ layer }}
             </Checkbox>
          </Checkbox.Group>
          <Button size="small" class="mt-2">获取点位</Button>
        </div>
      </Card>

      <Card :bordered="false" class="control-card" :bodyStyle="{ padding: '8px' }">
        <template #title>
           <span class="text-sm font-bold">图纸选择</span>
        </template>
        <div class="drawing-grid">
           <div 
             v-for="draw in drawings" 
             :key="draw.id" 
             class="drawing-item"
             :class="{ active: activeDrawing === draw.id }"
             @click="activeDrawing = draw.id"
           >
             <component :is="draw.icon" class="text-xl mb-1"/>
             <span class="text-xs scale-90 truncate">{{ draw.name }}</span>
           </div>
        </div>
      </Card>
    </div>

    <!-- Center Markers Overlay -->
    <div class="markers-layer">
      <div 
        v-for="marker in markers" 
        :key="marker.id" 
        class="marker-point"
        :style="{ top: marker.top, left: marker.left }"
      >
        <div class="marker-dot"></div>
        <div class="marker-label">{{ marker.label }}</div>
      </div>
    </div>

    <!-- Right Panel: Reservoir Overview -->
    <div class="right-panel">
      <Card :bordered="false" class="overview-card" :bodyStyle="{ padding: '16px' }">
        <template #title>
           <span class="text-base font-bold">水库概览</span>
        </template>
        <template #extra>
           <div class="flex gap-2">
             <Button size="small" type="text"><SearchOutlined /></Button>
             <Button size="small" type="text"><FullscreenOutlined /></Button>
           </div>
        </template>
        
        <div class="status-section mb-4 flex items-center gap-4 bg-green-50 p-3 rounded-lg border border-green-100">
           <CheckCircleFilled class="text-green-500 text-4xl" />
           <div>
             <div class="font-bold text-green-700 text-lg">水库运行状态正常</div>
             <div class="text-xs text-green-600">当前水库各点位均在正常范围内...</div>
           </div>
        </div>

        <Row :gutter="[12, 12]">
           <Col :span="12" v-for="stat in stats" :key="stat.title">
             <div :class="['stat-card text-white p-3 rounded-md shadow-sm', stat.color]">
                <div class="text-xs opacity-90 mb-1">{{ stat.title }}</div>
                <div class="flex items-baseline gap-1">
                   <span class="text-lg font-bold">{{ stat.value }}</span>
                   <span class="text-xs opacity-80">{{ stat.unit }}</span>
                </div>
             </div>
           </Col>
        </Row>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.monitor-container {
  width: 100%;
  height: calc(100vh - 48px);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  background-color: #f0f2f5;
}

.left-panel {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 140px;
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.right-panel {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 320px;
  z-index: 10;
}

.control-card, .overview-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}

.drawing-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.drawing-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 4px;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.3s;
  color: #666;
}

.drawing-item:hover, .drawing-item.active {
  background: #e6f7ff;
  border-color: #1890ff;
  color: #1890ff;
}

.markers-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.marker-point {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: auto;
  cursor: pointer;
}

.marker-dot {
  width: 12px;
  height: 12px;
  background-color: #00e5ff;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(0, 229, 255, 0.8);
  margin-bottom: 4px;
}

.marker-label {
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  font-family: sans-serif;
}

/* Tailwind-like utilities for scoped usage if Tailwind isn't fully effective inside scoped styles for dynamic classes */
.bg-blue-500 { background-color: #3b82f6; }
.bg-teal-500 { background-color: #14b8a6; }
.bg-purple-500 { background-color: #a855f7; }
.bg-purple-300 { background-color: #d8b4fe; color: #581c87; }
.bg-green-500 { background-color: #22c55e; }
.bg-teal-300 { background-color: #5eead4; color: #134e4a; }

/* Adjust text colors for lighter backgrounds */
.bg-purple-300 .text-white,
.bg-teal-300 .text-white {
  color: #1f2937; /* Darker text for contrast */
}
.bg-purple-300 .opacity-90, .bg-teal-300 .opacity-90 { opacity: 0.7; }
.bg-purple-300 .opacity-80, .bg-teal-300 .opacity-80 { opacity: 0.6; }

:deep(.ant-card-head) {
  min-height: 40px;
  padding: 0 12px;
}
:deep(.ant-card-head-title) {
  padding: 8px 0;
}

/* Dark Mode Overrides */
.dark .control-card, 
.dark .overview-card {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dark .drawing-item {
  background: #1f1f1f;
  color: rgba(255, 255, 255, 0.65);
}

.dark .drawing-item:hover, 
.dark .drawing-item.active {
  background: #111b26;
  border-color: #177ddc;
  color: #177ddc;
}

.dark .status-section {
  background-color: rgba(20, 83, 45, 0.2);
  border-color: rgba(20, 83, 45, 0.4);
}
.dark .status-section .text-green-700 {
  color: #4ade80;
}
.dark .status-section .text-green-600 {
  color: #86efac;
}

.dark :deep(.ant-card-head) {
  color: rgba(255, 255, 255, 0.85);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.dark :deep(.ant-checkbox-wrapper) {
  color: rgba(255, 255, 255, 0.85);
}

.dark .marker-label {
  background: rgba(0, 0, 0, 0.8);
  color: rgba(255, 255, 255, 0.9);
}
</style>
