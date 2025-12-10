// 1. 大坝概览数据
export const overviewData = {
  left: {
    config: {
      overviewTitle: "气象概况",
      monitoringPointsLabel: "监测点",
      detectorsLabel: "探测器",
      avgRainfallLabel: "平均降雨",
      fireAlertsLabel: "火灾告警",
      totalAlertsLabel: "预警总数",
      monitorTitle: "气象监测",
      hydrologyTitle: "水文信息",
      hydrologyLabels: {
        maxWaterLevel: "最高库水位",
        maxWaterLevelTime: "监测时间",
        outboundPeakFlow: "出库洪峰",
        storageFlow: "拦蓄洪量",
        monitorWaterLevel: "监测库水位",
        damElevation: "大坝高程"
      },
      colors: {
        fireAlerts: "#ff4d4f",
        totalAlerts: "#faad14"
      }
    },
    weatherOverview: {
      monitoringPoints: 12,
      detectors: 217,
      avgRainfall: 135, // mm
      fireAlerts: 1,
      abnormalAlerts: 216,
      totalAlerts: 216 // 新增：预警总数
    },
    weatherMonitor: {
      config: [
        { key: "waterLevelAlerts", label: "监管区域水位", icon: "🌊" },
        { key: "waterQualityAlerts", label: "水质告警", icon: "💧" },
        { key: "mountainTorrentAlerts", label: "山洪预警", icon: "⚠️" },
        { key: "sunRadiationAlerts", label: "太阳辐射告警", icon: "☀️" }
      ],
      data: {
        waterLevelAlerts: 5,
        waterQualityAlerts: 9,
        mountainTorrentAlerts: 2,
        damDisplacementAlerts: 1,
        sunRadiationAlerts: 1, // 新增：太阳辐射告警
      },
      hydrology: {
        maxWaterLevel: '1541m',
        maxWaterLevelTime: '2024.05.13 14:37',
        outboundPeakFlow: '4.21m³/s',
        storageFlow: '1435.19万m³/s',
        highestReservoirLevel: '93%',
        endWaterLevel: '980.47m',
        monitorWaterLevel: '1541m', // 新增：监测库水位
        damElevation: '988.47m' // 新增：大坝高程
      }
    }
  },
  right: {
    config: {
      extremeWeatherTitle: "极端天气监测",
      extremeWeatherUnit: "个",
      waterLevelCurveTitle: "水位曲线",
      overviewTableTitle: "概览图表",
      overviewTableHeader: ["名称", "水位", "流量"],
      weatherStats: [
        { key: "heavyRain", label: "大雨", icon: "🌧️" },
        { key: "storm", label: "暴雨", icon: "⛈️" },
        { key: "thunderstorm", label: "雷暴雨", icon: "🌩️" },
        { key: "severeStorm", label: "特大暴雨", icon: "🌊" }
      ]
    },
    extremeWeather: {
      heavyRain: 8,
      storm: 2,
      thunderstorm: 4,
      severeStorm: 1
    },
    waterLevelCurve: {
      xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data1: [120, 132, 101, 134, 90, 230, 210],
      data2: [220, 182, 191, 234, 290, 330, 310]
    },
    overviewTable: [
      { id: 1, name: 'XX站点', waterLevel: '105.72m', flow: '130.82m³', time: '05-12' },
      { id: 2, name: 'XX站点', waterLevel: '105.72m', flow: '130.82m³', time: '05-12' },
      { id: 3, name: 'XX站点', waterLevel: '105.72m', flow: '130.82m³', time: '05-12' },
      { id: 4, name: 'XX站点', waterLevel: '105.72m', flow: '130.82m³', time: '05-12' },
      { id: 5, name: 'XX站点', waterLevel: '105.72m', flow: '130.82m³', time: '05-12' }
    ]
  }
}

// 2. 内部结构数据
export const structureData = {
  left: {
    config: {
      warningStatsTitle: "气象预警统计",
      totalWarningLabel: "预警总数",
      totalWarningUnit: "个",
      waterLevelWarningTitle: "水位预警",
      waterLevelWarningHeader: ["名称", "时间", "水位", "状态"]
    },
    weatherWarningStats: {
      total: 8,
      details: [
        { name: '超警戒水位', count: 5 },
        { name: '异常告警', count: 0 },
        { name: '台风告警', count: 2 },
        { name: '大坝辐射告警', count: 1 }
      ],
      icons: ['🌊', '⚠️', '🌀', '☢️'] // 新增：图标
    },
    waterLevelWarning: [
      { name: '地点A', time: '2024-05-12', waterLevel: '15.38m', status: '高危' },
      { name: '地点A', time: '2024-05-12', waterLevel: '15.38m', status: '正常' },
      { name: '地点A', time: '2024-05-12', waterLevel: '5.38m', status: '低保证' },
      { name: '地点A', time: '2024-05-12', waterLevel: '15.38m', status: '高危' },
      { name: '地点A', time: '2024-05-12', waterLevel: '15.38m', status: '高危' },
      { name: '地点A', time: '2024-05-12', waterLevel: '15.38m', status: '高危' }
    ]
  },
  right: {
    config: {
      rainWarningStatsTitle: "降雨预警统计",
      rainWarningUnit: "个",
      rainWarningListTitle: "降雨预警列表",
      rainWarningListHeader: ["名称", "开始时间", "结束时间", "等级"],
      rainWarningTotalLabel: "预警总数",
      stats: [
        { key: "heavyRain", label: "大雨", icon: "🌧️" },
        { key: "storm", label: "暴雨", icon: "⛈️" },
        { key: "thunderstorm", label: "雷暴雨", icon: "🌩️" },
        { key: "severeStorm", label: "特大暴雨", icon: "🌊" }
      ]
    },
    rainWarningStats: {
      total: 15,
      details: {
        heavyRain: 8,
        storm: 2,
        thunderstorm: 4,
        severeStorm: 1
      }
    },
    rainWarningList: [
      { name: '地点A', start: '3月7日', end: '5月2日', level: '中雨' },
      { name: '地点A', start: '3月7日', end: '5月2日', level: '大暴雨' },
      { name: '地点A', start: '3月7日', end: '5月2日', level: '中雨' },
      { name: '地点A', start: '3月7日', end: '5月2日', level: '暴雨' },
      { name: '地点A', start: '3月7日', end: '5月2日', level: '中雨' },
      { name: '地点A', start: '3月7日', end: '5月2日', level: '中雨' }
    ]
  }
}

