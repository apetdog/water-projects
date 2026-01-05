import { BorderBox12, BorderBox13, ScrollBoard } from '@jiaminghi/data-view-react';
import { ModuleTitle } from '@/style/globalStyledSet';
import { StorageGauge } from '../charts/StorageGauge';

type CaptureRecord = {
  plate: string
  time: string
  type: string
}

type StorageStats = {
  usage: string
  remainingDays: string
}

type Props = {
  captureRecords?: CaptureRecord[]
  storageStats?: StorageStats
}

export const VideoLeft = ({ captureRecords, storageStats }: Props) => {
  
  // Transform data for ScrollBoard
  const scrollBoardData = captureRecords?.map(item => [
     `<div style="width: 40px; height: 30px; background: rgba(80, 227, 194, 0.2); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(80, 227, 194, 0.5); border-radius: 2px; color: #50e3c2; font-size: 12px;">图</div>`,
     `<span style="color: #fff; font-weight: bold; font-size: 14px;">${item.plate}</span>`,
     `<span style="color: #ccc; font-size: 13px;">${item.time}</span>`,
     `<span style="color: #50e3c2; font-size: 13px; background: rgba(80, 227, 194, 0.1); padding: 2px 6px; border-radius: 2px;">${item.type}</span>`
  ]) || [];

  const config = {
    header: ['抓拍', '识别内容', '时间', '类型'],
    data: scrollBoardData,
    rowNum: 5,
    headerBGC: 'rgba(80, 227, 194, 0.1)',
    headerHeight: 40,
    oddRowBGC: 'rgba(0, 0, 0, 0)',
    evenRowBGC: 'rgba(80, 227, 194, 0.05)',
    carousel: 'page',
    align: ['center', 'left', 'center', 'center'],
    columnWidth: [80, 150, 100, 80],
    waitTime: 3000
  };

  return (
    <div style={{ width: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
       <BorderBox12 style={{height: '48%', padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe78f;</i>
              <span>实时抓拍记录</span>
          </ModuleTitle>
          <div style={{width: '100%', height: 'calc(100% - 50px)', marginTop: '10px'}}>
             {scrollBoardData.length > 0 ? (
                 <ScrollBoard config={config} style={{width: '100%', height: '100%'}} />
             ) : (
                 <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa'}}>暂无数据</div>
             )}
          </div>
       </BorderBox12>
       <BorderBox13 style={{height: '48%', padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe88e;</i>
              <span>存储状态</span>
          </ModuleTitle>
          <div style={{height: 'calc(100% - 50px)', position: 'relative'}}>
             <StorageGauge value={storageStats?.usage || 0} />
             <div style={{
                 position: 'absolute', 
                 bottom: '20px', 
                 width: '100%', 
                 textAlign: 'center', 
                 color: '#fff',
                 fontSize: '14px'
             }}>
                 剩余存储时间: <span style={{color: '#50e3c2', fontSize: '18px'}}>{storageStats?.remainingDays || '-'}</span> 天
             </div>
          </div>
       </BorderBox13>
    </div>
  );
};
