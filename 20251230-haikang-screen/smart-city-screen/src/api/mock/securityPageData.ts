export type SecurityPageDataType = {
  accessLogs: {
    header: string[]
    data: string[][]
    rowNum: number
    headerBGC: string
    oddRowBGC: string
    evenRowBGC: string
  }
  alarmLogs: {
    header: string[]
    data: string[][]
    rowNum: number
    headerBGC: string
    oddRowBGC: string
    evenRowBGC: string
  }
  deviceStats: {
    onlineCount: number
    onlineRate: string
  }
  aiAnalysis: {
    noHelmet: string
    illegalParking: string
  }
}

const securityPageData: SecurityPageDataType = {
  accessLogs: {
    header: ['时间', '位置', '人员/车辆', '类型'],
    data: [
      ['10:23:45', '东大门', '鄂A88888', '<span style="color:#50e3c2">车辆进场</span>'],
      ['10:21:12', '研发楼A座', '张三', '人员刷卡'],
      ['10:18:05', '地下车库', '鄂A66666', '<span style="color:#e3b337">车辆出场</span>'],
      ['10:15:30', '访客中心', '李四', '访客登记'],
      ['10:10:22', '西侧门', '王五', '人员刷卡'],
      ['10:05:18', '东大门', '鄂A99999', '<span style="color:#50e3c2">车辆进场</span>'],
      ['09:58:44', '研发楼B座', '赵六', '人员刷卡'],
    ],
    rowNum: 7,
    headerBGC: 'rgba(0,0,0,0)',
    oddRowBGC: 'rgba(0,0,0,0)',
    evenRowBGC: 'rgba(0,0,0,0)',
  },
  alarmLogs: {
    header: ['类型', '时间', '状态'],
    data: [
      ['<span style="color:red">越界报警</span>', '10:01', '未处理'],
      ['<span style="color:orange">黑名单</span>', '09:45', '处理中'],
      ['<span style="color:yellow">设备离线</span>', '08:30', '已恢复'],
      ['<span style="color:red">火灾预警</span>', '08:15', '已处理'],
      ['<span style="color:orange">非法入侵</span>', '07:20', '已处理'],
      ['<span style="color:orange">重点人员</span>', '07:10', '已处理'],
      ['<span style="color:yellow">车辆违停</span>', '06:55', '未处理'],
      ['<span style="color:red">越界报警</span>', '06:30', '已恢复'],
      ['<span style="color:yellow">设备离线</span>', '05:45', '已处理'],
      ['<span style="color:orange">徘徊检测</span>', '05:20', '处理中'],
      ['<span style="color:red">烟雾报警</span>', '04:15', '已处理'],
      ['<span style="color:orange">紧急求助</span>', '03:30', '已处理'],
      ['<span style="color:red">门禁强开</span>', '02:10', '已处理'],
      ['<span style="color:yellow">车辆违停</span>', '01:45', '未处理'],
    ],
    rowNum: 5,
    headerBGC: 'rgba(0,0,0,0)',
    oddRowBGC: 'rgba(0,0,0,0)',
    evenRowBGC: 'rgba(0,0,0,0)',
  },
  deviceStats: {
    onlineCount: 1245,
    onlineRate: '98.5%'
  },
  aiAnalysis: {
    noHelmet: '15%',
    illegalParking: '30%'
  }
}

export default securityPageData
