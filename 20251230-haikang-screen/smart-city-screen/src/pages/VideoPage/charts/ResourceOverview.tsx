import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export const ResourceOverview = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const myChart = echarts.init(chartRef.current);

    const data = [
      { name: '区域A', x: 100, y: 300, value: 45 },
      { name: '区域B', x: 300, y: 100, value: 32 },
      { name: '区域C', x: 500, y: 400, value: 28 },
      { name: '区域D', x: 700, y: 200, value: 55 },
      { name: '区域E', x: 400, y: 600, value: 20 },
    ];

    const links = data.map((item, index) => {
        return {
            source: item.name,
            target: data[(index + 1) % data.length].name
        }
    });

    const option = {
      title: {
        text: '视频资源分布拓扑',
        textStyle: { color: '#fff' },
        left: 'center'
      },
      tooltip: {},
      series: [
        {
          type: 'graph',
          layout: 'force',
          symbolSize: 50,
          roam: true,
          label: {
            show: true,
            color: '#fff'
          },
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            fontSize: 20
          },
          data: data.map(item => ({
            name: item.name,
            value: item.value,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: '#50e3c2' },
                    { offset: 1, color: '#00dcff' }
                ])
            }
          })),
          links: links,
          lineStyle: {
            opacity: 0.9,
            width: 2,
            curveness: 0.1,
            color: '#50e3c2'
          },
          force: {
              repulsion: 1000,
              edgeLength: [100, 200]
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
