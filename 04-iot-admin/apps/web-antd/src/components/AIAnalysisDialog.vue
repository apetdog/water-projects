<script lang="ts" setup>
import { computed, ref, nextTick } from 'vue';
import { Modal, Input, Button, Avatar, Spin } from 'ant-design-vue';
import { IconifyIcon } from '@vben/icons';
import { useUserStore } from '@vben/stores';

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits(['update:visible', 'close']);

const userStore = useUserStore();
const inputValue = ref('');
const loading = ref(false);
const baseUrl = import.meta.env.BASE_URL;
const messages = ref<Array<{ type: 'user' | 'ai'; content: string; time: string; videos?: string[] }>>([
  {
    type: 'ai',
    content: '你好！我是您的智能分析助手。我可以帮您分析设备数据、生成报表或回答相关问题。请问有什么可以帮您？',
    time: new Date().toLocaleTimeString(),
  },
]);

const messagesContainer = ref<HTMLElement | null>(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const handleVideoLoad = () => {
  scrollToBottom();
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

  // Simulate AI response
  loading.value = true;
  scrollToBottom();

  setTimeout(() => {
    loading.value = false;
    let aiResponse = '';
    let aiVideos: string[] = [];
    
    if (userMessage.includes('预演')) {
      aiResponse = `经过深度思考与模型推演，基于当前的降雨量、水位监测数据以及上游泄洪情况，系统已构建高精度数字孪生场景。

当前模拟参数：
- 降雨强度：50mm/h (暴雨级别)
- 上游来水流量：1200m³/s
- 土壤饱和度：95%

正在启动全流域数字孪生预演，模拟未来 24 小时内的水情演变过程...`;
      aiVideos = [`${baseUrl}admin_ai_video_01.mp4`];
    } else if (userMessage.includes('洪涝')) {
      aiResponse = `经过综合分析，系统检测到多项关键指标已接近临界值。在无人工干预的自然演进模式下，预测未来 4 小时内出现洪涝灾害的概率超过 85%。

风险研判：
1. 低洼区域（A区、C区）预计积水深度将超过 0.5米。
2. 2号排水干渠排水能力将达到瓶颈。
3. 重点防护目标可能受到威胁。

以下是基于当前数据的洪涝灾害模拟演练视频...`;
      aiVideos = [`${baseUrl}admin_ai_video_03.mp4`];
    } else if (userMessage.includes('告警')) {
      aiResponse = `[告警分析报告]

根据最近24小时的监控数据，系统共捕获到3次高风险水位告警，主要集中在2号泵站区域。
1. 第一次告警 (10:23:45): 2号泵站进水口水位超标，达到 4.5m (阈值 4.0m)，持续时间 5分钟。原因分析：可能是由于上游突发排水导致。
2. 第二次告警 (14:15:10): 2号泵站传感器信号异常波动，疑似硬件故障或线路干扰。
3. 第三次告警 (18:45:30): 排水流量骤减，引发低水位预警。

建议措施：
• 立即派遣运维人员检查2号泵站传感器及线路状态。
• 调取10:00-11:00期间的视频监控，排查外部因素。
• 关注未来4小时的天气变化，防止暴雨叠加。`;
    } else if (userMessage.includes('设备')) {
      aiResponse = `[设备运行状态概览]

当前系统接入设备总数：18台。
• 在线设备：15台 (83.3%)
• 离线设备：3台 (16.7%)

详细状态：
• 正常运行：1号泵站所有机组、主控中心服务器、东区水质监测仪。
• 离线异常：
  1. 东区-流量计-03：已离线 2小时15分，最后心跳时间 09:30。
  2. 北区-压力传感器-01：信号微弱，间歇性断连。
  3. 备用电源系统：处于待机维护模式。

智能诊断：离线设备主要集中在东区边缘地带，结合网络拓扑分析，该区域4G信号强度较弱（-105dBm），建议排查网络基站或考虑增设信号增强器。`;
    } else if (userMessage.includes('趋势')) {
      aiResponse = `[流量趋势智能预测]

基于过去7天的数据模型分析：
1. 总体趋势：本周流量总体平稳，日均流量约为 12,500 m³，环比上周增长 1.2%。
2. 峰值特征：
   • 每日 09:00 - 11:00 为早高峰，平均瞬时流量达到 800 m³/h。
   • 每日 19:00 - 21:00 为晚高峰，流量波动较大，需重点关注。
3. 异常波动：周三下午 15:00 出现过一次短暂的流量骤降，持续约10分钟，随后自动恢复。

AI 预测：根据当前用水模型推演，预计明日早高峰流量将达到 850 m³/h，接近管道承载阈值的 85%。
建议：建议在明日 08:30 前提前启动备用泵组进行预增压，平衡管网压力。`;
    } else {
      aiResponse = `收到您的指令："${userMessage}"。

正在调用后台大数据引擎进行分析...
[√] 解析自然语言指令
[√] 检索相关历史数据库 (范围: 最近30天)
[√] 运行异常检测算法 (Isolation Forest)
[√] 生成可视化报表数据

分析完成。根据当前系统状态，暂未发现与您描述直接相关的重大异常。您可以尝试询问更具体的内容，例如：“查看2号泵站的详细参数”、“导出昨日的水质分析报告”或“预测下周的用水量趋势”。`;
    }

    // Typewriter effect
    messages.value.push({
      type: 'ai',
      content: '',
      time: new Date().toLocaleTimeString(),
    });

    let i = 0;
    const typeWriter = () => {
      if (i < aiResponse.length) {
        const lastMessage = messages.value[messages.value.length - 1];
        if (lastMessage) {
          lastMessage.content += aiResponse.charAt(i);
        }
        i++;
        scrollToBottom();
        setTimeout(typeWriter, 30); // Adjust speed here
      } else if (aiVideos.length > 0) {
        // Send a separate message for video
        messages.value.push({
          type: 'ai',
          content: '',
          time: new Date().toLocaleTimeString(),
          videos: aiVideos
        });
        nextTick(() => {
          scrollToBottom();
          // Double check scroll after a short delay to ensure video container is rendered
          setTimeout(scrollToBottom, 100);
        });
      }
    };
    typeWriter();

  }, 1000);
};

const handleClose = () => {
  emit('update:visible', false);
  emit('close');
};

const userAvatar = computed(() => userStore.userInfo?.avatar || '');
</script>

<template>
  <Modal
    :open="visible"
    :footer="null"
    :closable="false"
    :mask-closable="true"
    width="1000px"
    class="ai-chat-modal"
    @cancel="handleClose"
  >
    <div class="flex flex-col h-[800px] bg-white dark:bg-[#1f1f1f] rounded-lg overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-white/20 rounded-full">
            <IconifyIcon icon="ion:robot-outline" class="text-xl" />
          </div>
          <div>
            <h3 class="text-lg font-bold m-0">智能分析助手</h3>
            <p class="text-xs opacity-80 m-0">Based on Large Language Model</p>
          </div>
        </div>
        <Button type="text" class="text-white hover:bg-white/20" @click="handleClose">
          <IconifyIcon icon="ion:close-outline" class="size-6" />
        </Button>
      </div>

      <!-- Messages Area -->
      <div 
        ref="messagesContainer"
        class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#141414]"
      >
        <div 
          v-for="(msg, index) in messages" 
          :key="index" 
          class="flex w-full"
          :class="msg.type === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div class="flex max-w-[80%] gap-3" :class="msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'">
            <!-- Avatar -->
            <div class="flex-shrink-0">
              <Avatar v-if="msg.type === 'user'" :src="userAvatar" class="bg-blue-500 flex items-center justify-center">
                <template #icon><IconifyIcon icon="ion:person-outline" /></template>
              </Avatar>
              <Avatar v-else class="bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <template #icon><IconifyIcon icon="ion:robot-outline" /></template>
              </Avatar>
            </div>

            <!-- Content -->
            <div class="flex flex-col" :class="msg.type === 'user' ? 'items-end' : 'items-start'">
              <span class="text-xs text-gray-400 mb-1 mx-2">{{ msg.time }}</span>
              <div 
                class="p-3 rounded-2xl text-sm shadow-sm whitespace-pre-wrap max-w-full"
                :class="[
                  msg.type === 'user' 
                    ? 'bg-blue-500 text-white rounded-tr-none' 
                    : 'bg-white dark:bg-[#2a2a2a] text-gray-800 dark:text-gray-200 rounded-tl-none',
                  !msg.content && msg.videos && msg.videos.length ? '!p-1 !bg-transparent !shadow-none' : ''
                ]"
              >
                <span v-if="msg.content">{{ msg.content }}</span>
                
                <div v-if="msg.videos && msg.videos.length" class="mt-0 grid grid-cols-1 gap-2 min-w-[300px]">
                  <video 
                    v-for="video in msg.videos" 
                    :key="video"
                    :src="video" 
                    controls 
                    autoplay
                    class="w-full rounded-lg shadow-md"
                    @loadedmetadata="handleVideoLoad"
                  ></video>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="loading" class="flex justify-start w-full">
          <div class="flex max-w-[80%] gap-3">
            <Avatar class="bg-gradient-to-r from-blue-500 to-cyan-500">
              <template #icon><IconifyIcon icon="ion:robot-outline" /></template>
            </Avatar>
            <div class="bg-white dark:bg-[#2a2a2a] p-3 rounded-lg rounded-tl-none shadow-sm flex items-center">
              <Spin size="small" />
              <span class="ml-2 text-sm text-gray-500">正在思考...</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-4 bg-white dark:bg-[#1f1f1f] border-t border-gray-200 dark:border-gray-700">
        <div class="flex gap-2">
          <Input.TextArea
            v-model:value="inputValue"
            placeholder="输入您的问题，例如：预演、洪涝、最近的设备告警情况如何？"
            :auto-size="{ minRows: 1, maxRows: 4 }"
            @pressEnter.prevent="handleSend"
            class="flex-1 !resize-none"
          />
          <Button 
            type="primary" 
            class="h-auto px-6 bg-gradient-to-r from-blue-500 to-cyan-500 border-0"
            :loading="loading"
            @click="handleSend"
          >
            <template #icon><IconifyIcon icon="ion:paper-plane-outline" /></template>
          </Button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<style>
.ai-chat-modal .ant-modal-content {
  padding: 0;
  border-radius: 12px;
  overflow: hidden;
  background: transparent;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>