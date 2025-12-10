/**
 * 面板配置表 - 模块分组结构
 * 
 * 【功能说明】
 * 本配置文件用于统一管理6个可视化面板模块的所有可配置项，包括：
 * - 文字内容（标题、标签、单位等）
 * - 数字数据（统计数据、图表数据等）
 * - 颜色配置（文字颜色、图表颜色等）
 * - ECharts 图表配置（颜色、文字大小等）
 * 
 * 【使用方式】
 * 1. 直接修改本文件中的配置值即可生效
 * 2. 无需修改组件代码，所有组件会自动读取此配置
 * 3. 建议修改前先备份，避免误操作
 * 
 * 【配置结构】
 * 每个模块包含以下部分：
 * - text: 文字配置（所有显示的文字内容）
 * - numbers: 数字配置（统计数据、图表数据等）
 * - colors: 颜色配置（包括 ECharts 图表颜色）
 * - echartsTextSize: ECharts 图表文字大小配置（可选）
 * 
 * 【ECharts 配置说明】
 * ECharts 是用于绘制图表的库，本配置中的 echarts 相关配置包括：
 * - 图表颜色：控制图表线条、柱状图、饼图等元素的颜色
 * - 坐标轴颜色：控制 X 轴、Y 轴的标签和线条颜色
 * - 文字大小：控制图表中所有文字的大小（坐标轴标签、单位等）
 * 
 * 【注意事项】
 * - 颜色值支持格式：#ffffff（十六进制）、rgba(255,255,255,0.5)（RGBA）
 * - 文字大小单位为像素（px）
 * - 修改配置后需要刷新页面才能看到效果
 */

/**
 * 面板配置对象
 * 包含6个模块的完整配置信息
 */
