<script lang="ts"
  setup>
  import { computed, ref, nextTick, watch } from 'vue';
  import { Modal, Input, Button, Avatar, Spin, Menu, MenuItem } from 'ant-design-vue';
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
  const showCommandMenu = ref(false);
  const commandMenuPosition = ref({ top: 0, left: 0 });
  const inputRef = ref();

  const commandQuery = ref('');
  const selectedCommandIndex = ref(0);

  const commands = [
    { label: '帮我进行洪水演进模拟分析', value: '帮我进行洪水演进模拟分析' },
    { label: '进行水动力分析，评估流速与流向', value: '进行水动力分析，评估流速与流向' },
    { label: '监测当前水深分布情况，生成报告', value: '监测当前水深分布情况，生成报告' },
    { label: '模拟泄洪调度方案，预测下游影响', value: '模拟泄洪调度方案，预测下游影响' },
    { label: '评估淹没范围，计算受灾面积', value: '评估淹没范围，计算受灾面积' },
  ];

  const filteredCommands = computed(() => {
    if (!commandQuery.value) return commands;
    return commands.filter(cmd =>
      cmd.label.toLowerCase().includes(commandQuery.value.toLowerCase())
    );
  });

  watch(filteredCommands, () => {
    selectedCommandIndex.value = 0;
  });

  const getHighlightedText = (text: string) => {
    if (!commandQuery.value) return [{ text, highlight: false }];

    const parts: { text: string; highlight: boolean }[] = [];
    const regex = new RegExp(`(${commandQuery.value})`, 'gi');
    const splitText = text.split(regex);

    splitText.forEach(part => {
      if (part.toLowerCase() === commandQuery.value.toLowerCase()) {
        parts.push({ text: part, highlight: true });
      } else if (part) {
        parts.push({ text: part, highlight: false });
      }
    });

    return parts;
  };

  const messages = ref<Array<{ type: 'user' | 'ai'; content: string; time: string; videos?: string[] }>>([
    {
      type: 'ai',
      content: '你好！我是您的智能分析助手。我可以帮您分析设备数据、生成报表或回答相关问题。请问有什么可以帮您？',
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const videoLoadedMap = ref<Record<string, boolean>>({});

  const messagesContainer = ref<HTMLElement | null>(null);

  const scrollToBottom = (force = false) => {
    nextTick(() => {
      if (messagesContainer.value) {
        const { scrollTop, scrollHeight, clientHeight } = messagesContainer.value;
        // Only scroll if we are already near the bottom (within 100px) or if forced
        if (force || scrollHeight - scrollTop - clientHeight < 100) {
          messagesContainer.value.scrollTop = scrollHeight;
        }
      }
    });
  };

  const handleVideoLoad = (videoSrc: string) => {
    videoLoadedMap.value[videoSrc] = true;
    scrollToBottom(true);
  };

  const handleInput = (e: any) => {
    const value = e.target.value;
    const lastSlashIndex = value.lastIndexOf('/');

    if (lastSlashIndex !== -1) {
      showCommandMenu.value = true;
      commandQuery.value = value.slice(lastSlashIndex + 1);
    } else {
      showCommandMenu.value = false;
      commandQuery.value = '';
    }
  };

  const handleCommandSelect = (command: string) => {
    inputValue.value = command;
    showCommandMenu.value = false;
    handleSend();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!showCommandMenu.value) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedCommandIndex.value = (selectedCommandIndex.value + 1) % filteredCommands.value.length;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedCommandIndex.value = (selectedCommandIndex.value - 1 + filteredCommands.value.length) % filteredCommands.value.length;
    }
  };

  const handleEnter = (e: any) => {
    if (showCommandMenu.value && filteredCommands.value.length > 0) {
      const selectedCmd = filteredCommands.value[selectedCommandIndex.value];
      if (selectedCmd) {
        handleCommandSelect(selectedCmd.value);
      }
    } else {
      handleSend();
    }
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
    scrollToBottom(true);

    // Simulate AI response
    loading.value = true;
    scrollToBottom(true);

    setTimeout(async () => {
      loading.value = false;
      let aiResponse = '';
      let aiVideos: string[] = [];
      let aiFollowUp = '';
      
      if (userMessage.includes('洪水演进')) {
        aiResponse = `[洪水演进推演]
      
正在基于高精度地形数据与水文模型推演未来24小时洪水演进过程。
计算参数：降雨量 120mm，上游来水 1500m³/s。
预测结果：洪峰预计将于今日 14:00 到达，最高水位 25.8米。`;
        aiVideos = [`${baseUrl}洪水演进.mp4`];
        aiFollowUp = `综合本次演进模拟结果分析，虽然洪峰水位 25.8m 仍在堤防设计安全高程 26.5m 范围内，但考虑到上游持续降雨的叠加效应，堤防长期浸泡可能导致土壤抗剪强度下降。
建议采取以下强化措施：
1. 重点加密对 K12+500 至 K15+200 弯道段堤防的巡查频次，由每 4 小时一次提升至每 1 小时一次。
2. 提前预置抢险物资（如编织袋 5000 条、砂石料 200 方）至 K14 备料场。
3. 通知下游沿岸 3 公里范围内的居民做好撤离准备，并暂停该河段所有水上作业。`;
      } else if (userMessage.includes('水动力')) {
        aiResponse = `[水动力分析]

系统正在进行水动力全要素数值分析。
分析结果：
1. 河道主流流速分布不均，弯道外侧流速达到 2.5m/s。
2. 桥墩附近存在局部冲刷风险，建议加强监测。`;
        aiVideos = [`${baseUrl}水动力.mp4`];
        aiFollowUp = `根据流场数值模拟结果，弯道外侧流速已接近河床临界起动流速，冲刷风险显著增加。特别是 3 号桥墩迎水面局部流速高达 2.8m/s，可能导致局部冲刷坑深度加剧。
建议立即执行以下工程措施：
1. 在弯道外侧受冲刷严重的区域（桩号 2+300 处）实施紧急抛石护脚作业，抛投粒径不小于 500mm。
2. 调度无人测量船对 3 号桥墩基础进行高精度声纳扫测，对比历史数据评估冲刷深度。
3. 适当限制上游下泄流量，控制河道整体流速在 2.0m/s 以下，直至洪峰过境。`;
      } else if (userMessage.includes('水深')) {
        aiResponse = `[水深分布监测]

实时水深场反演完成。
数据解读：
- 平均水深：0.8米
- 最大水深：2.3米（位于低洼A区）
- 深色区域表示水深超过1.5米，人员车辆请勿涉水通过。`;
        aiVideos = [`${baseUrl}水深.mp4`];
        aiFollowUp = `实时水深场反演数据显示，低洼 A 区积水情况已达到红色预警级别，且积水范围有向 B 区商业街蔓延的趋势。平均积水深度 0.8m 已严重影响车辆通行能力。
应急处置建议如下：
1. 立即调度 2 号泵站开启全部 4 台机组进行满负荷强排，预计需持续作业 6 小时方可退水。
2. 协同交警部门在 A 区周边主要路口（中山路、建设路）设置硬隔离设施，实施临时交通管制。
3. 安排市政人员打开积水路段的雨水篦子加速排水，并设置警示标志防止人员坠落。`;
      } else if (userMessage.includes('泄洪')) {
        aiResponse = `[泄洪调度分析]

正在推演泄洪闸开启后的下游水情变化。
调度方案：开启3孔泄洪闸，下泄流量 800m³/s。
影响评估：下游水位预计上涨 0.5米，未超过警戒水位，方案可行。`;
        aiVideos = [`${baseUrl}泄洪.mp4`];
        aiFollowUp = `本次泄洪调度方案（开启 3 孔，流量 800m³/s）经模型推演，对下游河道行洪能力未造成超载压力，但会导致下游水位在 2 小时内快速上涨 0.5m - 0.8m。
为确保下游安全，建议执行以下操作：
1. 在正式提闸前 30 分钟，启动全线广播预警系统，循环播放泄洪通知。
2. 通知下游 10 公里内的 2 个在建涉水工程项目立即停止施工，并将施工机械撤离至安全高程。
3. 密切关注下游 C 水文站的实时水位反馈，若水位上涨速度超过 0.3m/h，需立即调整闸门开启度，实施错峰下泄。`;
      } else if (userMessage.includes('淹没')) {
        aiResponse = `[淹没范围评估]

基于当前水情数据的淹没风险分析报告：
1. 预计淹没面积：3.5 平方公里。
2. 重点影响区域：沿河农田、滨江公园及部分低洼道路。
3. 建议立即疏散受影响区域人员。`;
        aiVideos = [`${baseUrl}淹没.mp4`];
        aiFollowUp = `基于淹没范围风险图层分析，受灾核心区域集中在滨江公园及幸福村低洼地带，涉及房屋 45 栋，人口约 120 人。通往外界的主干道 D 线路段可能因积水中断。
紧急救援建议：
1. 立即启动 II 级转移响应，组织救援队伍携带皮划艇进入幸福村，优先转移老人及儿童。
2. 启用 C 号高地作为临时安置点，并提前调拨帐篷、饮用水等生活物资。
3. 避开 D 线积水路段，开辟经由 E 线山路的应急救援绿色通道，确保救护车辆通行无阻。`;
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

      // Helper function to type text
      const typeMessage = (text: string) => {
        return new Promise<void>((resolve) => {
          messages.value.push({
            type: 'ai',
            content: '',
            time: new Date().toLocaleTimeString(),
          });
          
          // Capture the reactive message object immediately to avoid index issues if new messages are added
          const currentMessage = messages.value[messages.value.length - 1];
          
          let i = 0;
          const type = () => {
            if (i < text.length && currentMessage) {
              currentMessage.content += text.charAt(i);
              i++;
              scrollToBottom();
              setTimeout(type, 30); // Adjust speed here
            } else {
              resolve();
            }
          };
          type();
        });
      };

      // Play sequence
      // 1. First text response
      if (aiResponse) {
        await typeMessage(aiResponse);
      }

      // 2. Video response (if any)
      if (aiVideos.length > 0) {
        messages.value.push({
          type: 'ai',
          content: '',
          time: new Date().toLocaleTimeString(),
          videos: aiVideos
        });
        nextTick(() => {
          scrollToBottom(true);
          // Double check scroll after a short delay to ensure video container is rendered
          setTimeout(() => scrollToBottom(true), 100);
        });
        // Small delay before follow-up to let video appear and settle
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // 3. Follow-up text response (if any)
      if (aiFollowUp) {
        await typeMessage(aiFollowUp);
      }

    }, 1000);
  };

  const handleClose = () => {
    emit('update:visible', false);
    emit('close');
  };

  const userAvatar = computed(() => userStore.userInfo?.avatar || '');
</script>

<template>
  <Modal :open="visible" :footer="null" :closable="false" :mask-closable="true" width="800px" centered
    class="ai-chat-modal" @cancel="handleClose">
    <div class="flex flex-col h-[90vh] md:h-[70vh] bg-white dark:bg-[#1f1f1f] rounded-lg overflow-hidden">
      <!-- Header -->
      <div
        class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
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
      <div ref="messagesContainer"
        class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#141414] flex flex-col">
        <div v-for="(msg, index) in messages" :key="index" class="flex w-full"
          :class="msg.type === 'user' ? 'justify-end' : 'justify-start'">
          <div class="flex max-w-[90%] md:max-w-[80%] gap-3"
            :class="msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'">
            <!-- Avatar -->
            <div class="flex-shrink-0">
              <Avatar v-if="msg.type === 'user'" :src="userAvatar" class="bg-blue-500 flex items-center justify-center">
                <template #icon>
                  <IconifyIcon icon="ion:person-outline" />
                </template>
              </Avatar>
              <Avatar v-else class="bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <template #icon>
                  <IconifyIcon icon="ion:robot-outline" />
                </template>
              </Avatar>
            </div>

            <!-- Content -->
            <div class="flex flex-col" :class="msg.type === 'user' ? 'items-end' : 'items-start'">
              <span class="text-xs text-gray-400 mb-1 mx-2">{{ msg.time }}</span>
              <div class="p-3 rounded-2xl text-sm shadow-sm whitespace-pre-wrap max-w-full" :class="[
                msg.type === 'user'
                  ? 'bg-blue-500 text-white rounded-tr-none'
                  : 'bg-white dark:bg-[#2a2a2a] text-gray-800 dark:text-gray-200 rounded-tl-none',
                !msg.content && msg.videos && msg.videos.length ? '!p-1 !bg-transparent !shadow-none' : ''
              ]">
                <span v-if="msg.content">{{ msg.content }}</span>

                <div v-if="msg.videos && msg.videos.length"
                  class="mt-0 grid grid-cols-1 gap-2 w-full min-w-[200px] sm:min-w-[300px]">
                  <div v-for="video in msg.videos" :key="video"
                    class="relative w-full rounded-lg overflow-hidden bg-transparent" style="aspect-ratio: 16/9;">
                    <!-- Loading Placeholder -->
                    <div v-if="!videoLoadedMap[video]"
                      class="absolute inset-0 flex items-center justify-center z-10 bg-gray-100 dark:bg-gray-800">
                      <Spin />
                    </div>

                    <video v-show="videoLoadedMap[video]" :src="video" controls autoplay muted
                      class="w-full h-full object-cover" @loadedmetadata="() => handleVideoLoad(video)"></video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="loading" class="flex justify-start w-full">
          <div class="flex max-w-[80%] gap-3">
            <Avatar class="bg-gradient-to-r from-blue-500 to-cyan-500">
              <template #icon>
                <IconifyIcon icon="ion:robot-outline" />
              </template>
            </Avatar>
            <div class="bg-white dark:bg-[#2a2a2a] p-3 rounded-lg rounded-tl-none shadow-sm flex items-center">
              <Spin size="small" />
              <span class="ml-2 text-sm text-gray-500">正在思考...</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-4 bg-white dark:bg-[#1f1f1f] border-t border-gray-200 dark:border-gray-700 relative">
        <!-- Command Menu -->
        <div v-if="showCommandMenu"
          class="absolute bottom-full left-4 mb-2 bg-white dark:bg-[#2a2a2a] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50 w-120">
          <div class="py-1">
            <div v-for="(cmd, index) in filteredCommands" :key="cmd.value"
              class="px-4 py-2 cursor-pointer text-sm transition-colors"
              :class="index === selectedCommandIndex ? 'bg-blue-50 dark:bg-blue-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-700'"
              @click="handleCommandSelect(cmd.value)"
              @mouseenter="selectedCommandIndex = index">
              <span v-for="(part, index) in getHighlightedText(cmd.label)" :key="index"
                :class="{ 'text-blue-500 font-bold': part.highlight }">
                {{ part.text }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex gap-2">
          <Input.TextArea ref="inputRef" v-model:value="inputValue" placeholder="输入您的问题，例如：洪水演进、水动力、水深、泄洪、淹没..."
            :auto-size="{ minRows: 1, maxRows: 4 }" @pressEnter.prevent="handleEnter" @change="handleInput"
            @keydown="handleKeyDown"
            class="flex-1 !resize-none" />
          <Button type="primary" class="h-auto px-6 bg-gradient-to-r from-blue-500 to-cyan-500 border-0"
            :loading="loading" @click="handleSend">
            <template #icon>
              <IconifyIcon icon="ion:paper-plane-outline" />
            </template>
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