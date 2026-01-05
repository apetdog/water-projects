import { ScrollBoard } from '@jiaminghi/data-view-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  .dv-scroll-board {
    .header {
      font-size: 14px;
      color: #50e3c2;
      font-weight: bold;
      align-items: center;
      border-bottom: 1px solid rgba(80, 227, 194, 0.3);
    }
    .rows {
      .row-item {
        font-size: 14px;
        color: #fff;
        align-items: center;
        transition: all 0.3s;
        border-bottom: 1px dashed rgba(255, 255, 255, 0.05);
        
        &:hover {
          background: rgba(80, 227, 194, 0.1) !important;
          cursor: pointer;
        }
        
        .ceil {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
`;

// Helper to generate rank badge
const getRankHtml = (rank: number) => {
  const color = rank === 1 ? '#faad14' : rank === 2 ? '#e3b337' : rank === 3 ? '#50e3c2' : '#8c8c8c';
  const bg = rank <= 3 ? `rgba(${rank === 1 ? '250, 173, 20' : rank === 2 ? '227, 179, 55' : '80, 227, 194'}, 0.2)` : 'rgba(255,255,255,0.1)';
  return `<span style="
    display:inline-block;
    width:24px;
    height:24px;
    line-height:24px;
    text-align:center;
    background:${bg};
    border: 1px solid ${color};
    color:${color};
    border-radius:4px;
    font-weight:bold;
    font-family: 'Din', sans-serif;
  ">${rank}</span>`;
};

// Helper to generate heat bar
const getHeatHtml = (value: number, type: 'high' | 'medium' | 'low') => {
  let colorStart, colorEnd;
  if (type === 'high') { colorStart = '#faad14'; colorEnd = '#ffec3d'; }
  else if (type === 'medium') { colorStart = '#1890ff'; colorEnd = '#69c0ff'; }
  else { colorStart = '#50e3c2'; colorEnd = '#87e8de'; }
  
  return `<div style="width: 100%; display: flex; align-items: center; gap: 8px;">
    <div style="flex: 1; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
      <div style="width: ${value}%; height: 100%; background: linear-gradient(90deg, ${colorStart}, ${colorEnd}); border-radius: 3px; box-shadow: 0 0 5px ${colorStart};"></div>
    </div>
    <span style="color: ${colorStart}; font-family: 'Din', sans-serif; width: 35px; text-align: right;">${value}%</span>
  </div>`;
};

const HeatIndex = () => {
  const config = {
    header: ['排名', '区域名称', '热度监测'],
    data: [
      [getRankHtml(1), '食堂 A区', getHeatHtml(92, 'high')],
      [getRankHtml(2), '办公楼 B', getHeatHtml(85, 'high')],
      [getRankHtml(3), '图书馆', getHeatHtml(78, 'high')],
      [getRankHtml(4), '停车场 C', getHeatHtml(65, 'medium')],
      [getRankHtml(5), '宿舍楼 D', getHeatHtml(58, 'medium')],
      [getRankHtml(6), '体育馆', getHeatHtml(52, 'medium')],
      [getRankHtml(7), '活动中心', getHeatHtml(35, 'low')],
      [getRankHtml(8), '行政楼', getHeatHtml(28, 'low')],
    ],
    index: false,
    columnWidth: [60, 120, 180],
    align: ['center', 'center', 'center'],
    headerBGC: 'rgba(80, 227, 194, 0.15)',
    oddRowBGC: 'rgba(0, 0, 0, 0.2)',
    evenRowBGC: 'rgba(0, 0, 0, 0)',
    carousel: 'single',
    waitTime: 3000,
    headerHeight: 40,
    rowNum: 4
  };

  return (
    <Wrapper>
      <ScrollBoard config={config} />
    </Wrapper>
  );
};

export default HeatIndex;