export const PANEL_CONFIG = {
  /**
   * ========================================
   * top-content - 人口统计面板
   * ========================================
   * 模块位置：左侧顶部面板
   * 组件文件：src/components/LeftTopPopulationPanel.vue
   * 图表类型：饼图（Pie Chart）
   * 
   * 【图表说明】
   * 显示人口统计数据，使用饼图展示不同人群的占比
   * 中心显示总人口数，周围显示各分类的详细数据
   */
  topContent: {
    // ========== 文字配置 ==========
    title: '人口数据',
    text: {
      // 顶部标题文字，显示统计日期和标题
      date: "截至2024/11/8，人口总数：",
      // 饼图中心下方的标签文字
      totalLabel: "人口总数",
      // 单位文字（如：人、个、万等）
      unit: "人"
    },
    
    // ========== 人口统计数据数组 ==========
    // 每个统计项包含：名称、数值、单位、文字大小、文字颜色
    stats: [
      {
        name: "原著居民",           // 分类名称
        value: 5492,                // 人口数量
        unit: "人",                 // 单位
        textSize: {
          name: "0.7vw",            // 图例中名称文字大小
          value: "1.3vw",          // 图例中数值文字大小
          unit: "0.7vw"             // 单位文字大小
        },
        textColor: {
          name: "#8ad7ff",          // 图例中名称文字颜色（浅蓝色）
          value: "#ffffff",         // 图例中数值文字颜色（白色）
          unit: "#ffffff"          // 单位文字颜色（白色）
        },
        echartsColor: "#22c3f7"     // ECharts 饼图扇形颜色（蓝色）
      },
      {
        name: "常住居民",
        value: 9431,
        unit: "人",
        textSize: {
          name: "0.7vw",
          value: "1.3vw",
          unit: "0.7vw"
        },
        textColor: {
          name: "#8ad7ff",
          value: "#ffffff",
          unit: "#ffffff"
        },
        echartsColor: "#1fe5b5"     // ECharts 饼图扇形颜色（青色）
      },
      {
        name: "外籍居民",
        value: 7638,
        unit: "人",
        textSize: {
          name: "0.7vw",
          value: "1.3vw",
          unit: "0.7vw"
        },
        textColor: {
          name: "#8ad7ff",
          value: "#ffffff",
          unit: "#ffffff"
        },
        echartsColor: "#00d5ff"     // ECharts 饼图扇形颜色（浅蓝色）
      },
      {
        name: "未普查",
        value: 1057,
        unit: "人",
        textSize: {
          name: "0.7vw",
          value: "1.3vw",
          unit: "0.7vw"
        },
        textColor: {
          name: "#8ad7ff",
          value: "#ffffff",
          unit: "#ffffff"
        },
        echartsColor: "#ff9800"     // ECharts 饼图扇形颜色（橙色）
      }
    ],
    
    // ========== 总数配置 ==========
    total: {
      value: null,                  // 总数数值（如果为 null 则自动计算所有 stats value 的总和）
      textColor: {
        value: "#f0a00a",          // 饼图中心显示的总数文字颜色（金色）
        label: "#ffffff"         // "人口总数"标签文字颜色（白色）
      },
      textSize: {
        value: 24,                 // 饼图中心显示的总人口数文字大小（较大的数字，单位：px）
        label: 10                  // 饼图中心下方的"人口总数"标签文字大小（较小的标签，单位：px）
      }
    }
    // 提示：如果 total.value 为 null，会自动计算所有 stats value 的总和
  },

  /**
   * ========================================
   * ly-left-center - 流量折线图面板
   * ========================================
   * 模块位置：左侧中间面板
   * 组件文件：src/components/LeftCenterFlowPanel.vue
   * 图表类型：折线图（Line Chart）带面积填充
   * 
   * 【图表说明】
   * 显示流量随时间的变化趋势，使用折线图展示数据变化
   * X 轴：时间点（如 00:00, 02:00 等）
   * Y 轴：流量数值（单位：K，即千）
   * 折线下方有渐变填充区域，增强视觉效果
   */
  leftCenter: {
    // ========== 文字配置 ==========
    title: '违规行驶',
    text: {
      // Y 轴单位标签文字（显示在 Y 轴左侧）
      // 例如："单位(K)" 表示以千为单位
      yAxisUnit: "单位(K)"
    },
    
    // ========== 数字配置 ==========
    numbers: {
      // X 轴时间点数组（横坐标数据）
      // 数组长度需与 flowData 数组长度一致
      times: ["00:00", "02:00", "04:00", "08:00", "10:00", "12:00", "16:00", "20:00", "22:00"],
      
      // Y 轴流量数据数组（纵坐标数据）
      // 每个数值对应一个时间点的流量值
      // 数组长度需与 times 数组长度一致
      flowData: [20, 85, 60, 115, 105, 155, 145, 200, 120],
      
      // Y 轴最大值（图表显示的上限）
      // 用于控制 Y 轴的显示范围，建议设置为略大于 flowData 中的最大值
      maxValue: 220,
      
      // 标记点数据（图表上的特殊标记点）
      // coord: [x坐标值, y坐标值]
      // 例如：["10:00", 105] 表示在 10:00 时间点、流量值 105 的位置显示标记
      markPointData: { coord: ["10:00", 105] }
    },
    
    // ========== 颜色配置 ==========
    colors: {
      // ===== ECharts 折线图颜色配置 =====
      echarts: {
        // 鼠标悬停时显示的指示线颜色（跟随鼠标的竖线）
        axisPointer: "#3ec4ff",
        
        // 折线颜色（主线条的颜色）
        line: "#1e6bd6",
        
        // 折线下方填充区域的颜色（渐变效果）
        area: {
          start: "rgba(30,107,214,0.6)",  // 渐变起始颜色（上方，较深）
          end: "rgba(30,107,214,0.0)"      // 渐变结束颜色（下方，透明）
          // 从上方的不透明蓝色渐变到下方的完全透明
        },
        
        // 标记点样式（图表上的特殊标记点）
        markPoint: {
          color: "#ffffff",                    // 标记点的颜色（白色圆点）
          shadowColor: "rgba(255,255,255,0.6)" // 标记点的阴影颜色（白色半透明光晕）
        }
      },
      
      // ===== 坐标轴和网格线颜色 =====
      axisLabel: "#cde7ff",                    // X 轴和 Y 轴标签文字颜色（浅蓝色）
      axisLine: "rgba(255,255,255,0.2)",      // 坐标轴线颜色（白色半透明）
      splitLine: "rgba(255,255,255,0.04)",    // 网格分割线颜色（白色极淡）
      yAxisUnit: "#cde7ff"                     // Y 轴单位文字颜色（浅蓝色）
    },
    
    // ========== ECharts 图表文字大小配置 ==========
    // 控制图表中所有文字的大小（单位：像素 px）
    echartsTextSize: {
      xAxisLabel: 12,    // X 轴坐标文字大小（时间点文字，如 "00:00"）
      yAxisLabel: 12,    // Y 轴坐标文字大小（数值文字，如 "50"、"100"）
      yAxisUnit: 12      // Y 轴单位文字大小（"单位(K)" 文字）
    }
    // 提示：如果坐标轴文字显示不清楚，可以适当增大这些数值
  },

  /**
   * ========================================
   * ly-left-bottom - 事件时间线面板
   * ========================================
   * 模块位置：左侧底部面板
   * 组件文件：src/components/LeftBottomEventTimeline.vue
   * 图表类型：时间线列表（非 ECharts 图表）
   * 
   * 【功能说明】
   * 显示事件列表，按时间倒序排列
   * 每个事件卡片显示：时间、标题、状态、操作按钮
   * 不同状态的事件使用不同颜色的边框和背景
   */
  leftBottom: {
    // ========== 文字配置 ==========
    title: '事件信息',
    text: {
      // 状态标签文字映射
      // 将状态代码转换为中文显示文字
      statusLabels: {
        pending: "待处理",   // 待处理状态
        resolved: "已处理",  // 已处理状态
        expired: "已过时"    // 已过时状态
      },
      // 状态文字前缀（显示在状态标签前）
      statusPrefix: "状态：",
      // 上报时间文字前缀（显示在上报时间前）
      reportTimePrefix: "上报时间："
    },
    
    // ========== 事件列表数组 ==========
    // 每个事件包含：时间、状态、标题、上报时间、操作按钮、文字大小、文字颜色
    events: [
      {
        time: "09月23日 22:15:53",        // 显示时间（格式：月日 时:分:秒）
        status: "pending",                 // 事件状态（pending/resolved/expired）
        title: "事件：南区正门马路车辆占道违停，请立即处理！",  // 事件标题
        reportTime: "2022/09/23 22:15:53", // 上报时间（格式：年/月/日 时:分:秒）
        action: "立即处理",                 // 操作按钮文字
        textSize: {
          time: "0.5vw",                   // 时间文字大小
          title: "0.7vw",                  // 标题文字大小
          subtitle: "0.625vw",            // 副标题文字大小（状态、上报时间）
          action: "0.521vw"               // 操作按钮文字大小
        },
        textColor: {
          time: "#cde7ff",                 // 时间文字颜色（浅蓝色）
          title: "#ffffff",                 // 标题文字颜色（白色）
          subtitle: "rgba(255, 255, 255, 0.6)", // 副标题文字颜色（白色半透明）
          action: "rgba(255, 255, 255, 0.9)"   // 操作按钮文字颜色（白色半透明）
        },
        statusStyle: {
          bg: "rgba(37, 72, 80, 0.5)",     // 背景色（深青色半透明）
          border: "#82c5c8"                 // 边框色（青色）
        }
      },
      {
        time: "09月23日 12:37:45",
        status: "resolved",
        title: "事件：北区15巷拐角车辆违停",
        reportTime: "2022/09/23 12:37:45",
        action: "生成工单",
        textSize: {
          time: "0.5vw",
          title: "0.7vw",
          subtitle: "0.625vw",
          action: "0.521vw"
        },
        textColor: {
          time: "#cde7ff",
          title: "#ffffff",
          subtitle: "rgba(255, 255, 255, 0.6)",
          action: "rgba(255, 255, 255, 0.9)"
        },
        statusStyle: {
          bg: "rgba(37, 72, 80, 0.5)",
          border: "#81c5c8"                 // 边框色（青色，与待处理略有不同）
        }
      },
      {
        time: "09月23日 15:25:12",
        status: "expired",
        title: "事件：东区入口处电瓶车占道违停！",
        reportTime: "2022/09/23 15:25:12",
        action: "查看事件",
        textSize: {
          time: "0.5vw",
          title: "0.7vw",
          subtitle: "0.625vw",
          action: "0.521vw"
        },
        textColor: {
          time: "#cde7ff",
          title: "#ffffff",
          subtitle: "rgba(255, 255, 255, 0.6)",
          action: "rgba(255, 255, 255, 0.9)"
        },
        statusStyle: {
          bg: "rgba(79, 48, 50, 0.5)",     // 背景色（深红色半透明）
          border: "#f96168"                 // 边框色（红色，表示警告）
        }
      }
    ]
    // 提示：可以添加更多事件，数组会自动渲染
  },

  /**
   * ========================================
   * ly-right-top - 公共设施面板
   * ========================================
   * 模块位置：右侧顶部面板
   * 组件文件：src/components/RightTopFacilitiesPanel.vue
   * 图表类型：数据列表（非 ECharts 图表）
   * 
   * 【功能说明】
   * 显示公共设施统计数据
   * 左侧和右侧各显示3个设施项目
   * 中间显示设施总数
   * 每个设施项目有对应的颜色标识点
   */
  rightTop: {
    // ========== 文字配置 ==========
    title: '公共设施',
    // ========== 设施配置数组 ==========
    // 每个设施项包含：名称、单位、数值、文字大小、文字颜色
    // 前3个显示在左侧，后3个显示在右侧
    facilities: [
      {
        name: "照明设施",           // 设施名称
        unit: "个",                 // 单位
        value: 4729,                // 数值
        textSize: {
          name: "0.7vw",            // 名称文字大小
          unit: "0.7vw",            // 单位文字大小
          value: "1vw"              // 数值文字大小
        },
        textColor: {
          name: "#ff9800",          // 名称文字颜色（橙色，也用于标识点）
          unit: "#cde7ff",          // 单位文字颜色（浅蓝色）
          value: "#ffffff"          // 数值文字颜色（白色）
        }
      },
      {
        name: "垃圾清洁",
        unit: "处",
        value: 136,
        textSize: {
          name: "0.7vw",
          unit: "0.7vw",
          value: "1vw"
        },
        textColor: {
          name: "#ffe600",          // 名称文字颜色（黄色，也用于标识点）
          unit: "#cde7ff",
          value: "#ffffff"
        }
      },
      {
        name: "电力供应",
        unit: "座",
        value: 16,
        textSize: {
          name: "0.7vw",
          unit: "0.7vw",
          value: "1vw"
        },
        textColor: {
          name: "#b79a8a",          // 名称文字颜色（米色，也用于标识点）
          unit: "#cde7ff",
          value: "#ffffff"
        }
      },
      {
        name: "排水排污",
        unit: "个",
        value: 1739,
        textSize: {
          name: "0.7vw",
          unit: "0.7vw",
          value: "1vw"
        },
        textColor: {
          name: "#1fe5b5",          // 名称文字颜色（青色，也用于标识点）
          unit: "#cde7ff",
          value: "#ffffff"
        }
      },
      {
        name: "健身器材",
        unit: "处",
        value: 12,
        textSize: {
          name: "0.7vw",
          unit: "0.7vw",
          value: "1vw"
        },
        textColor: {
          name: "#00c0ff",          // 名称文字颜色（蓝色，也用于标识点）
          unit: "#cde7ff",
          value: "#ffffff"
        }
      },
      {
        name: "智能烟感",
        unit: "个",
        value: 2835,
        textSize: {
          name: "0.7vw",
          unit: "0.7vw",
          value: "1vw"
        },
        textColor: {
          name: "#00b0ff",          // 名称文字颜色（深蓝色，也用于标识点）
          unit: "#cde7ff",
          value: "#ffffff"
        }
      }
    ],
    
    // ========== 总数配置 ==========
    total: {
      value: null,                  // 总数数值（如果为 null 则自动计算所有设施 value 的总和）
      textColor: "#f0a00a",         // 总数文字颜色（金色，显示在中间）
      textSize: "1vw"               // 总数文字大小（显示在中间的总数）
    }
    // 提示：如果 total.value 为 null，会自动计算所有设施 value 的总和
  },

  /**
   * ========================================
   * ly-right-center - 行业柱状图面板
   * ========================================
   * 模块位置：右侧中间面板
   * 组件文件：src/components/RightCenterIndustryBar.vue
   * 图表类型：堆叠柱状图（Stacked Bar Chart）
   * 
   * 【图表说明】
   * 显示各行业的费用支出情况
   * X 轴：行业类别（合计、金融业、建筑业等）
   * Y 轴：费用金额
   * 使用堆叠柱状图，每个行业用不同颜色的柱状图表示
   * 第一个柱状图显示"合计"，后续柱状图显示各行业的具体数值
   */
  rightCenter: {
    // ========== 文字配置 ==========
    title: '入驻企业',
    text: {
      // X 轴分类标签数组（行业名称）
      // 第一个通常是"合计"，后面是各个具体行业
      // 数组长度需比 expenses 数组长度多1（因为包含"合计"）
      categories: ["合计", "金融业", "建筑业", "房地产", "科学研究", "批零业", "制造业", "租赁商务", "其他行业"]
    },
    
    // ========== 数字配置 ==========
    numbers: {
      // 各行业费用数据数组
      // 数组中的每个数值对应一个行业的费用（不包括"合计"）
      // 数组长度 = categories.length - 1（因为"合计"不在此数组中）
      expenses: [1168, 1087, 899, 836, 624, 527, 291, 271]
      // 注意：expenses 数组的长度需比 categories 数组长度少1
      // 因为 categories 的第一个"合计"不在这里，而是自动计算的总和
    },
    
    // ========== 颜色配置 ==========
    colors: {
      // ===== ECharts 柱状图颜色数组 =====
      // 每个颜色对应一个柱状图（包括"合计"）
      // 颜色顺序：第一个颜色用于"合计"，后续颜色用于各个行业
      // 数组长度需与 categories 数组长度一致
      echarts: [
        "#39a8ff",  // 合计柱状图颜色（蓝色）
        "#8a6bff",  // 金融业柱状图颜色（紫色）
        "#ff6b93",  // 建筑业柱状图颜色（粉红色）
        "#ff8fb1",  // 房地产柱状图颜色（浅粉红色）
        "#ff9800",  // 科学研究柱状图颜色（橙色）
        "#ffd34d",  // 批零业柱状图颜色（黄色）
        "#1fe5b5",  // 制造业柱状图颜色（青色）
        "#71e66f",  // 租赁商务柱状图颜色（绿色）
        "#ffe600"   // 其他行业柱状图颜色（亮黄色）
      ],
      
      // ===== 坐标轴和标签颜色 =====
      axisLabel: "#cde7ff",                // X 轴和 Y 轴标签文字颜色（浅蓝色）
      axisLine: "rgba(255,255,255,0.2)",  // 坐标轴线颜色（白色半透明）
      label: "#ffffff"                     // 柱状图顶部数值标签颜色（白色）
    }
    // 提示：如果需要调整柱状图颜色，修改 echarts 数组中的颜色值即可
  },

  /**
   * ========================================
   * ly-right-bottom - 环境质量面板
   * ========================================
   * 模块位置：右侧底部面板
   * 组件文件：src/components/RightBottomQualityPanel.vue
   * 图表类型：数据展示（非 ECharts 图表）
   * 
   * 【功能说明】
   * 显示环境质量统计数据
   * 四个角落分别显示不同的数据（天数 + 百分比）
   * 中间显示中心区域（通常为背景图）
   * 
   * 【布局说明】
   * lt = left-top（左上角）
   * lb = left-bottom（左下角）
   * rt = right-top（右上角）
   * rb = right-bottom（右下角）
   */
  rightBottom: {
    // ========== 文字配置 ==========
    title: '环境质量',
    text: {
      // 单位文字配置
      unit: {
        days: "天",    // 天数单位
        percent: "%"  // 百分比单位
      }
    },
    
    // ========== 四个角落数据配置 ==========
    // 每个角落包含：天数、百分比、文字大小、文字颜色
    corners: {
      // 左上角数据
      lt: { 
        days: 3,        // 天数
        percent: 1.12,  // 百分比（不带%符号）
        textSize: {
          days: "0.7vw",      // 天数文字大小
          percent: "1.2vw",   // 百分比文字大小
          unit: "0.8vw"       // 单位文字大小
        },
        textColor: {
          days: "#cde7ff",    // 天数文字颜色（浅蓝色）
          percent: "#ef9c00", // 百分比文字颜色（橙色）
          unit: "#fff"        // 单位文字颜色（白色）
        }
      },
      // 左下角数据
      lb: { 
        days: 13, 
        percent: 4.88,
        textSize: {
          days: "0.7vw",
          percent: "1.2vw",
          unit: "0.8vw"
        },
        textColor: {
          days: "#cde7ff",
          percent: "#ceb19c",  // 百分比文字颜色（米色）
          unit: "#fff"
        }
      },
      // 右上角数据
      rt: { 
        days: 213, 
        percent: 80.07,
        textSize: {
          days: "0.7vw",
          percent: "1.2vw",
          unit: "0.8vw"
        },
        textColor: {
          days: "#cde7ff",
          percent: "#00c1ff",  // 百分比文字颜色（蓝色）
          unit: "#fff"
        }
      },
      // 右下角数据
      rb: { 
        days: 40, 
        percent: 15.03,
        textSize: {
          days: "0.7vw",
          percent: "1.2vw",
          unit: "0.8vw"
        },
        textColor: {
          days: "#cde7ff",
          percent: "#81c5c8",  // 百分比文字颜色（青色）
          unit: "#fff"
        }
      }
    }
  }
};

