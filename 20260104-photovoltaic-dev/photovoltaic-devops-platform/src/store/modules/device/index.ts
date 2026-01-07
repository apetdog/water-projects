import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { SetupStoreId } from '@/enum';

export type DeviceStatus = 'normal' | 'serious' | 'accident';

export interface Device {
  id: string;
  name: string;
  factory: string;
  model: string;
  status: DeviceStatus;
  power: string;
  type: string;
  deviceType: 'inverter' | 'pv-panel' | 'sensor' | 'other';
}

export const useDeviceStore = defineStore(SetupStoreId.Device, () => {
  const devices = ref<Device[]>([
    {
      id: '101001400001',
      name: '安科瑞A楼5F',
      factory: '阳光电源股份有限公司',
      model: 'SG33CX-2P-CN',
      status: 'normal',
      power: '33kW',
      type: '组串',
      deviceType: 'inverter'
    },
    {
      id: '101001400002',
      name: '安科瑞B楼3F',
      factory: '江苏固德威电源科技有限公司',
      model: 'GW20K-DT',
      status: 'normal',
      power: '20kW',
      type: '组串',
      deviceType: 'inverter'
    },
    {
      id: '101001400003',
      name: '安科瑞E楼6F',
      factory: '锦浪科技股份有限公司',
      model: 'GCI-3P20K-5G',
      status: 'serious',
      power: '20kW',
      type: '组串',
      deviceType: 'inverter'
    },
    {
      id: '202001400001',
      name: '光伏板阵列 A-1',
      factory: '隆基乐叶光伏科技有限公司',
      model: 'Hi-MO 5',
      status: 'accident',
      power: '550W',
      type: '单晶硅',
      deviceType: 'pv-panel'
    },
    {
      id: '303001400001',
      name: '环境监测仪 #1',
      factory: '锦州阳光气象科技有限公司',
      model: 'TRM-ZS1',
      status: 'normal',
      power: 'N/A',
      type: '气象站',
      deviceType: 'sensor'
    }
  ]);

  const statusCounts = computed(() => ({
    normal: devices.value.filter(i => i.status === 'normal').length,
    serious: devices.value.filter(i => i.status === 'serious').length,
    accident: devices.value.filter(i => i.status === 'accident').length
  }));

  return {
    devices,
    statusCounts
  };
});
