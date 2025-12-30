<script lang="ts" setup>
import { ref, nextTick, computed } from 'vue';
import { Input, Button, Avatar, Spin, message } from 'ant-design-vue';
import { IconifyIcon } from '@vben/icons';
import { useUserStore } from '@vben/stores';

const userStore = useUserStore();
const userAvatar = computed(() => userStore.userInfo?.avatar || '');

// --- Chat Logic ---
const inputValue = ref('');
const loading = ref(false);
const messagesContainer = ref<HTMLElement | null>(null);

const messages = ref<Array<{ type: 'user' | 'ai'; content: string; time: string }>>([
  {
    type: 'ai',
    content: '你好！我是您的智能水务分析助手。我可以帮您分析水质、水位趋势、设备状态等。请告诉我您想了解的内容。',
    time: new Date().toLocaleTimeString(),
  },
]);

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const handleSend = () => {
  if (!inputValue.value.trim() || loading.value) return;

  const userMessage = inputValue.value;
  messages.value.push({
    type: 'user',
    content: userMessage,
    time: new Date().toLocaleTimeString(),
  });

  inputValue.value = '';
  loading.value = true;
  scrollToBottom();

  // Keyword Analysis & Image Generation
  // analyzeKeywords(userMessage); // Moved inside typeMessage callback to delay image generation

  // Simulate AI Response
  setTimeout(async () => {
    loading.value = false;
    let aiResponse = '';
    let targetImageIndex = -1;

    const action = quickActions.find(a => a.message === userMessage);
    if (action) {
      aiResponse = action.response;
      targetImageIndex = action.imageIndex;
    } else if (userMessage.includes('水质')) {
      aiResponse = '【智能水质分析】\n\n根据最新多参数监测数据，当前区域水质状况评级为：优（Grade I）。\n\n各项核心指标实时读数如下：\n- 溶解氧 (DO)：7.5 mg/L（正常）\n- pH值：7.2（中性偏弱碱，理想）\n- 浊度：2.1 NTU（清澈）\n\n综合评价：水体自净能力强，生态环境保持良好，未发现任何异常排污迹象。左侧已为您生成详细的光谱分析影像。';
      targetImageIndex = 0;
    } else if (userMessage.includes('水位') || userMessage.includes('趋势')) {
      aiResponse = '【水位趋势研判】\n\n监测数据显示，过去24小时内，受上游降雨及调蓄影响，水位呈现“先升后稳”的趋势。\n\n关键数据：\n- 当前水位：18.52米\n- 距警戒水位：尚余3.48米\n- 变化速率：+0.01米/小时（缓慢）\n\n预测：基于水文模型推演，未来6小时水位将维持在18.50-18.55米区间震荡，无超警风险。建议维持常规巡查频次。左侧已为您展示水位变化趋势图。';
      targetImageIndex = 2;
    } else if (userMessage.includes('设备')) {
      aiResponse = '【设备健康诊断】\n\n全网设备巡检完成，当前设备在线率为98.5%。\n\n异常通报：\n- 发现3台边缘采集终端（编号：IOT-092, IOT-093, IOT-095）信号不稳定，疑似受雷雨天气干扰。\n- 其余核心泵站、闸门控制器及水质监测浮标均运行正常。\n\n处置建议：系统已自动下发重启指令尝试恢复，建议运维人员密切关注后续信号质量。左侧已列出关键设备运行拓扑图。';
      targetImageIndex = 4;
    } else if (userMessage.includes('分析') || userMessage.includes('报告')) {
      aiResponse = '【综合态势感知报告】\n\n正在为您生成本周水务综合运行分析报告...\n\n报告摘要：\n1. 水质方面：整体达标率100%，III类及以上水体占比提升至95%。\n2. 水量调度：本周累计调水量500万方，有效保障了下游灌溉及生态用水。\n3. 设施运维：完成例行巡检12次，处理设备隐患2处。\n\n详细报告已生成，包含水质光谱图、水位过程线及设备状态表。左侧为您展示综合分析概览。';
    } else {
      aiResponse = `收到您的指令：“${userMessage}”。\n\n正在调用Water-AI v2.0模型进行全域数据检索与关联分析...\n\n分析进度：\n- 语义理解：完成\n- 数据匹配：找到相关记录 15 条\n- 趋势预测：正在计算...\n\n初步结论：根据现有数据，该指令涉及的区域目前运行平稳。左侧已为您生成最匹配的监测影像，请结合影像进行研判。`;
      targetImageIndex = 0;
    }

    await typeMessage(aiResponse, targetImageIndex);
  }, 1500);
};

