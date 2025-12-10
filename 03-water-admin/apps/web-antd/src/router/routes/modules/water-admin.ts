import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: '仪表盘',
    },
    name: 'Dashboard',
    path: '/dashboard',
    children: [
      {
        name: 'Analytics',
        path: '/dashboard/analytics',
        component: () => import('#/views/dashboard/analytics/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: '分析页',
        },
      },
      {
        name: 'Workspace',
        path: '/dashboard/workspace',
        component: () => import('#/views/dashboard/workspace/index.vue'),
        meta: {
          icon: 'carbon:workspace',
          title: '工作台',
        },
      },
    ],
  },
  {
    meta: {
      icon: 'lucide:monitor',
      order: 5,
      title: '综合监控',
    },
    name: 'Monitor',
    path: '/monitor',
    children: [
      {
        name: 'MonitorIndex',
        path: '/monitor/index',
        component: () => import('#/views/monitor/index.vue'),
        meta: {
          title: '综合概览',
        },
      },
      {
        name: 'SafetyMonitor',
        path: '/monitor/safety',
        component: () => import('#/views/monitor/safety.vue'),
        meta: {
          title: '安全监测',
        },
      },
      {
        name: 'FloodMonitor',
        path: '/monitor/flood',
        component: () => import('#/views/monitor/flood.vue'),
        meta: {
          title: '防汛调度',
        },
      },
      {
        name: 'QualityMonitor',
        path: '/monitor/quality',
        component: () => import('#/views/monitor/quality.vue'),
        meta: {
          title: '水质监测',
        },
      },
    ],
  },
  {
    meta: {
      icon: 'lucide:folder-kanban',
      order: 10,
      title: '工程管理',
    },
    name: 'Project',
    path: '/project',
    children: [
      {
        name: 'ProjectList',
        path: '/project/list',
        component: () => import('#/views/project/index.vue'),
        meta: {
          title: '工程列表',
        },
      },
      {
        name: 'AuditList',
        path: '/project/audit',
        component: () => import('#/views/audit/index.vue'),
        meta: {
          title: '工程审计',
        },
      },
    ],
  },
  {
    meta: {
      icon: 'lucide:users',
      order: 20,
      title: '人事管理',
    },
    name: 'Personnel',
    path: '/personnel',
    children: [
      {
        name: 'PersonnelList',
        path: '/personnel/list',
        component: () => import('#/views/personnel/index.vue'),
        meta: {
          title: '员工名册',
        },
      },
      {
        name: 'PerformanceList',
        path: '/personnel/performance',
        component: () => import('#/views/performance/index.vue'),
        meta: {
          title: '绩效考核',
        },
      },
    ],
  },
  {
    meta: {
      icon: 'lucide:box',
      order: 25,
      title: '物资管理',
    },
    name: 'Resource',
    path: '/resource',
    children: [
      {
        name: 'ResourceList',
        path: '/resource/list',
        component: () => import('#/views/resource/index.vue'),
        meta: {
          title: '物资列表',
        },
      },
    ],
  },
  {
    meta: {
      icon: 'lucide:file-text',
      order: 30,
      title: '内容管理',
    },
    name: 'Content',
    path: '/content',
    children: [
      {
        name: 'ContentList',
        path: '/content/list',
        component: () => import('#/views/content/index.vue'),
        meta: {
          title: '通知公告',
        },
      },
    ],
  },
];

export default routes;
