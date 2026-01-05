export type VideoPageDataType = {
  captureRecords: {
    plate: string
    time: string
    type: string
  }[]
  storageStats: {
    usage: string
    remainingDays: string
  }
  qualityDiagnosis: {
    header: string[]
    data: string[][]
    rowNum: number
    headerBGC: string
    oddRowBGC: string
    evenRowBGC: string
  }
}

const videoPageData: VideoPageDataType = {
  captureRecords: [
    { plate: '鄂A88888', time: '10:23', type: '车辆' },
    { plate: '人脸识别', time: '10:22', type: '人员' },
    { plate: '鄂A66666', time: '10:20', type: '车辆' },
    { plate: '鄂A99999', time: '10:15', type: '车辆' },
    { plate: '鄂A12345', time: '10:12', type: '车辆' },
    { plate: '人脸识别', time: '10:10', type: '人员' },
    { plate: '鄂A54321', time: '10:08', type: '车辆' },
    { plate: '人脸识别', time: '10:05', type: '人员' },
    { plate: '鄂B88888', time: '10:03', type: '车辆' },
    { plate: '鄂C12345', time: '10:00', type: '车辆' },
    { plate: '人脸识别', time: '09:58', type: '人员' },
    { plate: '鄂D56789', time: '09:55', type: '车辆' }
  ],
  storageStats: {
    usage: '85%',
    remainingDays: '15天'
  },
  qualityDiagnosis: {
    header: ['设备ID', '问题'],
    data: [
      ['CAM_03', '<span style="color:red">信号丢失</span>'],
      ['CAM_09', '<span style="color:orange">画面模糊</span>'],
      ['CAM_12', '<span style="color:yellow">亮度异常</span>'],
      ['CAM_15', '<span style="color:red">网络中断</span>'],
    ],
    rowNum: 5,
    headerBGC: 'rgba(0,0,0,0)',
    oddRowBGC: 'rgba(0,0,0,0)',
    evenRowBGC: 'rgba(0,0,0,0)',
  }
}

export default videoPageData
