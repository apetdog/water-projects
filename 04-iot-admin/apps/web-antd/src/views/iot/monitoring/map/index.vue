<script lang="ts" setup>
import AMapLoader from '@amap/amap-jsapi-loader';
import { Button, Input, message, Space } from 'ant-design-vue';
import { onMounted, onUnmounted, shallowRef } from 'vue';

import DeviceTree from '../../components/DeviceTree.vue';
import { mapMarkers } from '../../mock/map';

const map = shallowRef<any>(null);
const mapContainer = shallowRef<HTMLElement | null>(null);

// NOTE: Replace these with your actual AMap Key and Security Code
const AMAP_KEY = 'e1dedc6bdd765d466db380a22e6dc574'; // Demo key, might expire or be restricted
const AMAP_SECURITY_CODE = '2a884784196144026615967733527780';

const initMap = () => {
  (window as any)._AMapSecurityConfig = {
    securityJsCode: AMAP_SECURITY_CODE,
  };

  AMapLoader.load({
    key: AMAP_KEY,
    version: '2.0',
    plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.ControlBar', 'AMap.Marker', 'AMap.Geocoder'],
  })
    .then((AMap) => {
      map.value = new AMap.Map(mapContainer.value, {
        viewMode: '3D',
        zoom: 11,
        center: [118.600362, 24.901652], // Quanzhou, Fujian
      });

      map.value.add(new AMap.Scale());
      map.value.add(new AMap.ToolBar());
      map.value.add(new AMap.ControlBar());

      // Add Mock Markers
      mapMarkers.forEach((item) => {
        const marker = new AMap.Marker({
          position: new AMap.LngLat(item.lng, item.lat),
          title: item.title,
        });
        map.value.add(marker);
        
        marker.on('click', () => {
          message.info(`点击了设备：${item.title}`);
        });
      });

    })
    .catch((e) => {
      console.error(e);
      message.error('地图加载失败，请检查Key配置');
    });
};

onMounted(() => {
  initMap();
});

onUnmounted(() => {
  if (map.value) {
    map.value.destroy();
  }
});
</script>

<template>
  <div class="flex h-full p-4 gap-4">
    <!-- Left Sidebar -->
    <div class="w-[300px] flex-shrink-0">
      <DeviceTree />
    </div>

    <!-- Right Map Area -->
    <div class="flex-1 flex flex-col bg-white rounded-xl shadow-sm dark:bg-black/85 relative overflow-hidden">
      <!-- Toolbar Overlay -->
      <div class="absolute top-2 left-2 z-10 bg-white/90 p-2 rounded shadow-sm dark:bg-black/90 backdrop-blur-sm">
        <Space>
          <Button type="primary">定位</Button>
          <Button>清除坐标</Button>
          <Input placeholder="请输入关键字，并按回车" class="w-[200px]" />
          <Button type="primary">搜索</Button>
          <Button type="primary">查地图中心坐标</Button>
          <Button>清空</Button>
        </Space>
      </div>

      <!-- Map Container -->
      <div ref="mapContainer" class="flex-1 w-full h-full bg-gray-100 dark:bg-gray-800"></div>
      
      <!-- Footer Info -->
      <div class="absolute bottom-0 left-0 right-0 bg-white/80 p-1 text-xs text-gray-500 px-2 dark:bg-black/80 z-10">
        GS (2025) 1506号 - 甲测资字11110974
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.amap-logo),
:deep(.amap-copyright) {
    display: none !important;
}
</style>
