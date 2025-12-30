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
  analyzeKeywords(userMessage);

  // Simulate AI Response
  setTimeout(async () => {
    loading.value = false;
    let aiResponse = '';

    const action = quickActions.find(a => a.message === userMessage);
    if (action) {
      aiResponse = action.response;
    } else if (userMessage.includes('水质')) {
      aiResponse = '【智能水质分析】\n\n根据最新多参数监测数据，当前区域水质状况评级为：优（Grade I）。\n\n各项核心指标实时读数如下：\n- 溶解氧 (DO)：7.5 mg/L（正常）\n- pH值：7.2（中性偏弱碱，理想）\n- 浊度：2.1 NTU（清澈）\n\n综合评价：水体自净能力强，生态环境保持良好，未发现任何异常排污迹象。左侧已为您生成详细的光谱分析影像。';
    } else if (userMessage.includes('水位') || userMessage.includes('趋势')) {
      aiResponse = '【水位趋势研判】\n\n监测数据显示，过去24小时内，受上游降雨及调蓄影响，水位呈现“先升后稳”的趋势。\n\n关键数据：\n- 当前水位：18.52米\n- 距警戒水位：尚余3.48米\n- 变化速率：+0.01米/小时（缓慢）\n\n预测：基于水文模型推演，未来6小时水位将维持在18.50-18.55米区间震荡，无超警风险。建议维持常规巡查频次。左侧已为您展示水位变化趋势图。';
    } else if (userMessage.includes('设备')) {
      aiResponse = '【设备健康诊断】\n\n全网设备巡检完成，当前设备在线率为98.5%。\n\n异常通报：\n- 发现3台边缘采集终端（编号：IOT-092, IOT-093, IOT-095）信号不稳定，疑似受雷雨天气干扰。\n- 其余核心泵站、闸门控制器及水质监测浮标均运行正常。\n\n处置建议：系统已自动下发重启指令尝试恢复，建议运维人员密切关注后续信号质量。左侧已列出关键设备运行拓扑图。';
    } else if (userMessage.includes('分析') || userMessage.includes('报告')) {
      aiResponse = '【综合态势感知报告】\n\n正在为您生成本周水务综合运行分析报告...\n\n报告摘要：\n1. 水质方面：整体达标率100%，III类及以上水体占比提升至95%。\n2. 水量调度：本周累计调水量500万方，有效保障了下游灌溉及生态用水。\n3. 设施运维：完成例行巡检12次，处理设备隐患2处。\n\n详细报告已生成，包含水质光谱图、水位过程线及设备状态表。左侧为您展示综合分析概览。';
    } else {
      aiResponse = `收到您的指令：“${userMessage}”。\n\n正在调用Water-AI v2.0模型进行全域数据检索与关联分析...\n\n分析进度：\n- 语义理解：完成\n- 数据匹配：找到相关记录 15 条\n- 趋势预测：正在计算...\n\n初步结论：根据现有数据，该指令涉及的区域目前运行平稳。左侧已为您生成最匹配的监测影像，请结合影像进行研判。`;
    }

    await typeMessage(aiResponse);
  }, 1500);
};

