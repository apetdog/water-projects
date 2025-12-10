<script setup>
import { computed } from "vue";
import { getModuleConfig } from "../config/panelConfig.js";

// 从配置文件获取数据
const config = getModuleConfig("rightTop");
const facilities = config.facilities;

// 左侧和右侧设施项（直接使用配置中的完整数据）
const leftItems = computed(() => {
  return facilities.slice(0, 3);
});

const rightItems = computed(() => {
  return facilities.slice(3, 6);
});

// 计算总数（如果配置中有指定值则使用配置值，否则自动计算）
const total = computed(() => {
  if (config.total.value !== null && config.total.value !== undefined) {
    return config.total.value;
  }
  return facilities.reduce((s, item) => s + item.value, 0);
});
</script>

<template>
  <div class="facilities-panel">
    <div class="column left">
      <div class="column-item" v-for="it in leftItems" :key="it.name">
        <div class="column-item-left">
          <span class="column-item-dot" :style="{ background: it.textColor.name }"></span>
          <div 
            class="column-item-name" 
            :style="{ 
              color: it.textColor.name,
              fontSize: it.textSize.name
            }">{{ it.name }}</div>
        </div>
        <div 
          class="column-item-value"
          :style="{
            color: it.textColor.value,
            fontSize: it.textSize.value
          }">{{ it.value.toLocaleString() }}<span 
            class="column-item-unit"
            :style="{
              color: it.textColor.unit,
              fontSize: it.textSize.unit
            }">{{ it.unit }}</span></div>
      </div>
    </div>
    <div class="column right">
      <div class="column-item" v-for="it in rightItems" :key="it.name">
        <div class="column-item-left">
          <span class="column-item-dot" :style="{ background: it.textColor.name }"></span>
          <div 
            class="column-item-name" 
            :style="{ 
              color: it.textColor.name,
              fontSize: it.textSize.name
            }">{{ it.name }}</div>
        </div>
        <div 
          class="column-item-value"
          :style="{
            color: it.textColor.value,
            fontSize: it.textSize.value
          }">{{ it.value.toLocaleString() }}<span 
            class="column-item-unit"
            :style="{
              color: it.textColor.unit,
              fontSize: it.textSize.unit
            }">{{ it.unit }}</span></div>
      </div>
    </div>
    <div class="total-box">
      <div class="total" :style="{ color: config.total.textColor, fontSize: config.total.textSize }">{{ total.toLocaleString() }}</div>
    </div>
  </div>
</template>

<style lang="scss"
  scoped>
  .facilities-panel {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .column {
    position: absolute;
    top: 0;
    width: 20%;
    padding: 0.2vw 0;
    display: flex;
    flex-direction: column;
    gap: 1.2vw;

    &.left {
      left: 0;
      padding-left: 0.4vw;

      .column-item {
        background: url(../assets/icons/column-item-left-border.png) no-repeat;
        background-size: 100% 100%;
      }
    }

    &.right {
      right: 0;
      padding-right: 2vw;

      .column-item {
        background: url(../assets/icons/column-item-right-border.png) no-repeat;
        background-size: 100% 100%;
      }
    }

    &-item {
      display: flex;
      flex-direction: column;
      padding: 0.2vw 0.4vw;

      &-left {
        display: flex;
        align-items: center;
      }

      &-dot {
        width: 0.6vw;
        height: 0.6vw;
        border-radius: 2px;
        margin-right: 0.2vw;
        margin-top: 0.1vh;
      }

      &-name {
        // 颜色和大小通过内联样式从配置读取
      }

      &-value {
        font-weight: 700;
        margin-top: -0.1vh;
        // 颜色和大小通过内联样式从配置读取
      }

      &-unit {
        margin-left: 0.2vw;
        font-weight: 400;
        // 颜色和大小通过内联样式从配置读取
      }
    }
  }

  .total-box {
    position: absolute;
    left: 48%;
    top: 1.2vh;
    transform: translateX(-50%);
    text-align: center;
    background: url(../assets/icons/top-right-content-bg.png) no-repeat;
    background-size: 100% 100%;
    width: 50%;
    height: 60%;

    .total {
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      bottom: 13%;
      font-weight: 800;
    }
  }
</style>