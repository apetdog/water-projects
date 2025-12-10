<script lang="ts" setup>
import type {
  WorkbenchProjectItem,
  WorkbenchQuickNavItem,
  WorkbenchTodoItem,
  WorkbenchTrendItem,
} from '@vben/common-ui';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  AnalysisChartCard,
  WorkbenchHeader,
  WorkbenchProject,
  WorkbenchQuickNav,
  WorkbenchTodo,
  WorkbenchTrends,
} from '@vben/common-ui';
import { preferences } from '@vben/preferences';
import { useUserStore } from '@vben/stores';
import { openWindow } from '@vben/utils';

import AnalyticsVisitsSource from '../analytics/analytics-visits-source.vue';

const userStore = useUserStore();

// 这是一个示例数据，实际项目中需要根据实际情况进行调整
// url 也可以是内部路由，在 navTo 方法中识别处理，进行内部跳转
// 例如：url: /dashboard/workspace
const projectItems: WorkbenchProjectItem[] = [
  {
    color: '',
    content: '定期对大坝主体结构进行安全监测与评估。',
    date: '2024-12-01',
    group: '工程部',
    icon: 'lucide:shield-check',
    title: '大坝安全监测',
    url: '/project/list',
  },
  {
    color: '#3fb27f',
    content: '汛期前对重点防洪区域进行隐患排查。',
    date: '2024-12-02',
    group: '防汛办',
    icon: 'lucide:waves',
    title: '防洪隐患排查',
    url: '/project/list',
  },
  {
    color: '#e18525',
    content: '按季度对水质监测设备进行维护保养。',
    date: '2024-12-03',
    group: '设备科',
    icon: 'lucide:wrench',
    title: '设备维护保养',
    url: '/content/list',
  },
  {
    color: '#bf0c2c',
    content: '组织全员进行防汛抗旱应急演练。',
    date: '2024-12-04',
    group: '应急组',
    icon: 'lucide:siren',
    title: '应急预案演练',
    url: '/content/list',
  },
  {
    color: '#00d8ff',
    content: '严格把控工程建设材料质量与施工工艺。',
    date: '2024-12-05',
    group: '质检部',
    icon: 'lucide:clipboard-check',
    title: '工程质量控制',
    url: '/project/list',
  },
  {
    color: '#EBD94E',
    content: '优化水资源调度方案，提高利用效率。',
    date: '2024-12-06',
    group: '调度中心',
    icon: 'lucide:droplets',
    title: '水资源调度',
    url: '/dashboard/analytics',
  },
  {
    color: '#8A2BE2',
    content: '加强库区巡逻，防止非法捕捞与破坏。',
    date: '2024-12-07',
    group: '安保部',
    icon: 'lucide:eye',
    title: '库区日常巡查',
    url: '/project/list',
  },
  {
    color: '#FF4500',
    content: '推进智慧水利系统建设，提升信息化水平。',
    date: '2024-12-08',
    group: '信息中心',
    icon: 'lucide:monitor-check',
    title: '信息化建设',
    url: '/dashboard/workspace',
  },
  {
    color: '#20B2AA',
    content: '开展水法宣传活动，增强公众护水意识。',
    date: '2024-12-09',
    group: '法规处',
    icon: 'lucide:megaphone',
    title: '水法规宣传',
    url: '/content/list',
  },
];

// 同样，这里的 url 也可以使用以 http 开头的外部链接
const quickNavItems: WorkbenchQuickNavItem[] = [
  {
    color: '#1fdaca',
    icon: 'ion:home-outline',
    title: '首页',
    url: '/',
  },
  {
    color: '#bf0c2c',
    icon: 'ion:grid-outline',
    title: '项目管理',
    url: '/project/list',
  },
  {
    color: '#e18525',
    icon: 'ion:people-outline',
    title: '人员管理',
    url: '/personnel/list',
  },
  {
    color: '#3fb27f',
    icon: 'ion:document-text-outline',
    title: '内容管理',
    url: '/content/list',
  },
  {
    color: '#4daf1bc9',
    icon: 'ion:stats-chart-outline',
    title: '数据分析',
    url: '/dashboard/analytics',
  },
  {
    color: '#00d8ff',
    icon: 'ion:settings-outline',
    title: '系统设置',
    url: '/system/setting', // 假设有这个页面，或者暂留
  },
];

