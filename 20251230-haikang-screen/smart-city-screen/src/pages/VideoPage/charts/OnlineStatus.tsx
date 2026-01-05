import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export const OnlineStatus = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const myChart = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        axisLabel: { color: '#fff' },
        splitLine: { show: false }
      },
      yAxis: {
        type: 'category',
        data: ['故障', '离线', '在线'],
        axisLabel: { color: '#fff' },
        axisLine: { lineStyle: { color: '#50e3c2' } }
      },
      series: [
        {
          name: '数量',
          type: 'bar',
          data: [
            { value: 5, itemStyle: { color: '#ff4d4f' } },
            { value: 12, itemStyle: { color: '#bfbfbf' } },
            { value: 150, itemStyle: { color: '#50e3c2' } }
          ],
          label: {
            show: true,
            position: 'right',
            color: '#fff'
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