const quickActions = [
  { 
    label: '控制站状态', 
    message: '查询当前控制站运行状态', 
    imageIndex: 0, 
    response: '【控制站运行监测】\n\n当前“鱼岭”控制站实时监测数据如下：\n- 实时流量：1000 m³/s（最大流量 5000 m³/s）\n- 实时水位：60 m\n- 警戒水位：60 m\n- 保证水位：65 m\n\n分析：当前水位已触及警戒水位（60m），但流量仍处于可控范围。建议密切关注上游来水情况，做好调度准备。左侧已为您展示控制站详细状态图。' 
  },
  { 
    label: '淹没总览', 
    message: '生成淹没模拟分析报告', 
    imageIndex: 1, 
    response: '【淹没模拟信息总览】\n\n基于当前水情推演的淹没影响评估：\n- 影响范围：河段长度 10 km，涉及北坪村、鱼岭村。\n- 淹没深度：超土地线 1 m，超移民线 1.6 m。\n- 淹没历时：预计持续 6 小时。\n\n综合影响：预计影响人口 2000 人，土地 100 亩，房屋 2000 m²。左侧已生成淹没信息总览图。' 
  },
  { 
    label: '社会指标', 
    message: '查看社会影响指标总览', 
    imageIndex: 2, 
    response: '【社会指标影响总览】\n\n本次淹没模拟对社会指标的综合影响如下：\n- 受影响人口：2000 个\n- 受淹没土地：100 亩\n- 受损房屋：2000 m²\n\n分析：人口与房屋影响较大，主要集中在沿河低洼地带。建议优先保障人员撤离，并评估房屋结构安全。左侧已展示社会指标影响概览图。' 
  },
  { 
    label: '人口影响', 
    message: '分析受淹没影响人口结构', 
    imageIndex: 3, 
    response: '【受灾人口结构分析】\n\n本次模拟淹没共计影响人口 2000 人。结构分布如下：\n- 城镇人口：1300 人\n- 农村人口： 700 人\n\n建议：重点关注城镇密集区域的疏散通道畅通情况，并为农村地区提供必要的应急转移支援。左侧已展示受灾人口统计图表。' 
  },
  { 
    label: '土地影响', 
    message: '统计受淹没土地类型及面积', 
    imageIndex: 4, 
    response: '【受灾土地类型统计】\n\n本次模拟淹没影响土地总面积 100 亩。各类土地受损明细：\n- 耕地：30 亩\n- 园地：29 亩\n- 林地：24 亩\n- 草地：17 亩\n\n评估：耕地与园地受损较重，建议农业部门提前介入评估农业经济损失。左侧已展示土地影响分类统计图。' 
  },
  { 
    label: '房屋受损', 
    message: '评估房屋受损情况', 
    imageIndex: 5, 
    response: '【房屋受损评估报告】\n\n根据淹没模型计算，预计受损房屋面积达 2000 m²。\n\n重点区域：\n- 鱼岭村沿河低洼地带房屋风险最高。\n- 北坪村部分老旧土坯房需重点排查倒塌风险。\n\n建议：建议立即启动房屋安全应急预案，组织人员转移安置。左侧为您展示房屋受损分布详细数据。' 
  },
];

