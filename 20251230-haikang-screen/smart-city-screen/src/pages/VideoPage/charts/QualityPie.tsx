import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export const QualityPie = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const myChart = echarts.init(chartRef.current);

    const data = [
      { value: 1048, name: '信号正常' },
      { value: 73, name: '信号丢失' },
      { value: 58, name: '画面模糊' },
      { value: 48, name: '亮度异常' },
      { value: 30, name: '网络中断' }
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);

    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: { color: '#fff', fontSize: 12 },
        icon: 'circle'
      },
      color: ['#50e3c2', '#ff4d4f', '#faad14', '#1890ff', '#bfbfbf'],
      series: [
        {
          name: '视频质量',
          type: 'pie',
          radius: ['50%', '75%'],
          center: ['50%', '60%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 5,
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
              fontSize: '18',
              fontWeight: 'bold',
              color: '#fff',
              formatter: '{b}\n{d}%'
            },
            scale: true,
            scaleSize: 10
          },
          labelLine: {
            show: false
          },
          data: data
        },
        // Center text
        {
            type: 'gauge',
            radius: '45%',
            center: ['50%', '60%'],
            startAngle: 0,
            endAngle: 360,
            splitLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
            pointer: { show: false },
            axisLine: { lineStyle: { width: 0 } },
            detail: {
                valueAnimation: true,
                fontSize: 24,
                color: '#fff',
                formatter: `总数\n${total}`,
                offsetCenter: [0, 0],
                lineHeight: 30
            },
            data: [{ value: 0 }]
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
