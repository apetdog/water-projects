<script setup>
  import LeftTopPopulationPanel from "../components/LeftTopPopulationPanel.vue";
  import LeftCenterFlowPanel from "../components/LeftCenterFlowPanel.vue";
  import LeftBottomEventTimeline from "../components/LeftBottomEventTimeline.vue";
  import { PANEL_CONFIG } from "../config/panelConfig.js";
</script>
<template>
  <div class="ly-left">
    <div class="ly-left-plane ly-left-top">
      <div class="top-bg">
        <div class="title">{{ PANEL_CONFIG.topContent.title }}</div>
        <div class="top-content"><LeftTopPopulationPanel /></div>
      </div>
    </div>
    <div class="ly-left-plane ly-left-center">
      <div class="center-bg">
        <div class="title">{{ PANEL_CONFIG.leftCenter.title }}</div>
        <div class="center-content"><LeftCenterFlowPanel /></div>
      </div>
    </div>
    <div class="ly-left-plane ly-left-bottom">
      <div class="bottom-bg">
        <div class="title">{{ PANEL_CONFIG.leftBottom.title }}</div>
        <div class="bottom-content"><LeftBottomEventTimeline /></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .ly-left {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    width: 25vw;
    // min-width: 400px;
    pointer-events: all;
    height: 84vh;
  }

  .ly-left-plane {
    position: relative;
    // min-width: 400px;
    height: 28vh;
    margin: 10px;
    background-image: -webkit-linear-gradient(
      right,
      rgba(4, 20, 37, 0.6),
      rgba(4, 20, 37, 0.4)
    );
    background-image: linear-gradient(
      -90deg,
      rgba(4, 20, 37, 0.6),
      rgba(4, 20, 37, 0.4)
    );
  }
  .title {
    position: absolute;
    top: 0.8vh;
    left: 2vw;
    font-size: 1vw;
    font-weight: bold;
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    background-image: linear-gradient(to top, rgb(240, 160, 10) 45%, #fff 80%);
  }

  .top-bg {
    position: relative;
    width: 100%;
    height: 100%;
    // background: url(../assets/images/demographic_data.png) no-repeat;
    background: url(../assets/icons/pure-bg.png) no-repeat;
    background-size: 100% 100%;
  }

  .top-content {
    position: relative;
  }

  .center-bg {
    position: relative;
    width: 100%;
    height: 100%;
    // background: url(../assets/images/driving_violation.png) no-repeat;
    background: url(../assets/icons/pure-bg.png) no-repeat;
    background-size: 100% 100%;
  }

  .center-content {
    position: relative;
  }

  .bottom-bg {
    position: relative;
    width: 100%;
    height: 100%;
    // background: url(../assets/images/event_info.png) no-repeat;
    background: url(../assets/icons/pure-bg.png) no-repeat;
    background-size: 100% 100%;
  }

  .bottom-content {
    position: relative;
  }
</style>
