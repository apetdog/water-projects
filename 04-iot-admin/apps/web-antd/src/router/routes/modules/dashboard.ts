import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: $t('page.dashboard.title'),
    },
    name: 'Dashboard',
    path: '/dashboard',
    children: [
      {
        name: 'Analytics',
        path: '/analytics',
        component: () => import('#/views/dashboard/analytics/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: $t('page.dashboard.analytics'),
        },
      },
      {
        name: 'AlarmDetail',
        path: '/dashboard/alarm-detail',
        component: () => import('#/views/dashboard/analytics/alarm-detail/index.vue'),
        meta: {
          title: '告警详情',
          hideInMenu: true,
          currentActiveMenu: '/analytics',
        },
      },
    ],
  },
];

export default routes;
