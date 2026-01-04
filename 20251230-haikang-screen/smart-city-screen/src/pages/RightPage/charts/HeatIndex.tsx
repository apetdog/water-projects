import { ScrollBoard } from '@jiaminghi/data-view-react';

const HeatIndex = () => {
  const config = {
    header: ['区域', '热度'],
    data: [
      ['食堂 A区', '<span style="color:#ce2c5b;">🔥 高</span>'],
      ['办公楼 B', '<span style="color:#ce2c5b;">🔥 高</span>'],
      ['停车场 C', '<span style="color:#e3b337;">中</span>'],
      ['宿舍楼 D', '<span style="color:#e3b337;">中</span>'],
      ['活动中心', '<span style="color:#50e3c2;">低</span>'],
    ],
    index: true,
    columnWidth: [50, 150, 100],
    align: ['center'],
    headerBGC: 'rgba(0,0,0,0)',
    oddRowBGC: 'rgba(0,0,0,0)',
    evenRowBGC: 'rgba(0,0,0,0)',
  };

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <ScrollBoard config={config} />
    </div>
  );
};

export default HeatIndex;
