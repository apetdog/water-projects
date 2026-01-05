import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export const OnlineStatus = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const myChart = echarts.init(chartRef.current);

    const option = {
      grid: {
        left: '15%',
        right: '10%',
        bottom: '5%',
        top: '10%',
        containLabel: false
      },
      xAxis: {
        show: false,
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: ['故障', '离线', '在线'],
        axisLabel: { color: '#fff', fontSize: 14, margin: 15 },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      series: [
        {
          name: '数量',
          type: 'bar',
          barWidth: 20,
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 10
          },
          itemStyle: {
            borderRadius: 10,
            color: (params: any) => {
                const colorMap = {
                    '故障': ['#ff4d4f', '#ff7875'],
                    '离线': ['#bfbfbf', '#d9d9d9'],
                    '在线': ['#50e3c2', '#00dcff']
                };
                const colors = colorMap[params.name as keyof typeof colorMap] || ['#50e3c2', '#00dcff'];
                return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: colors[0] },
                    { offset: 1, color: colors[1] }
                ]);
            }
          },
          data: [
            { value: 5, name: '故障' },
            { value: 12, name: '离线' },
            { value: 150, name: '在线' }
          ],
          label: {
            show: true,
            position: 'right',
            color: '#fff',
            fontSize: 14,
            formatter: '{c}'
          }
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
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};
