import EChartsCommon from '@/components/EChartsCommon';
import { graphic } from 'echarts';

const IndustrialRadar = () => {
  const option = {
    tooltip: {},
    radar: {
      indicator: [
        { name: '智能制造', max: 100 },
        { name: '生物医药', max: 100 },
        { name: '电子信息', max: 100 },
        { name: '新材料', max: 100 },
        { name: '现代服务', max: 100 },
      ],
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)']
        }
      },
      axisLine: {
        lineStyle: {
          color: '#153269'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#113865'
        }
      },
      name: {
          textStyle: {
              color: '#fff'
          }
      }
    },
    series: [
      {
        name: '产业结构',
        type: 'radar',
        data: [
          {
            value: [80, 50, 90, 60, 70],
            name: '2024年',
            areaStyle: {
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(80, 227, 194, 0.9)'
                },
                {
                  offset: 1,
                  color: 'rgba(80, 227, 194, 0)'
                }
              ])
            },
            lineStyle: {
              color: '#50e3c2'
            },
            itemStyle: {
                color: '#50e3c2'
            }
          }
        ]
      }
    ]
  };

  return <EChartsCommon option={option} />;
};

export default IndustrialRadar;
