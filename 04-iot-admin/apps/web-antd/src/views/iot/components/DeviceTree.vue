<script lang="ts" setup>
import type { TreeProps } from 'ant-design-vue';
import { Input, Tree } from 'ant-design-vue';
import { ref, watch } from 'vue';

const expandedKeys = ref<(string | number)[]>(['0-0', '0-0-0']);
const selectedKeys = ref<(string | number)[]>(['0-0-0-0']);
const searchValue = ref<string>('');
const autoExpandParent = ref<boolean>(true);

const treeData: TreeProps['treeData'] = [
  {
    title: 'IoT监测点水位计',
    key: '0-0',
    children: [
      {
        title: '002512010117',
        key: '0-0-0',
        children: [
          { title: '水黑液位', key: '0-0-0-0' },
          { title: '雨量计', key: '0-0-0-1' },
        ],
      },
    ],
  },
];

const onExpand = (keys: (string | number)[]) => {
  expandedKeys.value = keys;
  autoExpandParent.value = false;
};

watch(searchValue, (value) => {
  const expanded = dataList
    .map((item) => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, treeData);
      }
      return null;
    })
    .filter((item, i, self) => item && self.indexOf(item) === i);
  expandedKeys.value = expanded as string[];
  searchValue.value = value;
  autoExpandParent.value = true;
});

// Helper to flatten tree data for search
const dataList: { key: string; title: string }[] = [];
const generateList = (data: TreeProps['treeData']) => {
  for (let i = 0; i < (data?.length || 0); i++) {
    const node = data?.[i];
    const key = node?.key as string;
    dataList.push({ key, title: node?.title as string });
    if (node?.children) {
      generateList(node.children);
    }
  }
};
generateList(treeData);

const getParentKey = (
  key: string,
  tree: TreeProps['treeData'],
): string | undefined => {
  let parentKey;
  for (let i = 0; i < (tree?.length || 0); i++) {
    const node = tree?.[i];
    if (node?.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey as string;
};
</script>

<template>
  <div class="flex flex-col h-full bg-white p-2 rounded-xl shadow-sm dark:bg-black/85">
    <div class="mb-2">
      <Input.Search
        v-model:value="searchValue"
        placeholder="请输入关键字"
      />
    </div>
    <div class="flex-1 overflow-auto">
      <Tree
        v-model:expanded-keys="expandedKeys"
        v-model:selected-keys="selectedKeys"
        :tree-data="treeData"
        :auto-expand-parent="autoExpandParent"
        @expand="onExpand"
      >
        <template #title="{ title }">
          <span v-if="title.indexOf(searchValue) > -1">
            {{ title.substr(0, title.indexOf(searchValue)) }}
            <span class="text-red-500">{{ searchValue }}</span>
            {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
          </span>
          <span v-else>{{ title }}</span>
        </template>
      </Tree>
    </div>
  </div>
</template>
