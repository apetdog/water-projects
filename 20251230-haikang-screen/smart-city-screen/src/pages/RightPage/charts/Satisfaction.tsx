import EChartsCommon from '@/components/EChartsCommon';

const Satisfaction = () => {
  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 5,
        itemStyle: {
          color: '#50e3c2',
        },
        progress: {
          show: true,
          width: 10
        },
        pointer: {
          show: false
        },
        axisLine: {
          lineStyle: {
            width: 10
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        anchor: {
          show: false
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          width: '60%',
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, '0%'],
          fontSize: 30,
          fontWeight: 'bolder',
          formatter: '{value}%',
          color: '#fff'
        },
        data: [
          {
            value: 98,
            name: '满意度'
          }
        ]
      }
    ]
  };

  return <div style={{width: '100%', height: '100%'}}><EChartsCommon option={option} /></div>;
};

export default Satisfaction;
