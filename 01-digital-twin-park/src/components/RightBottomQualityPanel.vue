<script setup>
  import { getModuleConfig } from "../config/panelConfig.js";

  // 从配置文件获取数据
  const config = getModuleConfig("rightBottom");
  const corners = config.corners;
  
  const lt = corners.lt;
  const lb = corners.lb;
  const rt = corners.rt;
  const rb = corners.rb;
</script>

<template>
  <div class="quality-panel">
    <div class="corner lt">
      <div 
        class="days"
        :style="{
          color: lt.textColor.days,
          fontSize: lt.textSize.days
        }">{{ lt.days }}{{ config.text.unit.days }}</div>
      <div 
        class="percent"
        :style="{
          color: lt.textColor.percent,
          fontSize: lt.textSize.percent
        }">{{ lt.percent }}<span 
          class="unit"
          :style="{
            color: lt.textColor.unit,
            fontSize: lt.textSize.unit
          }">{{ config.text.unit.percent }}</span></div>
    </div>
    <div class="corner lb">
      <div 
        class="days"
        :style="{
          color: lb.textColor.days,
          fontSize: lb.textSize.days
        }">{{ lb.days }}{{ config.text.unit.days }}</div>
      <div 
        class="percent"
        :style="{
          color: lb.textColor.percent,
          fontSize: lb.textSize.percent
        }">{{ lb.percent }}<span 
          class="unit"
          :style="{
            color: lb.textColor.unit,
            fontSize: lb.textSize.unit
          }">{{ config.text.unit.percent }}</span></div>
    </div>
    <div class="corner rt">
      <div 
        class="days"
        :style="{
          color: rt.textColor.days,
          fontSize: rt.textSize.days
        }">{{ rt.days }}{{ config.text.unit.days }}</div>
      <div 
        class="percent"
        :style="{
          color: rt.textColor.percent,
          fontSize: rt.textSize.percent
        }">{{ rt.percent }}<span 
          class="unit"
          :style="{
            color: rt.textColor.unit,
            fontSize: rt.textSize.unit
          }">{{ config.text.unit.percent }}</span></div>
    </div>
    <div class="corner rb">
      <div 
        class="days"
        :style="{
          color: rb.textColor.days,
          fontSize: rb.textSize.days
        }">{{ rb.days }}{{ config.text.unit.days }}</div>
      <div 
        class="percent"
        :style="{
          color: rb.textColor.percent,
          fontSize: rb.textSize.percent
        }">{{ rb.percent }}<span 
          class="unit"
          :style="{
            color: rb.textColor.unit,
            fontSize: rb.textSize.unit
          }">{{ config.text.unit.percent }}</span></div>
    </div>
    <div class="corner center"></div>
  </div>
</template>

<style lang="scss" scoped>
  .quality-panel {
    position: relative;
    width: 90%;
    height: 80%;
  }
  .corner {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 0.2vh;
    &.lt,
    &.lb {
      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 3px;
        background: url(../assets/icons/line-left.png) no-repeat;
        background-size: 100% 100%;
        z-index: -1;
      }
    }
    &.rt,
    &.rb {
      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 3px;
        background: url(../assets/icons/line-right.png) no-repeat;
        background-size: 100% 100%;
        z-index: -1;
      }
    }
  }
  .lt {
    left: 2vw;
    top: 0.8vw;
  }
  .lb {
    left: 2vw;
    bottom: 2.2vw;
  }
  .rt {
    right: 2vw;
    top: 0.8vw;
    align-items: flex-end;
  }
  .rb {
    right: 2vw;
    bottom: 2.2vw;
    align-items: flex-end;
  }
  .center {
    left: 48%;
    top: 46%;
    transform: translate(-50%, -50%);
    width: 36%;
    aspect-ratio: 1/1;
    background: url(../assets/icons/bottom-right-content-bg.png) no-repeat;
    background-size: 100% 100%;
  }
  .days {
    // 颜色和大小通过内联样式从配置读取
  }
  .percent {
    font-weight: 700;
    margin-top: -0.4vh;
    // 颜色和大小通过内联样式从配置读取
    .unit {
      margin-left: 0.1vw;
      // 颜色和大小通过内联样式从配置读取
    }
  }
</style>
