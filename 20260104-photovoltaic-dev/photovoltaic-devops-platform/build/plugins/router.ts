import type { RouteMeta } from 'vue-router';
import ElegantVueRouter from '@elegant-router/vue/vite';
import type { RouteKey } from '@elegant-router/types';

export function setupElegantRouter() {
  return ElegantVueRouter({
    layouts: {
      base: 'src/layouts/base-layout/index.vue',
      blank: 'src/layouts/blank-layout/index.vue'
    },
    routePathTransformer(routeName, routePath) {
      const key = routeName as RouteKey;

      if (key === 'login') {
        const modules: UnionKey.LoginModule[] = ['pwd-login', 'code-login', 'register', 'reset-pwd', 'bind-wechat'];

        const moduleReg = modules.join('|');

        return `/login/:module(${moduleReg})?`;
      }

      return routePath;
    },
    onRouteMetaGen(routeName) {
      const key = routeName as RouteKey;

      const constantRoutes: RouteKey[] = ['login', '403', '404', '500'];

      const meta: Partial<RouteMeta> = {
        title: key,
        i18nKey: `route.${key}` as App.I18n.I18nKey
      };

      const titleMap: Record<string, string> = {
        'pv-status': '光伏阵列',
        '3d-model': '组件详情',
        'panel-detail': '面板详情'
      };

      if (titleMap[key]) {
        meta.title = titleMap[key];
      }

      if (key === '3d-model') {
        meta.icon = 'mdi:cube-outline';
        meta.order = 3;
      }

      if (key === 'pv-status') {
        meta.icon = 'mdi:solar-power';
        meta.order = 2;
      }

      if (key === 'panel-detail') {
        meta.hideInMenu = true;
      }

      if (constantRoutes.includes(key)) {
        meta.constant = true;
      }

      return meta;
    }
  });
}