const typeMessage = (text: string, imageIndex: number = -1) => {
  return new Promise<void>((resolve) => {
    messages.value.push({
      type: 'ai',
      content: '',
      time: new Date().toLocaleTimeString(),
    });

    const currentMessage = messages.value[messages.value.length - 1];
    let i = 0;
    let imageShown = false;
    const type = () => {
      if (i < text.length && currentMessage) {
        currentMessage.content += text.charAt(i);
        i++;
        scrollToBottom();
        
        // Show image after about 30 characters (simulating analysis complete)
        if (!imageShown && i > 30 && imageIndex !== -1) {
           imageShown = true;
           isGeneratingImages.value = true;
           currentImages.value = [];
           setTimeout(() => {
             currentImages.value = [allImages[imageIndex]!];
             isGeneratingImages.value = false;
           }, 800);
        }

        setTimeout(type, 30);
      } else {
        // Fallback: ensure image is shown if text is short
        if (!imageShown && imageIndex !== -1) {
           isGeneratingImages.value = true;
           currentImages.value = [];
           setTimeout(() => {
             currentImages.value = [allImages[imageIndex]!];
             isGeneratingImages.value = false;
           }, 800);
        }
        resolve();
      }
    };
    type();
  });
};

// --- Image Logic ---
const allImages = [
  '/aimg-01.png',
  '/aimg-02.png',
  '/aimg-03.png',
  '/aimg-04.png',
  '/aimg-05.png',
  '/aimg-06.png',
];

const currentImages = ref<string[]>([]);
const isGeneratingImages = ref(false);

const analyzeKeywords = (text: string) => {
  isGeneratingImages.value = true;
  currentImages.value = []; // Clear current images

  setTimeout(() => {
    const action = quickActions.find(a => a.message === text);
    if (action) {
       currentImages.value = [allImages[action.imageIndex]!];
    } else if (text.includes('水质')) {
      currentImages.value = [allImages[0]!];
    } else if (text.includes('水位') || text.includes('趋势')) {
      currentImages.value = [allImages[2]!];
    } else if (text.includes('设备')) {
      currentImages.value = [allImages[4]!];
    } else {
      // Default
      currentImages.value = [allImages[0]!];
    }
    isGeneratingImages.value = false;
  }, 1000); // Simulate generation delay
};

// --- Export Logic ---
const isExporting = ref(false);
const handleExport = () => {
  if (currentImages.value.length === 0) {
    message.warning('当前没有可导出的影像');
    return;
  }
  isExporting.value = true;
  setTimeout(() => {
    isExporting.value = false;
    message.success('影像及分析报告已成功导出至本地');
  }, 2000);
};

