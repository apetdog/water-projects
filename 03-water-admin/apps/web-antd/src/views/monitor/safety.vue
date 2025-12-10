<script setup lang="ts">
import { ref } from 'vue';
import { Card, Checkbox, Button, Row, Col } from 'ant-design-vue';
import {
  SafetyCertificateFilled,
  VideoCameraOutlined,
  AlertOutlined,
  TeamOutlined,
  CarOutlined,
  EnvironmentOutlined,
  SearchOutlined,
  FullscreenOutlined
} from '@ant-design/icons-vue';

// Layers control
const layers = ref([
  '视频监控', '人员定位', '车辆定位', '禁入区域', '巡检路线', '报警点位'
]);
const selectedLayers = ref(['视频监控', '人员定位', '报警点位']);

// Drawing selection (Simulating different zones)
const drawings = ref([
  { name: '大坝全景', id: 'overview', icon: FullscreenOutlined },
  { name: '溢洪道', id: 'spillway', icon: VideoCameraOutlined },
  { name: '发电厂房', id: 'powerhouse', icon: VideoCameraOutlined },
  { name: '生活区', id: 'living', icon: TeamOutlined },
  { name: '库区巡逻', id: 'patrol', icon: CarOutlined },
  { name: '入口安检', id: 'gate', icon: SafetyCertificateFilled },
]);
const activeDrawing = ref('overview');

// Background image
const bgImage = ref(`${import.meta.env.BASE_URL}bg01.jpeg`);

// Statistics Data
const stats = ref([
  { title: '在线摄像头', value: '124', unit: '个', color: 'bg-blue-500 dark:bg-blue-700' },
  { title: '今日告警', value: '3', unit: '次', color: 'bg-red-500 dark:bg-red-700' },
  { title: '在岗人员', value: '42', unit: '人', color: 'bg-green-500 dark:bg-green-700' },
  { title: '巡检车辆', value: '8', unit: '辆', color: 'bg-orange-500 dark:bg-orange-700' },
  { title: '安全运行', value: '1285', unit: '天', color: 'bg-teal-500 dark:bg-teal-700' },
  { title: '系统状态', value: '正常', unit: '', color: 'bg-blue-400 dark:bg-blue-600' },
]);

// Markers
const markers = ref([
  { id: 'CAM01', label: '大坝左岸监控', top: '30%', left: '25%', type: 'cam' },
  { id: 'CAM02', label: '溢洪道监控', top: '45%', left: '55%', type: 'cam' },
  { id: 'P01', label: '巡检员: 张三', top: '65%', left: '40%', type: 'person' },
  { id: 'V01', label: '车辆: 湘A-12345', top: '75%', left: '60%', type: 'car' },
  { id: 'WARN1', label: '入侵告警!', top: '50%', left: '80%', type: 'warn' },
]);

</script>

<template>
  <div class="monitor-container" :style="{ backgroundImage: `url(${bgImage})` }">
    <!-- Left Panel: Layer Control & Drawing Selection -->
    <div class="left-panel">
      <Card :bordered="false" class="control-card mb-2" :bodyStyle="{ padding: '12px' }">
        <template #title>
          <span class="text-sm font-bold">安防图层</span>
        </template>
        <div class="flex flex-col gap-2">
          <Checkbox.Group v-model:value="selectedLayers" class="flex flex-col gap-2">
             <Checkbox v-for="layer in layers" :key="layer" :value="layer" class="!ml-0 text-xs">
               {{ layer }}
             </Checkbox>
          </Checkbox.Group>
          <Button size="small" class="mt-2" type="primary" danger>一键报警</Button>
        </div>
      </Card>

      <Card :bordered="false" class="control-card" :bodyStyle="{ padding: '8px' }">
        <template #title>
           <span class="text-sm font-bold">区域监控</span>
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
            <VideoCameraOutlined v-if="marker.type === 'cam'" />
            <TeamOutlined v-else-if="marker.type === 'person'" />
            <CarOutlined v-else-if="marker.type === 'car'" />
            <AlertOutlined v-else-if="marker.type === 'warn'" />
        </div>
        <div class="marker-label" :class="{ 'bg-red-600': marker.type === 'warn' }">{{ marker.label }}</div>
      </div>
    </div>

    <!-- Right Panel: Reservoir Overview -->
    <div class="right-panel">
      <Card :bordered="false" class="overview-card" :bodyStyle="{ padding: '16px' }">
        <template #title>
           <span class="text-base font-bold">安全态势</span>
        </template>
        <template #extra>
           <div class="flex gap-2">
             <Button size="small" type="text"><SearchOutlined /></Button>
             <Button size="small" type="text"><FullscreenOutlined /></Button>
           </div>
        </template>
        
        <div class="status-section mb-4 flex items-center gap-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
           <SafetyCertificateFilled class="text-blue-500 text-4xl" />
           <div>
             <div class="font-bold text-blue-700 text-lg">安防系统运行正常</div>
             <div class="text-xs text-blue-600">今日无重大安全事故，监控设备在线率99%</div>
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
.marker-icon.warn { background-color: #f5222d; box-shadow: 0 0 8px rgba(245, 34, 45, 0.8); animation: pulse 1s infinite; }
.marker-icon.person { background-color: #52c41a; }
.marker-icon.car { background-color: #fa8c16; }

.marker-label {
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  font-family: sans-serif;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}

/* Tailwind-like utilities */
.bg-blue-500 { background-color: #3b82f6; }
.bg-red-500 { background-color: #ef4444; }
.bg-green-500 { background-color: #22c55e; }
.bg-orange-500 { background-color: #f97316; }
.bg-teal-500 { background-color: #14b8a6; }
.bg-blue-400 { background-color: #60a5fa; }

.bg-blue-700 { background-color: #1d4ed8; }
.bg-red-700 { background-color: #b91c1c; }
.bg-green-700 { background-color: #15803d; }
.bg-orange-700 { background-color: #c2410c; }
.bg-teal-700 { background-color: #0f766e; }
.bg-blue-600 { background-color: #2563eb; }

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
