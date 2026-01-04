interface DeviceItem {
  key: string;
  unit: string;
  address: string;
  name: string;
  location: string;
  installDate: string;
  iccid: string;
  version: string;
  opcName: string;
  contact: string;
  phone: string;
  sort: number;
}

const baseDeviceList: DeviceItem[] = [
  {
    key: '1',
    unit: '',
    address: '002512010117',
    name: '002512010117',
    location: '',
    installDate: '2026-01-02 00:00',
    iccid: '898608121923C0684396',
    version: 'SL-GW08GW0X_20251120_2',
    opcName: '',
    contact: '',
    phone: '',
    sort: 0,
  },
];

const generatedDeviceList: DeviceItem[] = Array.from({ length: 17 }).map((_, index) => {
  const id = index + 2;
  return {
    key: `${id}`,
    unit: '',
    address: `0025120101${17 + index}`,
    name: `0025120101${17 + index}`,
    location: `模拟位置 ${id}`,
    installDate: '2026-01-02 00:00',
    iccid: `898608121923C06843${96 + index}`,
    version: 'SL-GW08GW0X_20251120_2',
    opcName: '',
    contact: `联系人 ${id}`,
    phone: `138000000${id.toString().padStart(2, '0')}`,
    sort: index + 1,
  };
});

export const deviceList: DeviceItem[] = [...baseDeviceList, ...generatedDeviceList];