const handleEnter = (e: KeyboardEvent) => {
  if (!e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
};
</script>

<template>
  <div class="flex flex-col md:flex-row gap-4 h-[400px] w-full">
    <!-- Left Panel: Image Gallery -->
    <div class="w-full md:w-1/3 bg-white dark:bg-[#1f1f1f] rounded-xl shadow p-4 flex flex-col relative overflow-hidden transition-all duration-300">
      <div class="flex items-center justify-between mb-2">
        <h3 class="font-bold text-lg m-0 flex items-center gap-2">
          <IconifyIcon icon="ion:images-outline" class="text-blue-500" />
          智能影像生成
        </h3>
        <Button size="small" type="dashed" @click="handleExport" :loading="isExporting" :disabled="currentImages.length === 0">
          {{ isExporting ? '导出中...' : '导出影像' }}
        </Button>
      </div>

      <div class="flex-1 overflow-hidden relative flex items-center justify-center bg-gray-50 dark:bg-black/20 rounded-lg">
        <!-- Empty State -->
        <div v-if="currentImages.length === 0 && !isGeneratingImages" class="flex flex-col items-center justify-center text-gray-400">
          <IconifyIcon icon="ion:image-outline" class="text-6xl mb-2 opacity-50" />
          <p>暂无影像</p>
        </div>

        <!-- Loading State -->
        <div v-if="isGeneratingImages" class="flex flex-col items-center justify-center">
          <Spin size="large" />
          <p class="mt-4 text-blue-500 animate-pulse">AI 正在检索并生成相关影像...</p>
        </div>

        <!-- Single Image Display -->
        <div v-else-if="currentImages.length > 0" class="w-full h-full relative group">
           <img :src="currentImages[0]" class="w-full h-full object-contain" alt="Analysis Result" />
           <!-- Overlay -->
           <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button type="primary" shape="circle" size="large">
                <template #icon><IconifyIcon icon="ion:download-outline" /></template>
              </Button>
           </div>
        </div>
      </div>

      <!-- Export Animation Overlay -->
      <div v-if="isExporting" class="absolute inset-0 z-50 bg-white/80 dark:bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm">
        <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h3 class="text-blue-600 font-bold text-lg animate-pulse">正在打包导出...</h3>
        <p class="text-gray-500 text-sm">正在处理 {{ currentImages.length }} 张影像</p>
      </div>
    </div>

    <!-- Right Panel: AI Chat -->
    <div class="w-full md:w-2/3 bg-white dark:bg-[#1f1f1f] rounded-xl shadow flex flex-col overflow-hidden">
      <!-- Header -->
      <div class="p-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <Avatar class="bg-gradient-to-r from-blue-500 to-indigo-500">
            <template #icon><IconifyIcon icon="ion:sparkles" /></template>
          </Avatar>
          <div>
            <h3 class="font-bold text-base m-0 text-gray-800 dark:text-white">智能分析助手</h3>
            <p class="text-xs text-gray-500 m-0">Powered by Water-AI Model v2.0</p>
          </div>
        </div>
        <div class="flex gap-2">
           <span class="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full flex items-center gap-1">
             <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> 在线
           </span>
        </div>
      </div>

      <!-- Messages -->
      <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-[#141414]">
        <div v-for="(msg, index) in messages" :key="index" class="flex w-full" :class="msg.type === 'user' ? 'justify-end' : 'justify-start'">
          <div class="flex max-w-[85%] gap-3" :class="msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'">
            <Avatar v-if="msg.type === 'user'" :src="userAvatar" class="bg-blue-600 flex-shrink-0">
               <template #icon><IconifyIcon icon="ion:person" /></template>
            </Avatar>
            <Avatar v-else class="bg-indigo-600 flex-shrink-0">
               <template #icon><IconifyIcon icon="ion:sparkles" /></template>
            </Avatar>

            <div class="flex flex-col" :class="msg.type === 'user' ? 'items-end' : 'items-start'">
              <span class="text-xs text-gray-400 mb-1 mx-1">{{ msg.time }}</span>
              <div class="p-3 rounded-2xl text-sm shadow-sm leading-relaxed whitespace-pre-wrap" 
                   :class="msg.type === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white dark:bg-[#2a2a2a] text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-gray-700'">
                {{ msg.content }}
              </div>
            </div>
          </div>
        </div>

        <div v-if="loading" class="flex justify-start w-full animate-pulse">
           <div class="flex gap-3">
             <Avatar class="bg-indigo-600 flex-shrink-0"><template #icon><IconifyIcon icon="ion:sparkles" /></template></Avatar>
             <div class="bg-white dark:bg-[#2a2a2a] p-3 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-700 flex items-center gap-2">
               <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0s"></div>
               <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
               <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
             </div>
           </div>
        </div>
      </div>

      <!-- Input -->
      <div class="p-4 bg-white dark:bg-[#1f1f1f] border-t border-gray-100 dark:border-gray-800">
        <div class="flex gap-2 relative">
          <Input.TextArea
            v-model:value="inputValue"
            placeholder="输入关键词进行分析，例如：水质、水位、设备..."
            :auto-size="{ minRows: 1, maxRows: 3 }"
            class="!resize-none !rounded-xl !pr-12 !border-gray-200 dark:!border-gray-700 focus:!border-blue-500 !shadow-none"
            @keydown.enter="handleEnter"
          />
          <Button type="primary" shape="circle" class="absolute right-2 bottom-0 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 border-0" 
            :loading="loading" @click="handleSend">
            <template #icon><IconifyIcon icon="ion:paper-plane" /></template>
          </Button>
        </div>
        <div class="mt-2 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
           <span v-for="action in quickActions" :key="action.label" 
                 class="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition-colors whitespace-nowrap"
                 @click="inputValue = action.message; handleSend()">
             {{ action.label }}
           </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 2px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #374151;
}
</style>
