<script setup lang="ts">
import { ref } from 'vue';
import { Card, Checkbox, Button, Row, Col } from 'ant-design-vue';
import {
  ExperimentFilled,
  BgColorsOutlined,
  DashboardOutlined,
  DeleteRowOutlined,
  EnvironmentOutlined,
  SearchOutlined,
  FullscreenOutlined,
  ApiOutlined
} from '@ant-design/icons-vue';

// Layers control
const layers = ref([
  '国控断面', '省控断面', '入河排污口', '饮用水源地', '自动监测站', '视频监控'
]);
const selectedLayers = ref(['国控断面', '饮用水源地', '自动监测站']);

// Drawing selection
const drawings = ref([
  { name: '水质分布', id: 'distribution', icon: BgColorsOutlined },
  { name: '取水口', id: 'intake', icon: ApiOutlined },
  { name: '排污口', id: 'outlet', icon: DeleteRowOutlined },
  { name: '实验室', id: 'lab', icon: ExperimentFilled },
  { name: '历史趋势', id: 'trend', icon: DashboardOutlined },
  { name: '采样地图', id: 'map', icon: EnvironmentOutlined },
]);
const activeDrawing = ref('distribution');

// Background image
const bgImage = ref(`${import.meta.env.BASE_URL}bg04.png`);

// Statistics Data
const stats = ref([
  { title: 'pH值', value: '7.2', unit: '', color: 'bg-green-500 dark:bg-green-700' },
  { title: '溶解氧(DO)', value: '6.8', unit: 'mg/L', color: 'bg-blue-500 dark:bg-blue-700' },
  { title: '浊度', value: '3.5', unit: 'NTU', color: 'bg-yellow-500 dark:bg-yellow-700' },
  { title: '电导率', value: '245', unit: 'μS/cm', color: 'bg-cyan-500 dark:bg-cyan-700' },
  { title: '高锰酸盐指数', value: '2.1', unit: 'mg/L', color: 'bg-purple-500 dark:bg-purple-700' },
  { title: '氨氮', value: '0.15', unit: 'mg/L', color: 'bg-teal-500 dark:bg-teal-700' },
]);

// Markers
const markers = ref([
  { id: 'S01', label: '断面A: II类', top: '40%', left: '30%', type: 'station', grade: 'II' },
  { id: 'S02', label: '断面B: III类', top: '50%', left: '60%', type: 'station', grade: 'III' },
  { id: 'OUT01', label: '排污口: 正常', top: '70%', left: '45%', type: 'outlet' },
  { id: 'SRC01', label: '水源地: I类', top: '30%', left: '70%', type: 'source', grade: 'I' },
]);

</script>

<template>
  <div class="monitor-container" :style="{ backgroundImage: `url(${bgImage})` }">
    <!-- Left Panel: Layer Control & Drawing Selection -->
    <div class="left-panel">
      <Card :bordered="false" class="control-card mb-2" :bodyStyle="{ padding: '12px' }">
        <template #title>
          <span class="text-sm font-bold">水质图层</span>
        </template>
        <div class="flex flex-col gap-2">
          <Checkbox.Group v-model:value="selectedLayers" class="flex flex-col gap-2">
             <Checkbox v-for="layer in layers" :key="layer" :value="layer" class="!ml-0 text-xs">
               {{ layer }}
             </Checkbox>
          </Checkbox.Group>
          <Button size="small" class="mt-2" type="primary" ghost>生成报告</Button>
        </div>
      </Card>

      <Card :bordered="false" class="control-card" :bodyStyle="{ padding: '8px' }">
        <template #title>
           <span class="text-sm font-bold">监测视图</span>
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
        <div class="marker-icon" :class="[marker.type, marker.grade ? `grade-${marker.grade}` : '']">
            <ExperimentFilled v-if="marker.type === 'station'" />
            <DeleteRowOutlined v-else-if="marker.type === 'outlet'" />
            <EnvironmentOutlined v-else-if="marker.type === 'source'" />
        </div>
        <div class="marker-label">{{ marker.label }}</div>
      </div>
    </div>

    <!-- Right Panel: Reservoir Overview -->
    <div class="right-panel">
      <Card :bordered="false" class="overview-card" :bodyStyle="{ padding: '16px' }">
        <template #title>
           <span class="text-base font-bold">水质监测</span>
        </template>
        <template #extra>
           <div class="flex gap-2">
             <Button size="small" type="text"><SearchOutlined /></Button>
             <Button size="small" type="text"><FullscreenOutlined /></Button>
           </div>
        </template>
        
        <div class="status-section mb-4 flex items-center gap-4 bg-teal-50 dark:bg-teal-900/20 p-3 rounded-lg border border-teal-100 dark:border-teal-800">
           <ExperimentFilled class="text-teal-500 text-4xl" />
           <div>
             <div class="font-bold text-teal-700 dark:text-teal-400 text-lg">水质总体良好</div>
             <div class="text-xs text-teal-600 dark:text-teal-500">饮用水源地水质达标率100%，重点断面达标</div>
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
.marker-icon.grade-I, .marker-icon.grade-II { background-color: #52c41a; }
.marker-icon.grade-III { background-color: #1890ff; }
.marker-icon.outlet { background-color: #faad14; }

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
.bg-green-500 { background-color: #22c55e; }
.bg-blue-500 { background-color: #3b82f6; }
.bg-yellow-500 { background-color: #eab308; }
.bg-cyan-500 { background-color: #06b6d4; }
.bg-purple-500 { background-color: #a855f7; }
.bg-teal-500 { background-color: #14b8a6; }

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

.dark .ant-checkbox-wrapper {
  color: rgba(255, 255, 255, 0.85);
}

.dark .marker-label {
  background: rgba(0, 0, 0, 0.8);
  color: rgba(255, 255, 255, 0.9);
}

/* Dark mode bg utilities */
.dark  .bg-green-700 { background-color: #15803d; }
.dark  .bg-blue-700 { background-color: #1d4ed8; }
.dark  .bg-yellow-700 { background-color: #a16207; }
.dark  .bg-cyan-700 { background-color: #0e7490; }
.dark  .bg-purple-700 { background-color: #7e22ce; }
.dark  .bg-teal-700 { background-color: #0f766e; }
</style>
