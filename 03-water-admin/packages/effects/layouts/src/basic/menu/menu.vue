<script lang="ts" setup>
import type { MenuRecordRaw } from '@vben/types';

import type { MenuProps } from '@vben-core/menu-ui';

import { computed } from 'vue';

import { Menu } from '@vben-core/menu-ui';

interface Props extends MenuProps {
  menus?: MenuRecordRaw[];
}

const props = withDefaults(defineProps<Props>(), {
  accordion: true,
  menus: () => [],
});

const emit = defineEmits<{
  open: [string, string[]];
  select: [string, string?];
}>();

const defaultOpeneds = computed(() => {
  if (props.defaultOpeneds && props.defaultOpeneds.length > 0) {
    return props.defaultOpeneds;
  }
  if (props.accordion) {
    return [];
  }

  const keys: string[] = [];
  const traverse = (items: MenuRecordRaw[]) => {
    items.forEach((item) => {
      if (item.children && item.children.length > 0) {
        keys.push(item.path);
        traverse(item.children);
      }
    });
  };
  traverse(props.menus);
  return keys;
});

function handleMenuSelect(key: string) {
  emit('select', key, props.mode);
}

function handleMenuOpen(key: string, path: string[]) {
  emit('open', key, path);
}
</script>

<template>
  <Menu
    :accordion="accordion"
    :collapse="collapse"
    :collapse-show-title="collapseShowTitle"
    :default-active="defaultActive"
    :default-openeds="defaultOpeneds"
    :menus="menus"
    :mode="mode"
    :rounded="rounded"
    scroll-to-active
    :theme="theme"
    @open="handleMenuOpen"
    @select="handleMenuSelect"
  />
</template>
