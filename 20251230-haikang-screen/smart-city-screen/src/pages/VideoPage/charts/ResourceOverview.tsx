import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export const ResourceOverview = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const myChart = echarts.init(chartRef.current);

    const data = [
      { name: '区域A', x: 100, y: 300, value: 45, category: 0 },
      { name: '区域B', x: 300, y: 100, value: 32, category: 1 },
      { name: '区域C', x: 500, y: 400, value: 28, category: 1 },
      { name: '区域D', x: 700, y: 200, value: 55, category: 0 },
      { name: '区域E', x: 400, y: 600, value: 20, category: 2 },
    ];

    const links = [
        { source: '区域A', target: '区域B' },
        { source: '区域B', target: '区域C' },
        { source: '区域C', target: '区域D' },
        { source: '区域D', target: '区域E' },
        { source: '区域E', target: '区域A' },
        { source: '区域A', target: '区域C' },
        { source: '区域B', target: '区域E' },
    ];

    const option = {
      title: {
        text: '视频资源分布拓扑',
        textStyle: { color: '#fff' },
        left: 'center',
        top: 10
      },
      tooltip: {},
      series: [
        {
          type: 'graph',
          layout: 'force',
          symbolSize: 60,
          roam: true,
          label: {
            show: true,
            color: '#fff',
            fontSize: 12
          },
          itemStyle: {
            color: {
                type: 'radial',
                x: 0.5, y: 0.5, r: 0.5,
                colorStops: [
                    { offset: 0, color: 'rgba(80, 227, 194, 0.8)' },
                    { offset: 1, color: 'rgba(0, 100, 255, 0.8)' }
                ]
            },
            shadowBlur: 20,
            shadowColor: 'rgba(80, 227, 194, 0.5)',
            borderWidth: 2,
            borderColor: '#50e3c2'
          },
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 8],
          edgeLabel: {
            fontSize: 12
          },
          data: data.map(item => ({
            name: item.name,
            value: item.value,
            // Vary colors slightly based on category if needed, but keeping unified theme is cleaner
          })),
          links: links,
          lineStyle: {
            opacity: 0.6,
            width: 2,
            curveness: 0.2,
            color: '#00dcff'
          },
          force: {
              repulsion: 800,
              edgeLength: [120, 250],
              gravity: 0.1
          }
        },
        // Effect scatter for glowing nodes effect
        {
            type: 'effectScatter',
            coordinateSystem: 'cartesian2d', // Not applicable directly on graph layout without coordinates, skipping for now to keep simple force layout
            // Instead, we can use 'lines' with effect to simulate data flow
        },
        {
            type: 'lines',
            coordinateSystem: 'cartesian2d', // Requires explicit coords, force layout doesn't provide easy coords for lines series.
            // Switching approach: Use graph series itself, it's good enough with glow.
            // Let's rely on the graph's itemStyle shadow for glow.
            data: [],
            zlevel: 1,
            effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: '#fff',
                symbolSize: 3
            },
            lineStyle: {
                normal: {
                    color: '#a6c84c',
                    width: 0,
                    curveness: 0.2
                }
            }
        }
      ]
    };
    
    // Remove empty series to avoid errors
    option.series = option.series.filter(s => s.type === 'graph');

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