/**
 * 获取指定模块的配置
 * @param {string} moduleKey - 模块键名 (topContent, leftCenter, leftBottom, rightTop, rightCenter, rightBottom)
 * @returns {Object|null} 模块配置对象，未找到返回null
 */
export function getModuleConfig(moduleKey) {
  return PANEL_CONFIG[moduleKey] || null;
}

/**
 * 获取指定模块的文字配置
 * @param {string} moduleKey - 模块键名
 * @returns {Object|null} 文字配置对象
 */
export function getModuleText(moduleKey) {
  const config = getModuleConfig(moduleKey);
  return config ? config.text : null;
}

/**
 * 获取指定模块的数字配置
 * @param {string} moduleKey - 模块键名
 * @returns {Object|null} 数字配置对象
 */
export function getModuleNumbers(moduleKey) {
  const config = getModuleConfig(moduleKey);
  return config ? config.numbers : null;
}

/**
 * 获取指定模块的颜色配置
 * @param {string} moduleKey - 模块键名
 * @returns {Object|null} 颜色配置对象
 */
export function getModuleColors(moduleKey) {
  const config = getModuleConfig(moduleKey);
  return config ? config.colors : null;
}

/**
 * 获取指定模块的 ECharts 颜色配置
 * @param {string} moduleKey - 模块键名
 * @returns {Array|Object|null} ECharts 颜色配置
 */
export function getModuleEchartsColors(moduleKey) {
  const colors = getModuleColors(moduleKey);
  if (!colors) return null;
  
  // 不同模块的 echarts 颜色结构不同
  if (colors.echarts) {
    return colors.echarts;
  }
  
  return null;
}

/**
 * 更新指定模块的配置
 * @param {string} moduleKey - 模块键名
 * @param {Object} newConfig - 新的配置对象（可以是部分配置）
 * @returns {boolean} 是否更新成功
 */
export function updateModuleConfig(moduleKey, newConfig) {
  if (!PANEL_CONFIG[moduleKey]) {
    console.warn(`模块 ${moduleKey} 不存在`);
    return false;
  }
  
  Object.assign(PANEL_CONFIG[moduleKey], newConfig);
  return true;
}

/**
 * 获取所有模块配置
 * @returns {Object} 完整的配置对象
 */
export function getAllPanelConfig() {
  return PANEL_CONFIG;
}

