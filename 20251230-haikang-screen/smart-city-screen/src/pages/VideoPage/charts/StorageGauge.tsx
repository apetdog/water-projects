import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

type Props = {
    value: number | string;
}

export const StorageGauge = ({ value }: Props) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const myChart = echarts.init(chartRef.current);
    
    // Parse value (remove % if present)
    const numValue = typeof value === 'string' ? parseFloat(value.replace('%', '')) : value;

    const option = {
      series: [
        // Outer Scale Ring
        {
          type: 'gauge',
          radius: '90%',
          startAngle: 90,
          endAngle: -270,
          pointer: { show: false },
          progress: { show: false },
          axisLine: {
            lineStyle: { width: 2, color: [[1, 'rgba(80, 227, 194, 0.1)']] }
          },
          axisTick: {
            show: true,
            distance: -10,
            length: 5,
            lineStyle: { color: 'rgba(80, 227, 194, 0.3)', width: 1 }
          },
          splitLine: {
            show: true,
            distance: -10,
            length: 10,
            lineStyle: { color: 'rgba(80, 227, 194, 0.5)', width: 2 }
          },
          axisLabel: { show: false }
        },
        // Inner Progress Ring
        {
          type: 'gauge',
          radius: '75%',
          startAngle: 90,
          endAngle: -270,
          pointer: { show: false },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: '#50e3c2' },
                  { offset: 1, color: '#00dcff' }
                ]
              },
              shadowBlur: 10,
              shadowColor: 'rgba(80, 227, 194, 0.5)'
            }
          },
          axisLine: {
            lineStyle: {
              width: 15,
              color: [[1, 'rgba(255, 255, 255, 0.05)']]
            }
          },
          splitLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          data: [
            {
              value: numValue,
              name: '存储使用率',
              title: {
                offsetCenter: ['0%', '0%'],
                fontSize: 14,
                color: '#aaa',
                show: true
              },
              detail: {
                valueAnimation: true,
                offsetCenter: ['0%', '30%'],
                fontSize: 32,
                fontWeight: 'bold',
                color: '#fff',
                formatter: '{value}%',
                textShadowBlur: 5,
                textShadowColor: 'rgba(80, 227, 194, 0.5)'
              }
            }
          ]
        },
        // Decorative Inner Ring
        {
          type: 'pie',
          radius: ['0%', '55%'],
          silent: true,
          z: 0,
          itemStyle: {
            color: 'rgba(0,0,0,0.2)'
          },
          label: { show: false },
          data: [1]
        }
      ]
    };

    myChart.setOption(option);

    const handleResize = () => myChart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      myChart.dispose();
    };
  }, [value]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};
