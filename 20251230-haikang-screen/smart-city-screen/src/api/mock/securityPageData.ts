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
    eventDistribution: Array<{ name: string; value: number }>
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
      ['09:55:10', '东大门', '鄂A77777', '<span style="color:#50e3c2">车辆进场</span>'],
      ['09:52:33', '研发楼C座', '孙七', '人员刷卡'],
      ['09:48:12', '地下车库', '鄂A55555', '<span style="color:#e3b337">车辆出场</span>'],
      ['09:45:50', '访客中心', '周八', '访客登记'],
      ['09:42:18', '北侧门', '吴九', '人员刷卡'],
      ['09:38:05', '东大门', '鄂A33333', '<span style="color:#50e3c2">车辆进场</span>'],
      ['09:35:12', '研发楼A座', '郑十', '人员刷卡'],
      ['09:30:45', '南小门', '钱十一', '人员刷卡'],
      ['09:28:10', '地下车库', '鄂A22222', '<span style="color:#e3b337">车辆出场</span>'],
      ['09:25:33', '访客中心', '孙十二', '访客登记'],
      ['09:20:18', '东大门', '鄂A11111', '<span style="color:#50e3c2">车辆进场</span>'],
      ['09:15:44', '研发楼B座', '李十三', '人员刷卡'],
      ['09:10:22', '西侧门', '周十四', '人员刷卡'],
      ['09:05:10', '东大门', '鄂A00000', '<span style="color:#50e3c2">车辆进场</span>'],
      ['09:00:00', '研发楼C座', '吴十五', '人员刷卡'],
      ['08:55:30', '地下车库', '鄂B88888', '<span style="color:#e3b337">车辆出场</span>'],
      ['08:50:15', '访客中心', '郑十六', '访客登记'],
      ['08:45:20', '北侧门', '王十七', '人员刷卡'],
      ['08:40:05', '东大门', '鄂B66666', '<span style="color:#50e3c2">车辆进场</span>'],
      ['08:35:12', '研发楼A座', '冯十八', '人员刷卡'],
      ['08:30:45', '南小门', '陈十九', '人员刷卡'],
      ['08:25:10', '地下车库', '鄂B22222', '<span style="color:#e3b337">车辆出场</span>'],
      ['08:20:33', '访客中心', '褚二十', '访客登记'],
      ['08:15:10', '东大门', '鄂B11111', '<span style="color:#50e3c2">车辆进场</span>'],
      ['08:10:44', '研发楼B座', '卫二十一', '人员刷卡'],
      ['08:05:22', '西侧门', '蒋二十二', '人员刷卡'],
      ['08:00:00', '东大门', '鄂B00000', '<span style="color:#50e3c2">车辆进场</span>'],
    ],
    rowNum: 10,
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
    eventDistribution: [
      { name: '非法入侵', value: 40 },
      { name: '人员聚集', value: 30 },
      { name: '车辆违停', value: 20 },
      { name: '离岗检测', value: 15 },
      { name: '未戴安全帽', value: 10 },
      { name: '烟火检测', value: 5 }
    ]
  }
}

export default securityPageData
