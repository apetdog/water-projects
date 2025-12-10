<script setup>
import { ref } from 'vue';
import LyTop from './layout/LyTop.vue';
import LyLeft from './layout/LyLeft.vue';
import LyRight from './layout/LyRight.vue';
import LyBottom from './layout/LyBottom.vue';
import Map from './components/Map.vue';

const currentTab = ref('childBtnOne'); // Default to first tab (Overview)
const handleSwitchTab = (id) => {
  currentTab.value = id;
};

// Assuming the water-twin-screen project is running on a specific port. 
// You might need to adjust the port if it's different.
const IFRAME_BASE = 'http://localhost:9002/water-twin-screen'; 
</script>

<template>
  <div class="container">
    <Map :showAssistant="currentTab === 'childBtnFour'"></Map>
    <div class="layout">
      <div class="layout_img">
        <ly-top></ly-top>
        
        <!-- Original Content (moved to 4th tab) -->
        <div class="center_wapper" v-if="currentTab === 'childBtnFour'">
          <ly-left></ly-left>
          <ly-right></ly-right>
        </div>

        <!-- Iframes for Tabs 1, 2, 3 -->
        <div class="iframe-wrapper" v-if="currentTab === 'childBtnOne' || currentTab === 'childBtnTwo' || currentTab === 'childBtnThree'">
          <iframe 
            v-if="currentTab === 'childBtnOne'" 
            :src="`${IFRAME_BASE}/page1?hideHeader=true`" 
            class="content-iframe"
          ></iframe>
          <iframe 
            v-if="currentTab === 'childBtnTwo'" 
            :src="`${IFRAME_BASE}/page2?hideHeader=true`" 
            class="content-iframe"
          ></iframe>
          <iframe 
            v-if="currentTab === 'childBtnThree'" 
            :src="`${IFRAME_BASE}/page3?hideHeader=true`" 
            class="content-iframe"
          ></iframe>
        </div>

        <ly-bottom @switchTab="handleSwitchTab"></ly-bottom>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.iframe-wrapper {
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  bottom: 100px;
  z-index: 20; /* Ensure it is clickable */
  pointer-events: auto;
}

.content-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.container {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .layout {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    pointer-events: none;
    background: url(./assets/images/pure-mask3.png) no-repeat;
    background-size: 110% 140%;
    background-position: center 50%;
  }

  .layout_img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;
    pointer-events: none;
    background: url(./assets/images/pure-mask.png) no-repeat;
    background-size: 100% 110%;
  }

  .center_wapper {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }
}
</style>