const quickActions = [
  { 
    label: '水质监测', 
    message: '请展示当前水质监测情况', 
    imageIndex: 0, 
    response: '【水质监测报告 2024-05-20】\n\n根据最新实时监测数据分析，该区域水质状况整体保持优良。具体指标如下：\n1. 溶解氧 (DO)：7.2 mg/L，处于非常健康水平，利于水生生物存活。\n2. 化学需氧量 (COD)：15 mg/L，远低于国家III类水标准。\n3. 氨氮含量：0.4 mg/L，较上月下降0.1 mg/L。\n\n结论：未发现异常污染物排放，水生态系统运行稳定。左侧已为您生成详细的水质光谱监测影像，请查阅。' 
  },
  { 
    label: '污染源追踪', 
    message: '分析一下潜在的污染源分布', 
    imageIndex: 1, 
    response: '【污染源追踪与溯源分析】\n\n系统通过多光谱影像对比与AI算法分析，已完成全流域污染源排查。结果如下：\n1. 潜在风险点：发现上游A区（坐标：E114.32, N30.58）存在微量异常排放迹象，疑似为初期雨水径流携带的面源污染。\n2. 扩散路径：污染物随水流向东南方向扩散，预计扩散半径为1.5公里。\n\n建议：建议立即派遣无人机进行定点核查，并加强对上游A区周边排水口的监管力度。左侧为您展示污染源热力分布图。' 
  },
  { 
    label: '实时水位', 
    message: '查看今日实时水位变化趋势', 
    imageIndex: 2, 
    response: '【实时水位动态简报】\n\n截至今日16:00，核心监测点水位情况如下：\n- 当前水位：24.56米\n- 警戒水位：28.00米\n- 历史最高：29.12米\n\n趋势分析：过去24小时内，受上游调水影响，水位呈现“缓慢爬升后趋于平稳”的态势，平均每小时上涨0.02米，目前已稳定在安全区间。预计未来12小时水位将维持在24.50-24.60米之间波动。左侧已为您绘制今日水位精细变化趋势图。' 
  },
  { 
    label: '洪涝预警', 
    message: '生成未来24小时洪涝风险预警', 
    imageIndex: 3, 
    response: '【未来24小时洪涝风险预警】\n\n基于气象卫星数据与水文模型综合研判：\n1. 降雨预测：预计未来24小时流域内将有中到大雨，局部暴雨，累计降雨量可能达到50-80mm。\n2. 积水风险：低洼地区（特别是B区和D区）存在轻度积水风险，积水深度预计在10-20cm。\n3. 河道行洪：河道行洪能力充足，但需警惕城市内涝对排水管网的压力。\n\n预警级别：黄色预警（低风险）。建议提前疏通排水管网，做好防汛准备。左侧已生成洪涝风险模拟演练影像。' 
  },
  { 
    label: '设备概览', 
    message: '汇报关键设备运行状态', 
    imageIndex: 4, 
    response: '【关键设备运行健康度报告】\n\n系统已完成对全网108台关键设备的巡检扫描，整体健康度评分：96分。\n1. 运行正常：105台设备各项参数指标均在正常阈值内。\n2. 异常预警：3号泵站的2号机组检测到振动频率轻微异常（偏离度5%），建议在下次例行维护时重点检查轴承磨损情况。\n3. 离线设备：无关键节点离线。\n\n结论：整个监控网络运行稳健，数据传输链路畅通。左侧为您展示关键设备拓扑与状态分布图。' 
  },
  { 
    label: '能耗分析', 
    message: '统计本月全网能耗数据', 
    imageIndex: 5, 
    response: '【月度能耗统计与节能分析】\n\n本月（截至今日）全网设备总能耗统计如下：\n- 总耗电量：12,450 kWh\n- 环比上月：下降 5.2%\n- 同比去年：下降 8.1%\n\n节能成效分析：得益于上周实施的“智能错峰运行策略”，在夜间低流量时段自动降低了泵站功率，有效减少了无效能耗。预计全年可节省电费约5万元。左侧为您展示本月能耗构成及趋势分析图表。' 
  },
];

const typeMessage = (text: string) => {
  return new Promise<void>((resolve) => {
    messages.value.push({
      type: 'ai',
      content: '',
      time: new Date().toLocaleTimeString(),
    });

    const currentMessage = messages.value[messages.value.length - 1];
    let i = 0;
    const type = () => {
      if (i < text.length && currentMessage) {
        currentMessage.content += text.charAt(i);
        i++;
        scrollToBottom();
        setTimeout(type, 30);
      } else {
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
              <div class="p-3 rounded-2xl text-sm shadow-sm leading-relaxed" 
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
          <Button type="primary" shape="circle" class="absolute right-2 bottom-1.5 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 border-0" 
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