// 3. 发电机组数据
export const generatorData = {
  left: {
    config: {
      dispatchPlanTitle: "调度预案",
      alertInfoLabel: "• 告警信息",
      dispatchPlanLabels: {
        maxWaterLevel: "最高库水位",
        maxWaterLevelTime: "最高库水位时间",
        outboundPeakFlow: "出库洪峰",
        storageFlow: "拦蓄洪量",
        highestReservoirLevel: "最高库水位",
        endWaterLevel: "末期水位"
      },
      dispatchResultTitle: "调度结果",
      dispatchCompletionLabel: "完成率",
      dispatchResultLabels: {
        inflow: "入库洪峰流量",
        retention: "超汛限水位",
        outflow: "出库总流量",
        ecologicalFlow: "生态流量"
      },
      responseMeasuresTitle: "响应措施",
      evacuationRoutesTitle: "撤离路线",
      evacuationRoutesHeader: ["序号", "起点", "终点", "状态"]
    },
    dispatchPlan: {
      maxWaterLevel: '1541m',
      maxWaterLevelTime: '2024.05.13 14:37',
      outboundPeakFlow: '4.21m³/s',
      storageFlow: '1435.19万m³/s',
      highestReservoirLevel: '93%',
      endWaterLevel: '980.47m'
    },
    dispatchResult: {
      inflow: '310.15 m³/s',
      outflow: '13.45 m³/s',
      retention: '1190.05m',
      ecologicalFlow: '21.09 m³/s',
      gaugeValue: 75 // 新增：仪表盘数值
    },
    responseMeasures: '工程区域做好警戒准备，注意疏散人群，下游居民975m以上居民做好车里准备，注意相关撤离路线，人员保障组和相关人员做好指挥调度',
    evacuationRoutes: [
      { id: 1, start: '起点01', end: '终点03' },
      { id: 2, start: '起点01', end: '终点03' },
      { id: 3, start: '起点01', end: '终点03' },
      { id: 4, start: '起点01', end: '终点03' }
    ]
  },
  right: {
    config: {
      personnelTitle: "人员保障",
      materialTitle: "物资保障",
      commTitle: "通信保障",
      personnelHeader: ["人员", "单位", "职务", "电话"],
      materialHeader: ["名称", "数量", "单位", "地区"]
    },
    personnelSupport: [
      { name: 'XXX', unit: '防汛公司', job: '组长', phone: 'xxxxxxxxxxx' },
      { name: 'XXX', unit: '防汛公司', job: '组长', phone: 'xxxxxxxxxxx' },
      { name: 'XXX', unit: '防汛公司', job: '副组长', phone: 'xxxxxxxxxxx' },
      { name: 'XXX', unit: '防汛公司', job: '副组长', phone: 'xxxxxxxxxxx' },
      { name: 'XXX', unit: '防汛公司', job: '组长', phone: 'xxxxxxxxxxx' }
    ],
    materialSupport: [
      { name: '救生衣', count: 5435, unit: '件', area: '仓储区域01' },
      { name: '帐篷', count: 3435, unit: '个', area: '仓储区域07' },
      { name: '冲锋舟', count: 325, unit: '艘', area: '仓储区域31' },
      { name: '应急食品', count: 15435, unit: '箱', area: '仓储区域12' }
    ],
    commSupport: [
      '各级单位可通过手机和固定电话进行通信，网络覆盖整个建设区域，各施工单位配备对讲机，用于施工区域内通信，确保基站稳定',
      '卫星电话: xxxxxxxxxx',
      '值班热线: xxxxxxxxxx'
    ]
  }
}

// 4. 顶部数据
export const topData = {
  title: '智慧大坝水利平台',
  weekday: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  tabs: [
    { key: 'overview', label: '大坝概览' },
    { key: 'structure', label: '内部结构' },
    { key: 'generator', label: '发电机组' }
  ],
  config: {
    decoration8Color: ['#568aea', '#000000'],
    decoration6Color: ['#50e3c2', '#67a1e5']
  }
}

export const projectData = {
  overview: overviewData,
  structure: structureData,
  generator: generatorData,
  top: topData
}

