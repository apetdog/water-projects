import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      title: '监测信息',
      icon: 'lucide:monitor',
      order: 10,
    },
    name: 'Monitoring',
    path: '/monitoring',
    children: [
      {
        name: 'RealtimeMonitoring',
        path: '/monitoring/realtime',
        component: () => import('#/views/iot/monitoring/realtime/index.vue'),
        meta: {
          title: '实时监测',
          icon: 'lucide:activity',
        },
      },
      {
        name: 'RealtimeMonitoringDetail',
        path: '/monitoring/realtime/detail/:id',
        component: () => import('#/views/iot/monitoring/realtime/detail.vue'),
        meta: {
          title: '实时监测详情',
          icon: 'lucide:activity',
          hideInMenu: true,
          currentActiveMenu: '/monitoring/realtime',
        },
      },
      {
        name: 'MapInfo',
        path: '/monitoring/map',
        component: () => import('#/views/iot/monitoring/map/index.vue'),
        meta: {
          title: '地图信息',
          icon: 'lucide:map',
        },
      },
    ],
  },
  {
    meta: {
      title: '统计分析',
      icon: 'lucide:bar-chart-3',
      order: 20,
    },
    name: 'Analysis',
    path: '/analysis',
    children: [
      {
        name: 'DataCurveAnalysis',
        path: '/analysis/curve',
        component: () => import('#/views/iot/analysis/curve/index.vue'),
        meta: {
          title: '数据曲线分析',
          icon: 'lucide:line-chart',
        },
      },
      {
        name: 'OperationStatusStats',
        path: '/analysis/status',
        component: () => import('#/views/iot/analysis/status/index.vue'),
        meta: {
          title: '运行状态统计',
          icon: 'lucide:pie-chart',
        },
      },
    ],
  },
  {
    meta: {
      title: '信息查询',
      icon: 'lucide:search',
      order: 30,
    },
    name: 'Query',
    path: '/query',
    children: [
      {
        name: 'HistoryDataQuery',
        path: '/query/history',
        component: () => import('#/views/iot/query/history/index.vue'),
        meta: {
          title: '历史数据查询',
          icon: 'lucide:database',
        },
      },
      {
        name: 'CommunicationLogQuery',
        path: '/query/log',
        component: () => import('#/views/iot/query/log/index.vue'),
        meta: {
          title: '通信日志查询',
          icon: 'lucide:file-text',
        },
      },
      {
        name: 'AlarmInfoQuery',
        path: '/query/alarm',
        component: () => import('#/views/iot/query/alarm/index.vue'),
        meta: {
          title: '告警信息查询',
          icon: 'lucide:alert-triangle',
        },
      },
    ],
  },
  {
    meta: {
      title: '设备管理',
      icon: 'lucide:hard-drive',
      order: 40,
    },
    name: 'Device',
    path: '/device',
    children: [
      {
        name: 'DeviceInfoManagement',
        path: '/device/info',
        component: () => import('#/views/iot/device/info/index.vue'),
        meta: {
          title: '设备信息管理',
          icon: 'lucide:server',
        },
      },
      {
        name: 'DeviceFieldManagement',
        path: '/device/field',
        component: () => import('#/views/iot/device/field/index.vue'),
        meta: {
          title: '设备字段管理',
          icon: 'lucide:table',
        },
      },
      {
        name: 'FieldTemplateManagement',
        path: '/device/template',
        component: () => import('#/views/iot/device/template/index.vue'),
        meta: {
          title: '字段模板管理',
          icon: 'lucide:layout-template',
        },
      },
    ],
  },
  {
    meta: {
      title: '参数配置',
      icon: 'lucide:settings',
      order: 50,
    },
    name: 'Config',
    path: '/config',
    children: [
      {
        name: 'RemoteParamConfig',
        path: '/config/remote',
        component: () => import('#/views/iot/config/remote/index.vue'),
        meta: {
          title: '远程参数配置',
          icon: 'lucide:globe',
        },
      },
      {
        name: 'DeviceParamConfig',
        path: '/config/device',
        component: () => import('#/views/iot/config/device/index.vue'),
        meta: {
          title: '设备参数配置',
          icon: 'lucide:settings-2',
        },
      },
      {
        name: 'RemotePassthrough',
        path: '/config/remote-passthrough',
        component: () => import('#/views/iot/config/remote-passthrough/index.vue'),
        meta: {
          title: '远程透传命令',
          icon: 'lucide:send',
        },
      },
      {
        name: 'ParamTemplateManagement',
        path: '/config/template',
        component: () => import('#/views/iot/config/template/index.vue'),
        meta: {
          title: '参数模板管理',
          icon: 'lucide:file-cog',
        },
      },
      {
        name: 'PresetPassthrough',
        path: '/config/preset-passthrough',
        component: () => import('#/views/iot/config/preset-passthrough/index.vue'),
        meta: {
          title: '预制透传命令',
          icon: 'lucide:save',
        },
      },
      {
        name: 'TaskManagement',
        path: '/config/task',
        component: () => import('#/views/iot/config/task/index.vue'),
        meta: {
          title: '任务管理',
          icon: 'lucide:list-todo',
        },
      },
    ],
  },
  {
    meta: {
      title: '公共信息',
      icon: 'lucide:info',
      order: 60,
    },
    name: 'Public',
    path: '/public',
    children: [
      {
        name: 'IndustryNews',
        path: '/public/news',
        component: () => import('#/views/iot/public/news/index.vue'),
        meta: {
          title: '行业新闻',
          icon: 'lucide:newspaper',
        },
      },
      {
        name: 'Notice',
        path: '/public/notice',
        component: () => import('#/views/iot/public/notice/index.vue'),
        meta: {
          title: '通知公告',
          icon: 'lucide:bell',
        },
      },
    ],
  },
  {
    meta: {
      title: '组态管理',
      icon: 'lucide:component',
      order: 70,
    },
    name: 'Topology',
    path: '/topology',
    children: [
      {
        name: 'TopologyList',
        path: '/topology/list',
        component: () => import('#/views/iot/topology/list/index.vue'),
        meta: {
          title: '组态列表',
          icon: 'lucide:list',
        },
      },
    ],
  },
];

export default routes;
