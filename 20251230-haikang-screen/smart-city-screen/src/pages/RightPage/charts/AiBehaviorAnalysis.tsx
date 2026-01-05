import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
  justify-content: space-around;
  margin-bottom: 20px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .value {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .label {
    font-size: 16px;
    color: #fff;
  }
`;

const TypewriterBox = styled.div`
  flex: 1;
  background: rgba(0, 20, 40, 0.3);
  border: 1px solid rgba(80, 227, 194, 0.3);
  border-radius: 4px;
  padding: 15px;
  overflow: hidden;
  position: relative;
  
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
  font-size: 16px;
  line-height: 1.6;
  color: #50e3c2;
  white-space: pre-wrap;
  text-shadow: 0 0 5px rgba(80, 227, 194, 0.5);
`;

const Cursor = styled.span`
  display: inline-block;
  width: 10px;
  height: 20px;
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
  "正在分析园区实时监控数据...\n检测到食堂A区人员密度较高，建议加强疏导。\n今日未佩戴安全帽违规行为同比下降 5%。\n车辆违停监测：2处，已自动通知安保人员。\nAI 综合安全评分：92分，园区运行状态良好。",
  "系统自检完成，各传感器状态正常。\n正在扫描重点区域安全隐患...\n发现 B 区消防通道有临时堆积物，请及时清理。\n能耗分析：今日电力消耗略高于平均值，建议优化照明策略。\n环境监测：空气质量优，适宜户外活动。",
];

type Props = {
  noHelmet?: string;
  illegalParking?: string;
}

const AiBehaviorAnalysis = ({ noHelmet = '15%', illegalParking = '30%' }: Props) => {
  const [text, setText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

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
        <StatItem>
          <div className="value" style={{ color: '#ff4d4f' }}>{noHelmet}</div>
          <div className="label">未戴帽</div>
        </StatItem>
        <StatItem>
          <div className="value" style={{ color: '#faad14' }}>{illegalParking}</div>
          <div className="label">违停</div>
        </StatItem>
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
