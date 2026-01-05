import { ScrollBoard } from '@jiaminghi/data-view-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  .dv-scroll-board {
    .header {
      font-size: 16px;
      color: #fff;
    }
    .rows {
      .row-item {
        font-size: 16px;
        color: #fff;
      }
    }
  }
`;

const HeatIndex = () => {
  const config = {
    header: ['区域', '热度'],
    data: [
      ['食堂 A区', '<span style="color:#ce2c5b;">🔥 高</span>'],
      ['办公楼 B', '<span style="color:#ce2c5b;">🔥 高</span>'],
      ['停车场 C', '<span style="color:#e3b337;">中</span>'],
      ['宿舍楼 D', '<span style="color:#e3b337;">中</span>'],
      ['活动中心', '<span style="color:#50e3c2;">低</span>'],
      ['图书馆', '<span style="color:#ce2c5b;">🔥 高</span>'],
      ['体育馆', '<span style="color:#e3b337;">中</span>'],
      ['行政楼', '<span style="color:#50e3c2;">低</span>'],
    ],
    index: true,
    columnWidth: [60, 230, 100],
    align: ['center', 'left', 'right'],
    headerBGC: 'rgba(255, 255, 255, 0.25)',
    oddRowBGC: 'rgba(255, 255, 255, 0.1)',
    evenRowBGC: 'rgba(0,0,0,0)',
    carousel: 'single',
    waitTime: 2000,
    rowNum: 5
  };

  return (
    <Wrapper>
      <ScrollBoard config={config} />
    </Wrapper>
  );
};

export default HeatIndex;