const todoItems = ref<WorkbenchTodoItem[]>([
  {
    completed: false,
    content: `审查三峡大坝2024年度第一季度安全监测报告。`,
    date: '2024-12-05 09:00:00',
    title: '安全监测报告审查',
  },
  {
    completed: true,
    content: `批准南水北调工程设备采购预算申请。`,
    date: '2024-12-04 14:00:00',
    title: '预算审批',
  },
  {
    completed: false,
    content: `组织召开全员防汛抗旱应急演练筹备会议。`,
    date: '2024-12-06 10:00:00',
    title: '应急演练会议',
  },
  {
    completed: false,
    content: `核实长江堤防升级改造项目的工程进度。`,
    date: '2024-12-05 16:00:00',
    title: '工程进度核实',
  },
  {
    completed: false,
    content: `处理员工关于冬季施工防冻物资发放的反馈。`,
    date: '2024-12-07 11:00:00',
    title: '员工反馈处理',
  },
]);
const trendItems: WorkbenchTrendItem[] = [
  {
    avatar: 'svg:avatar-1',
    content: `在 <a>工程部</a> 发布了项目 <a>三峡大坝维护工程</a> 的周报`,
    date: '刚刚',
    title: '李明',
  },
  {
    avatar: 'svg:avatar-2',
    content: `完成了 <a>南水北调二期工程</a> 的初步勘测任务`,
    date: '1个小时前',
    title: '王强',
  },
  {
    avatar: 'svg:avatar-3',
    content: `提交了 <a>本地水库加固项目</a> 的验收申请`,
    date: '1天前',
    title: '张伟',
  },
  {
    avatar: 'svg:avatar-4',
    content: `发布通知 <a>关于加强冬季施工防冻保温工作的通知</a>`,
    date: '2天前',
    title: '工程部',
  },
  {
    avatar: 'svg:avatar-1',
    content: `回复了 <a>赵刚</a> 关于 <a>黄河下游河道治理</a> 的技术咨询`,
    date: '3天前',
    title: '周杰',
  },
  {
    avatar: 'svg:avatar-2',
    content: `解决了 <a>城市防洪排涝系统</a> 的设备故障`,
    date: '1周前',
    title: '黄涛',
  },
  {
    avatar: 'svg:avatar-3',
    content: `更新了 <a>人事管理制度</a>`,
    date: '1周前',
    title: '人力资源部',
  },
  {
    avatar: 'svg:avatar-4',
    content: `上传了 <a>2024年度水利工程质量报告</a>`,
    date: '2024-11-30 10:00',
    title: '质检部',
  },
  {
    avatar: 'svg:avatar-4',
    content: `启动了 <a>珠江三角洲水资源配置</a> 项目`,
    date: '2024-11-28 09:00',
    title: '总经办',
  },
];

const router = useRouter();

// 这是一个示例方法，实际项目中需要根据实际情况进行调整
// This is a sample method, adjust according to the actual project requirements
function navTo(nav: WorkbenchProjectItem | WorkbenchQuickNavItem) {
  if (nav.url?.startsWith('http')) {
    openWindow(nav.url);
    return;
  }
  if (nav.url?.startsWith('/')) {
    router.push(nav.url).catch((error) => {
      console.error('Navigation failed:', error);
    });
  } else {
    console.warn(`Unknown URL for navigation item: ${nav.title} -> ${nav.url}`);
  }
}
</script>

<template>
  <div class="p-5">
    <WorkbenchHeader
      :avatar="userStore.userInfo?.avatar || preferences.app.defaultAvatar"
    >
      <template #title>
        早安, {{ userStore.userInfo?.realName }}, 开始您一天的工作吧！
      </template>
      <template #description> 今日晴，20℃ - 32℃！ </template>
    </WorkbenchHeader>

    <div class="mt-5 flex flex-col lg:flex-row">
      <div class="mr-4 w-full lg:w-3/5">
        <WorkbenchProject :items="projectItems" title="项目" @click="navTo" />
        <WorkbenchTrends :items="trendItems" class="mt-5" title="最新动态" />
      </div>
      <div class="w-full lg:w-2/5">
        <WorkbenchQuickNav
          :items="quickNavItems"
          class="mt-5 lg:mt-0"
          title="快捷导航"
          @click="navTo"
        />
        <WorkbenchTodo :items="todoItems" class="mt-5" title="待办事项" />
        <AnalysisChartCard class="mt-5" title="访问来源">
          <AnalyticsVisitsSource />
        </AnalysisChartCard>
      </div>
    </div>
  </div>
</template>
