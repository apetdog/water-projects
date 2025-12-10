<script lang="ts" setup>
import {
  Button,
  Dropdown,
  Input,
  Menu,
  Select,
  Table,
} from 'ant-design-vue';
import { ref } from 'vue';

import DeviceTree from '../../components/DeviceTree.vue';

import { deviceList } from '../../mock/device';

const searchType = ref('address');
const searchText = ref('');

const columns = [
  { title: '单位', dataIndex: 'unit', key: 'unit', width: 100 },
  { title: '地址码', dataIndex: 'address', key: 'address', width: 120 },
  { title: '名称', dataIndex: 'name', key: 'name', width: 150 },
  { title: '安装位置', dataIndex: 'location', key: 'location', width: 150 },
  { title: '安装日期', dataIndex: 'installDate', key: 'installDate', width: 150 },
  { title: 'ICCID', dataIndex: 'iccid', key: 'iccid', width: 180 },
  { title: 'Version', dataIndex: 'version', key: 'version', width: 180 },
  { title: 'OPC标识名', dataIndex: 'opcName', key: 'opcName', width: 120 },
  { title: '联系人', dataIndex: 'contact', key: 'contact', width: 100 },
  { title: '联系电话', dataIndex: 'phone', key: 'phone', width: 120 },
  { title: '排序', dataIndex: 'sort', key: 'sort', width: 80 },
];

const data = deviceList;

const rowSelection = {
  onChange: (selectedRowKeys: (string | number)[], selectedRows: any[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};
</script>

<template>
  <div class="flex h-full p-4 gap-4">
    <!-- Left Sidebar -->
    <div class="w-[300px] flex-shrink-0">
      <DeviceTree />
    </div>

    <!-- Right Content -->
    <div class="flex-1 flex flex-col bg-white rounded-xl shadow-sm dark:bg-black/85 p-4 overflow-auto">
      <!-- Search Bar -->
      <div class="mb-4 flex flex-wrap gap-2 items-center">
        <Select v-model:value="searchType" class="w-[120px]">
          <Select.Option value="address">地址码</Select.Option>
          <Select.Option value="name">名称</Select.Option>
        </Select>
        <Input v-model:value="searchText" placeholder="请输入要查询关键字" class="w-[200px]" />
        <Button type="primary">
          查询
        </Button>

        <div class="ml-auto flex gap-2">
          <Button>
            刷新
          </Button>
          <Button>
            新增
          </Button>
          <Button>
            编辑
          </Button>
          <Button>
            删除
          </Button>
          <Button>合删除</Button>
          <Dropdown>
            <template #overlay>
              <Menu>
                <Menu.Item key="1">更多操作1</Menu.Item>
                <Menu.Item key="2">更多操作2</Menu.Item>
              </Menu>
            </template>
            <Button>
              更多
            </Button>
          </Dropdown>
        </div>
      </div>

      <!-- Table -->
      <div class="flex-1">
        <Table
          :columns="columns"
          :data-source="data"
          :row-selection="rowSelection"
          size="small"
          :pagination="{ pageSize: 15, showTotal: (total) => `检索到 ${total} 条, 当前页 1-1 条, 查询耗时 221 毫秒`, showSizeChanger: true, pageSizeOptions: ['10', '15', '20', '50', '200'] }"
          :scroll="{ x: 1500 }"
        />
      </div>
    </div>
  </div>
</template>
