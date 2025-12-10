<script setup>
import { onMounted, ref } from 'vue';
import ChatAssistant from './ChatAssistant.vue';

import MapApi from '../api/MapApi';
import CarApi from '../api/CarApi';
import SceneApi from '../api/SceneApi';
import { getVideoPathByButtonId, getDefaultButtonId, DEFAULT_VIDEO_CONFIG } from '../config/videoConfig';

const videoLoaded = ref(false);
const videoRef = ref(null);
const currentVideoSrc = ref(DEFAULT_VIDEO_CONFIG.defaultVideoPath);

const style_opacity = {
  version: 8,
  sources: {},
  layers: [
    {
      id: 'land',
      type: 'background',
      paint: {
        'background-color': {
          stops: [
            [15, 'rgba(9, 30, 55, 0.6)'],
            [16, 'rgba(9, 30, 55, 0.6)'],
          ],
        },
      },
    },
  ],
};

/**
 * 规范化视频地址
 * 支持多种格式：
 * 1. 本地路径：/bigscreen.mp4, ./bigscreen.mp4, bigscreen.mp4
 * 2. 远程URL：https://example.com/video.mp4, http://example.com/video.mp4
 * 3. 相对路径：/assets/videos/video.mp4
 * @param {string} path - 视频路径
 * @returns {string} 规范化后的路径
 */
function normalizeVideoPath(path) {
  if (!path) {
    return DEFAULT_VIDEO_CONFIG.defaultVideoPath;
  }
  
  // 如果是完整的URL（http:// 或 https://），直接返回
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // 如果以 / 开头，保持原样（Vite会从public目录或根目录查找）
  if (path.startsWith('/')) {
    return path;
  }
  
  // 如果以 ./ 开头，去掉 ./ 并添加 /
  if (path.startsWith('./')) {
    return '/' + path.substring(2);
  }
  
  // 其他情况，添加 / 前缀
  return '/' + path;
}

/**
 * 切换视频
 * @param {string} buttonId - 按钮ID
 */
function switchVideo(buttonId) {
  if (!buttonId) {
    return;
  }
  
  const videoPath = getVideoPathByButtonId(buttonId);
  const normalizedPath = normalizeVideoPath(videoPath);
  
  if (videoRef.value) {
    // 重置加载状态
    videoLoaded.value = false;
    
    // 更新视频源
    currentVideoSrc.value = normalizedPath;
    videoRef.value.src = normalizedPath;
    
    // 重新加载视频
    videoRef.value.load();
  }
}

const props = defineProps({
  showAssistant: {
    type: Boolean,
    default: true
  }
});

onMounted(() => {
  // 视频加载处理
  if (videoRef.value) {
    // 设置初始视频源
    const defaultPath = normalizeVideoPath(DEFAULT_VIDEO_CONFIG.defaultVideoPath);
    currentVideoSrc.value = defaultPath;
    videoRef.value.src = defaultPath;
    
    videoRef.value.addEventListener('loadeddata', () => {
      videoLoaded.value = true;
    });
    videoRef.value.addEventListener('canplay', () => {
      videoLoaded.value = true;
    });
    videoRef.value.addEventListener('error', () => {
      console.error('视频加载失败:', currentVideoSrc.value);
      // 加载失败时，可以尝试使用默认视频
      if (currentVideoSrc.value !== normalizeVideoPath(DEFAULT_VIDEO_CONFIG.defaultVideoPath)) {
        const defaultPath = normalizeVideoPath(DEFAULT_VIDEO_CONFIG.defaultVideoPath);
        currentVideoSrc.value = defaultPath;
        videoRef.value.src = defaultPath;
        videoRef.value.load();
      }
    });
  }
  
  // 将切换视频的方法暴露到全局，供其他组件调用
  window.switchVideo = switchVideo;

  // 地图初始化
  let map = new mapmost.Map({
    container: 'map-container',
    style: style_opacity,
    doubleClickZoom: false,
    center: [120.72929672369003, 31.288619767132104],
    zoom: 17.88998700147244,
    sky: 'light',
    pitch: 64.42598133276567,
    bearing: -37.87271910936988,
    userId: '***', // 请输入您获取的授权码
    env3D: {
      defaultLights: false,
      envMap: './assets/hdr/yun(17).hdr',
      exposure: 2.64,
    },
  });

  window.THREE = mapmost.THREE; //Three.js接口
  let modelLayer;
  map.on('load', function () {

    // 园区模型
    let models_obj = [
      {
        type: 'glb',
        url: './assets/models/yq.mm',
        decryptWasm:
          'https://delivery.mapmost.com/cdn/b3dm_codec/0.0.2-alpha/sdk_b3dm_codec_wasm_bg_opt.wasm',
      },
    ];

    // 图层参数
    let options = {
      id: 'model_id1',
      models: models_obj,
      outline: true, // 允许轮廓高亮
      type: 'model',
      funcRender: function (gl, matrix) {
        if (modelLayer) {
          modelLayer.renderMarker(gl, matrix);
        }
      },
      center: [120.73014920373011, 31.287414975761724, 0.1],
      callback: function (group, layer) {
        layer.onAfterRender(group).then(function () {
          document.getElementById('loading').style.display='none'
        })
        modelLayer = layer;
        // 初始化场景
        new SceneApi(map, layer, group);

        // 道路行驶车辆
        let car = new CarApi(map);
        car.initCar();
        let count = 0;
        setInterval(function () {
          //每隔6秒放一次车，放5次
          if (count < 5) {
            car.initCar();
            count++;
          }
        }, 10000);
        // 获取MapApi接口
        window.mapApi = new MapApi(map, layer, group);
      },
    };
    // 添加模型
    map.addLayer(options);
  });
  window.map = map;
});
</script>
<template>
  <div class="map-container" id="map-container"></div>
  <div class="loading" id="loading">
    <div v-if="!videoLoaded" class="loading-text">Loading…</div>
    <video
      ref="videoRef"
      class="loading-video"
      :class="{ 'video-visible': videoLoaded }"
      :src="currentVideoSrc"
      autoplay
      muted
      loop
      playsinline
    ></video>
  </div>
  <ChatAssistant v-if="showAssistant" />
</template>

<style lang="scss" scoped>
.map-container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.loading {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading-text {
  font-size: 36px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 20px;
}

.loading-video {
  max-width: 100%;
  max-height: 100vh;
  display: block;
  opacity: 0;
  transition: opacity 0.3s;
}

.loading-video.video-visible {
  opacity: 1;
}

/* 聊天对话框样式已抽离到 ChatAssistant.vue */
</style>
