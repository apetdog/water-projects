import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export const QualityPie = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const myChart = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center',
        textStyle: { color: '#fff' }
      },
      series: [
        {
          name: '视频质量诊断',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#02102b',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold',
              color: '#fff'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: '信号正常', itemStyle: { color: '#50e3c2' } },
            { value: 73, name: '信号丢失', itemStyle: { color: '#ff4d4f' } },
            { value: 58, name: '画面模糊', itemStyle: { color: '#faad14' } },
            { value: 48, name: '亮度异常', itemStyle: { color: '#1890ff' } },
            { value: 30, name: '网络中断', itemStyle: { color: '#bfbfbf' } }
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
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};
