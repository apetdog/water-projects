import type { CustomRoute, ElegantConstRoute, ElegantRoute } from '@elegant-router/types';
import { generatedRoutes } from '../elegant/routes';
import { layouts, views } from '../elegant/imports';
import { transformElegantRoutesToVueRoutes } from '../elegant/transform';

/**
 * custom routes
 *
 * @link https://github.com/soybeanjs/elegant-router?tab=readme-ov-file#custom-route
 */
const customRoutes: CustomRoute[] = [
  {
    name: 'pv-realtime',
    path: '/pv/realtime',
    component: 'layout.base$view.pv-realtime',
    meta: {
      title: '发电实时数据',
      icon: 'mdi:chart-line',
      order: 2,
      constant: true,
      keepAlive: true
    }
  } as any,
  {
    name: 'pv-system',
    path: '/pv/system',
    component: 'layout.base$view.pv-system',
    meta: {
      title: '光伏系统模型',
      icon: 'mdi:grid',
      order: 3,
      constant: true,
      keepAlive: true
    }
  } as any,
  {
    name: 'pv-panel-detail',
    path: '/pv/panel/:id',
    component: 'layout.base$view.pv-panel-detail',
    props: true,
    meta: {
      title: '单板数据分析',
      hideInMenu: true,
      keepAlive: true,
      constant: true
    }
  } as any
];

/** create routes when the auth route mode is static */
export function createStaticRoutes() {
  const constantRoutes: ElegantRoute[] = [];

  const authRoutes: ElegantRoute[] = [];

  [...customRoutes, ...generatedRoutes].forEach(item => {
    if (item.meta?.constant) {
      constantRoutes.push(item);
    } else {
      authRoutes.push(item);
    }
  });

  return {
    constantRoutes,
    authRoutes
  };
}

/**
 * Get auth vue routes
 *
 * @param routes Elegant routes
 */
export function getAuthVueRoutes(routes: ElegantConstRoute[]) {
  return transformElegantRoutesToVueRoutes(routes, layouts, views);
}
