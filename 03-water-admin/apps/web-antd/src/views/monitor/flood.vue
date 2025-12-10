<script setup lang="ts">
import { ref } from 'vue';
import { Card, Checkbox, Button, Row, Col } from 'ant-design-vue';
import {
  CloudServerOutlined,
  ThunderboltFilled,
  GatewayOutlined,
  ExperimentOutlined,
  BarChartOutlined,
  EnvironmentOutlined,
  SearchOutlined,
  FullscreenOutlined
} from '@ant-design/icons-vue';

// Layers control
const layers = ref([
  '雨量站', '水位站', '闸门状态', '水泵状态', '积水点', '河道断面'
]);
const selectedLayers = ref(['雨量站', '水位站', '闸门状态']);

// Drawing selection (Simulating different zones)
const drawings = ref([
  { name: '流域总览', id: 'basin', icon: EnvironmentOutlined },
  { name: '上游河道', id: 'upstream', icon: GatewayOutlined },
  { name: '下游河道', id: 'downstream', icon: GatewayOutlined },
  { name: '主要闸门', id: 'sluice', icon: GatewayOutlined },
  { name: '排涝泵站', id: 'pump', icon: CloudServerOutlined },
  { name: '气象雷达', id: 'radar', icon: ThunderboltFilled },
]);
const activeDrawing = ref('basin');

// Background image
const bgImage = ref(`${import.meta.env.BASE_URL}bg02.jpg`);

// Statistics Data
const stats = ref([
  { title: '平均降雨', value: '12.5', unit: 'mm', color: 'bg-indigo-500' },
  { title: '当前水位', value: '32.4', unit: 'm', color: 'bg-blue-600' },
  { title: '警戒水位', value: '35.0', unit: 'm', color: 'bg-red-500' },
  { title: '出库流量', value: '150', unit: 'm³/s', color: 'bg-cyan-600' },
  { title: '入库流量', value: '180', unit: 'm³/s', color: 'bg-teal-600' },
  { title: '未来24h雨量', value: '25', unit: 'mm', color: 'bg-purple-500' },
]);

// Markers
const markers = ref([
  { id: 'RAIN01', label: '雨量站A: 15mm', top: '20%', left: '30%', type: 'rain' },
  { id: 'RAIN02', label: '雨量站B: 8mm', top: '35%', left: '60%', type: 'rain' },
  { id: 'WL01', label: '水位站: 32.4m', top: '55%', left: '45%', type: 'water' },
  { id: 'GATE01', label: '1#闸门: 开启', top: '65%', left: '25%', type: 'gate' },
  { id: 'PUMP01', label: '泵站: 运行中', top: '70%', left: '75%', type: 'pump' },
]);

</script>

<template>
  <div class="monitor-container" :style="{ backgroundImage: `url(${bgImage})` }">
    <!-- Left Panel: Layer Control & Drawing Selection -->
    <div class="left-panel">
      <Card :bordered="false" class="control-card mb-2" :bodyStyle="{ padding: '12px' }">
        <template #title>
          <span class="text-sm font-bold">防汛图层</span>
        </template>
        <div class="flex flex-col gap-2">
          <Checkbox.Group v-model:value="selectedLayers" class="flex flex-col gap-2">
             <Checkbox v-for="layer in layers" :key="layer" :value="layer" class="!ml-0 text-xs">
               {{ layer }}
             </Checkbox>
          </Checkbox.Group>
          <Button size="small" class="mt-2" type="primary">启动预案</Button>
        </div>
      </Card>

      <Card :bordered="false" class="control-card" :bodyStyle="{ padding: '8px' }">
        <template #title>
           <span class="text-sm font-bold">调度视图</span>
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
        <div class="marker-icon" :class="marker.type">
            <ThunderboltFilled v-if="marker.type === 'rain'" />
            <BarChartOutlined v-else-if="marker.type === 'water'" />
            <GatewayOutlined v-else-if="marker.type === 'gate'" />
            <CloudServerOutlined v-else-if="marker.type === 'pump'" />
        </div>
        <div class="marker-label">{{ marker.label }}</div>
      </div>
    </div>

    <!-- Right Panel: Reservoir Overview -->
    <div class="right-panel">
      <Card :bordered="false" class="overview-card" :bodyStyle="{ padding: '16px' }">
        <template #title>
           <span class="text-base font-bold">防汛调度</span>
        </template>
        <template #extra>
           <div class="flex gap-2">
             <Button size="small" type="text"><SearchOutlined /></Button>
             <Button size="small" type="text"><FullscreenOutlined /></Button>
           </div>
        </template>
        
        <div class="status-section mb-4 flex items-center gap-4 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
           <ThunderboltFilled class="text-indigo-500 text-4xl" />
           <div>
             <div class="font-bold text-indigo-700 text-lg">防汛IV级响应</div>
             <div class="text-xs text-indigo-600">当前雨情平稳，各站点水位均在警戒线以下</div>
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

.dark .control-card, 
.dark .overview-card {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
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

.marker-icon {
  width: 24px;
  height: 24px;
  background-color: #1890ff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 8px rgba(24, 144, 255, 0.8);
  margin-bottom: 4px;
}
.marker-icon.rain { background-color: #722ed1; }
.marker-icon.water { background-color: #1890ff; }
.marker-icon.gate { background-color: #faad14; }
.marker-icon.pump { background-color: #52c41a; }

.marker-label {
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  font-family: sans-serif;
}

/* Tailwind-like utilities */
.bg-indigo-500 { background-color: #6366f1; }
.bg-blue-600 { background-color: #2563eb; }
.bg-red-500 { background-color: #ef4444; }
.bg-cyan-600 { background-color: #0891b2; }
.bg-teal-600 { background-color: #0d9488; }
.bg-purple-500 { background-color: #a855f7; }

:deep(.ant-card-head) {
  min-height: 40px;
  padding: 0 12px;
}
:deep(.ant-card-head-title) {
  padding: 8px 0;
}

.dark .drawing-item {
  background: #1f1f1f;
  color: rgba(255, 255, 255, 0.65);
}

.dark .drawing-item:hover, 
.dark .drawing-item.active {
  background: #111b26;
  color: #177ddc;
  border-color: #177ddc;
}

.dark .status-section {
  background-color: rgba(30, 58, 138, 0.2);
  border-color: rgba(30, 58, 138, 0.4);
}
.dark .status-section .text-blue-700 {
  color: #60a5fa;
}
.dark .status-section .text-blue-600 {
  color: #93c5fd;
}

.dark :deep(.ant-card-head) {
  color: rgba(255, 255, 255, 0.85);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.dark :deep(.ant-checkbox-wrapper) {
  color: rgba(255, 255, 255, 0.85);
}
</style>
