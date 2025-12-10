import { graphic } from 'echarts/core'

export const mapOptions = (params) => ({
  title: {
    show: false,
    text: params.config.title,
    left: 'center',
    textStyle: {
      color: '#fff',
    },
  },
  legend: {
    show: false,
  },
  geo: {
    nameMap: {
      China: '中国',
    },
    map: 'china',
    label: {
      emphasis: {
        show: false,
      },
    },
    zoom: 1.2,
    itemStyle: {
      normal: {
        borderColor: 'rgba(255,209,163, .5)', //区域边框颜色
        areaColor: 'rgba(73,86,166,.1)', //区域颜色
        borderWidth: 0.5, //区域边框宽度
        shadowBlur: 5,
        shadowColor: 'rgba(107,91,237,.7)',
      },
      emphasis: {
        borderColor: '#FFD1A3',
        areaColor: 'rgba(102,105,240,.3)',
        borderWidth: 1,
        shadowBlur: 5,
        shadowColor: 'rgba(135,138,255,.5)',
      },
    },
  },
  series: [
    {
      name: params.config.pointName,
      type: 'effectScatter',
      coordinateSystem: 'geo',
      zlevel: 2,
      rippleEffect: {
        brushType: 'stroke',
      },
      label: {
        emphasis: {
          show: true,
          position: 'right',
          formatter: '{b}',
        },
      },
      symbolSize: 2,
      showEffectOn: 'render',
      itemStyle: {
        normal: {
          color: params.config.pointColor,
        },
      },
      data: params.citys,
    },
    {
      name: params.config.lineName,
      type: 'lines',
      coordinateSystem: 'geo',
      zlevel: 2,
      zoom: 1,
      large: true,
      effect: {
        show: true,
        constantSpeed: 30,
        symbol: 'pin',
        symbolSize: 3,
        trailLength: 0,
      },
      lineStyle: {
        normal: {
          color: new graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: params.config.lineColor[0],
              },
              {
                offset: 1,
                color: params.config.lineColor[1],
              },
            ],
            false
          ),
          width: 1,
          opacity: 0.2,
          curveness: 0.1,
        },
      },
      data: params.moveLines,
    },
  ],
});
