<script setup>
  import iconError from "../assets/icons/icon-error.png";
  import iconSuccess from "../assets/icons/icon-success.png";
  import iconWarn from "../assets/icons/icon-warn.png";
  import { getModuleConfig } from "../config/panelConfig.js";

  // 从配置文件获取数据
  const config = getModuleConfig("leftBottom");
  const events = config.events;
  const statusLabels = config.text.statusLabels;

  const statusIconMap = {
    pending: iconWarn,
    resolved: iconSuccess,
    expired: iconError,
  };

  const statusIcon = (s) => statusIconMap[s] || iconWarn;
  
  const getStatusLabel = (status) => {
    return statusLabels[status] || status;
  };
</script>

<template>
  <div class="event-timeline">
    <div class="timeline">
      <div
        class="event"
        v-for="(e, i) in events"
        :key="i">
        <div class="dot"></div>
        <div 
          class="event-time"
          :style="{
            color: e.textColor.time,
            fontSize: e.textSize.time
          }">{{ e.time }}</div>
        <div
          class="card"
          :class="e.status"
          :style="{
            backgroundImage: e.status === 'expired' 
              ? `linear-gradient(to right, ${e.statusStyle.bg}, rgba(79, 48, 50, 0)), linear-gradient(90deg, ${e.statusStyle.border}, rgba(249, 97, 104, 0))`
              : `linear-gradient(to right, ${e.statusStyle.bg}, rgba(37, 72, 80, 0)), linear-gradient(90deg, ${e.statusStyle.border}, rgba(130, 197, 200, 0))`
          }">
          <div class="card-left">
            <img
              class="status-icon"
              :src="statusIcon(e.status)" />
            <div class="card-main">
              <div 
                class="card-title"
                :style="{
                  color: e.textColor.title,
                  fontSize: e.textSize.title
                }">{{ e.title }}</div>
              <div 
                class="card-sub"
                :style="{
                  color: e.textColor.subtitle,
                  fontSize: e.textSize.subtitle
                }">
                <span class="state"
                  >{{ config.text.statusPrefix }}{{ getStatusLabel(e.status) }}</span
                >
                <span class="report">{{ config.text.reportTimePrefix }}{{ e.reportTime }}</span>
              </div>
            </div>
          </div>
          <button 
            class="card-action"
            :style="{
              color: e.textColor.action,
              fontSize: e.textSize.action
            }">{{ e.action }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .timeline {
    position: relative;
    padding: 6.6vh 0.8vw 0.6vh 2vw;
    margin-top: 2vh;
    display: flex;
    flex-direction: column;
    gap: 0.521vw;
  }

  .event {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: -0.72vw;
      top: 0.5vh;
      bottom: -1.25vh;
      width: 1px;
      background: rgba(255, 255, 255, 0.1);
    }
    &:last-child {
      &::before {
        bottom: 0.4vh;
      }
    }
  }

  .dot {
    position: absolute;
    left: -0.86vw;
    top: 0.25vw;
    width: 0.3vw;
    height: 0.3vw;
    border-radius: 50%;
    background: #ffffff;
  }

  .event-time {
    margin-bottom: 0.2vw;
    // 颜色和大小通过内联样式从配置读取
  }

  .card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.25vw 0.417vw;
    border-radius: 0.313vw;
    border: 1px solid transparent;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    // 背景色通过内联样式从配置读取
  }

  .card-left {
    display: flex;
    align-items: start;
    gap: 0.208vw;
  }

  .status-icon {
    width: 0.729vw;
    height: 0.729vw;
    object-fit: contain;
    margin-top: 0.104vw;
  }

  .card-main {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .card-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    // 颜色和大小通过内联样式从配置读取
  }

  .card-sub {
    margin-top: 0.104vw;
    // 颜色和大小通过内联样式从配置读取
  }

  .card-sub .report {
    margin-left: 1.2vw;
  }

  .card-action {
    width: 3.333vw;
    height: 1.667vw;
    background: transparent;
    border: none;
    background: url("../assets/icons/action-button.png") no-repeat;
    background-size: 100% 100%;
    flex: none;
    cursor: pointer;
    font-weight: 600;
    transition: ease-in-out 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    // 颜色和大小通过内联样式从配置读取

    &:hover,
    &:active {
      opacity: 0.9;
    }

    &:active {
      transform: scale(0.98);
    }
  }
</style>
