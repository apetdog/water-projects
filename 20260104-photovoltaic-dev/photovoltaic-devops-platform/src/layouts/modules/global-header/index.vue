<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFullscreen } from '@vueuse/core';
import { GLOBAL_HEADER_MENU_ID } from '@/constants/app';
import { useAppStore } from '@/store/modules/app';
import { useThemeStore } from '@/store/modules/theme';
import { useDeviceStore } from '@/store/modules/device';
import type { DeviceStatus } from '@/store/modules/device';
import GlobalLogo from '../global-logo/index.vue';
import GlobalBreadcrumb from '../global-breadcrumb/index.vue';
import ThemeButton from './components/theme-button.vue';
import UserAvatar from './components/user-avatar.vue';

defineOptions({
  name: 'GlobalHeader'
});

interface Props {
  /** Whether to show the logo */
  showLogo?: App.Global.HeaderProps['showLogo'];
  /** Whether to show the menu toggler */
  showMenuToggler?: App.Global.HeaderProps['showMenuToggler'];
  /** Whether to show the menu */
  showMenu?: App.Global.HeaderProps['showMenu'];
}

defineProps<Props>();

const appStore = useAppStore();
const themeStore = useThemeStore();
const deviceStore = useDeviceStore();
const router = useRouter();
const { isFullscreen, toggle } = useFullscreen();

const statusFilter = ref<'all' | DeviceStatus>('all');
const previewVisible = computed(() => statusFilter.value !== 'all');
const statusPreviewItems = computed(() =>
  statusFilter.value === 'all' ? [] : deviceStore.devices.filter(i => i.status === statusFilter.value).slice(0, 3)
);

function closeStatusPreview() {
  statusFilter.value = 'all';
}

function toggleStatusFilter(status: DeviceStatus) {
  statusFilter.value = statusFilter.value === status ? 'all' : status;
}

function previewTitle() {
  if (statusFilter.value === 'serious') return '严重告警预览';
  if (statusFilter.value === 'accident') return '事故告警预览';
  return '普通告警预览';
}

function statusText(s: DeviceStatus) {
  if (s === 'serious') return '严重';
  if (s === 'accident') return '事故';
  return '运行正常';
}

function statusClass(s: DeviceStatus) {
  if (s === 'serious') return 'text-amber-400';
  if (s === 'accident') return 'text-red-400';
  return 'text-neon-green';
}

function viewAll() {
  router.push('/');
  closeStatusPreview();
}
</script>

<template>
  <DarkModeContainer class="h-full flex-y-center px-12px shadow-header relative">
    <GlobalLogo v-if="showLogo" class="h-full" :style="{ width: themeStore.sider.width + 'px' }" />
    <MenuToggler v-if="showMenuToggler" :collapsed="appStore.siderCollapse" @click="appStore.toggleSiderCollapse" />
    <div v-if="showMenu" :id="GLOBAL_HEADER_MENU_ID" class="h-full flex-y-center flex-1-hidden"></div>
    <div v-else class="h-full flex-y-center flex-1-hidden">
      <GlobalBreadcrumb v-if="!appStore.isMobile" class="ml-12px" />
    </div>
    <div class="h-full flex-y-center justify-end gap-8px relative">
      <!-- Alert Buttons -->
      <button
        class="status-chip normal"
        :class="{ active: statusFilter === 'normal' }"
        @click="toggleStatusFilter('normal')"
      >
        <span class="i-carbon-checkmark-filled mr-4px"></span>
        普通 {{ deviceStore.statusCounts.normal }}
      </button>
      <button
        class="status-chip severe"
        :class="{ active: statusFilter === 'serious' }"
        @click="toggleStatusFilter('serious')"
      >
        <span class="i-carbon-warning mr-4px"></span>
        严重 {{ deviceStore.statusCounts.serious }}
      </button>
      <button
        class="status-chip accident"
        :class="{ active: statusFilter === 'accident' }"
        @click="toggleStatusFilter('accident')"
      >
        <span class="i-carbon-warning-hex mr-4px"></span>
        事故 {{ deviceStore.statusCounts.accident }}
      </button>

      <!-- Preview Popup -->
      <div v-if="previewVisible" class="status-preview" :class="statusFilter">
        <div class="preview-header">
          <div class="title">
            <span class="i-carbon-notification"></span>
            {{ previewTitle() }}
          </div>
          <button class="close-btn" @click="closeStatusPreview">
            <span class="i-carbon-close"></span>
          </button>
        </div>
        <div class="preview-body">
          <div v-for="item in statusPreviewItems" :key="item.id" class="preview-item">
            <div class="name">{{ item.name }}</div>
            <div class="row">
              <span class="label">运行ID</span>
              <span class="value">{{ item.id }}</span>
            </div>
            <div class="row">
              <span class="label">设备类型</span>
              <span class="value">{{ item.deviceType === 'pv-panel' ? '光伏板' : item.deviceType === 'inverter' ? '逆变器' : '其他设备' }}</span>
            </div>
            <div class="row">
              <span class="label">额定功率</span>
              <span class="value text-neon-cyan">{{ item.power }}</span>
            </div>
            <div class="row">
              <span class="label">状态</span>
              <span class="value" :class="statusClass(item.status)">{{ statusText(item.status) }}</span>
            </div>
          </div>
          <div v-if="statusPreviewItems.length === 0" class="text-gray-400 text-center py-4 text-12px">无数据</div>
        </div>
        <div class="preview-footer">
          <button class="detail-btn" @click="viewAll">查看全部</button>
        </div>
      </div>

      <ThemeSchemaSwitch :theme-schema="themeStore.themeScheme" :show-tooltip="false" class="px-12px" @switch="themeStore.toggleThemeScheme" />
      <ThemeButton />
      <UserAvatar />
    </div>
  </DarkModeContainer>
</template>

<style scoped>
.status-chip {
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04));
  backdrop-filter: blur(6px);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;
  cursor: pointer;
  color: #fff;
}
.status-chip.normal {
  color: #10b981;
  border-color: rgba(16, 185, 129, 0.4);
  background: rgba(16, 185, 129, 0.1);
}
.status-chip.severe {
  color: #f59e0b;
  border-color: rgba(245, 158, 11, 0.4);
  background: rgba(245, 158, 11, 0.1);
}
.status-chip.accident {
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.4);
  background: rgba(239, 68, 68, 0.1);
}
.status-chip.active {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2) inset;
  transform: translateY(-1px);
}

.status-preview {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 8px;
  z-index: 100;
  width: 300px;
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.35);
}
.status-preview.normal { border-color: rgba(16, 185, 129, 0.35); }
.status-preview.severe { border-color: rgba(245, 158, 11, 0.35); }
.status-preview.accident { border-color: rgba(239, 68, 68, 0.35); }

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #e2e8f0;
  font-weight: 600;
  font-size: 14px;
}
.close-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
}
.preview-body {
  max-height: 300px;
  overflow: auto;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.preview-item {
  border: 1px dashed rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  padding: 8px;
}
.preview-item .name {
  color: #e2e8f0;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
}
.row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #94a3b8;
  padding: 2px 0;
}
.row .value {
  color: #cbd5e1;
}
.text-neon-cyan { color: #00f2f1; }
.text-amber-400 { color: #fbbf24; }
.text-red-400 { color: #f87171; }
.text-neon-green { color: #00ff9d; }

.preview-footer {
  padding: 10px 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: flex-end;
}
.detail-btn {
  background: transparent;
  border: 1px solid rgba(0, 242, 241, 0.4);
  color: #00f2f1;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
}
.detail-btn:hover {
  background: rgba(0, 242, 241, 0.15);
}
</style>
