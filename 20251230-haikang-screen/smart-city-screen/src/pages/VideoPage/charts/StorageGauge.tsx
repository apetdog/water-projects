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
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: { show: false },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              borderWidth: 1,
              borderColor: '#464646'
            }
          },
          axisLine: {
            lineStyle: { width: 40 }
          },
          splitLine: { show: false, distance: 0, length: 10 },
          axisTick: { show: false },
          axisLabel: { show: false, distance: 50 },
          data: [
            {
              value: numValue,
              name: '存储使用率',
              title: { offsetCenter: ['0%', '-10%'], fontSize: 14, color: '#fff' },
              detail: {
                valueAnimation: true,
                offsetCenter: ['0%', '20%'],
                fontSize: 30,
                color: '#50e3c2',
                formatter: '{value}%'
              },
              itemStyle: { color: '#50e3c2' }
            }
          ]
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
