import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as echarts from 'echarts';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  height: 140px;
  width: 100%;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const TypewriterBox = styled.div`
  flex: 1;
  background: rgba(0, 20, 40, 0.3);
  border: 1px solid rgba(80, 227, 194, 0.3);
  border-radius: 4px;
  padding: 15px;
  overflow: hidden;
  position: relative;
  margin-top: 24px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    border-top: 2px solid #50e3c2;
    border-left: 2px solid #50e3c2;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    border-bottom: 2px solid #50e3c2;
    border-right: 2px solid #50e3c2;
  }
`;

const TextContent = styled.div`
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.6;
  color: #50e3c2;
  white-space: pre-wrap;
  text-shadow: 0 0 5px rgba(80, 227, 194, 0.5);
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 16px;
  background-color: #50e3c2;
  margin-left: 5px;
  vertical-align: text-bottom;
  animation: blink 1s step-end infinite;

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const mockSummaries = [
  "AI 智能分析引擎 v3.0 已启动...\n正在实时扫描全区监控视频流。\n检测到异常入侵事件分布：非法入侵占比较高，请注意防范。\n人员聚集热点区域：食堂入口、B栋大厅。\n实时风险评估等级：低风险。",
  "夜间巡逻无人机已就位，信号传输正常。\n今日 AI 告警总数同比下降 12%。\n烟火检测算法运行中，暂未发现异常热源。\n重点关注：车辆违停现象有所增加，建议加强停车场引导。\n系统正在生成今日安全态势日报...",
];

type Props = {
  data?: Array<{ name: string; value: number }>;
}

const AiBehaviorAnalysis = ({ data }: Props) => {
  const [text, setText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  
  const chartRef = useRef<HTMLDivElement>(null);

  // Init Chart
  useEffect(() => {
    if (!chartRef.current || !data) return;
    
    const chart = echarts.init(chartRef.current);
    
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        textStyle: {
          color: '#fff',
          fontSize: 12
        }
      },
      series: [
        {
          name: 'AI Event Distribution',
          type: 'pie',
          radius: [15, 60],
          center: ['35%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 5
          },
          label: {
            show: true,
            color: '#fff',
            formatter: '{b}'
          },
          data: data.sort((a, b) => b.value - a.value)
        }
      ]
    };
    
    chart.setOption(option);
    
    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      chart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  // Typewriter effect
  useEffect(() => {
    const currentMessage = mockSummaries[messageIndex];
    
    let timer: ReturnType<typeof setTimeout>;

    if (charIndex < currentMessage.length) {
      // Typing
      timer = setTimeout(() => {
        setText(currentMessage.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 50);
    } else {
      // Finished typing, wait then reset
      timer = setTimeout(() => {
        setText('');
        setCharIndex(0);
        setMessageIndex((prev) => (prev + 1) % mockSummaries.length);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [charIndex, messageIndex]);

  return (
    <Container>
      <StatsRow>
        <ChartContainer ref={chartRef} />
      </StatsRow>
      
      <TypewriterBox>
        <TextContent>
          {text}
          <Cursor />
        </TextContent>
      </TypewriterBox>
    </Container>
  );
};

export default AiBehaviorAnalysis;
