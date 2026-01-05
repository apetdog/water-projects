import { BorderBox12, BorderBox13 } from '@jiaminghi/data-view-react';
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
  return (
    <div style={{ width: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
       <BorderBox12 style={{height: '48%', padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe78f;</i>
              <span>实时抓拍记录</span>
          </ModuleTitle>
          <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px'}}>
             {captureRecords?.map((item, idx) => (
                <div key={idx} style={{
                    display: 'flex', 
                    background: 'rgba(80, 227, 194, 0.05)', 
                    padding: '10px', 
                    alignItems: 'center',
                    borderLeft: '2px solid #50e3c2',
                    boxShadow: '0 0 10px rgba(80, 227, 194, 0.1)'
                }}>
                   <div style={{
                       width: '60px', 
                       height: '60px', 
                       background: 'rgba(0,0,0,0.3)', 
                       marginRight: '15px', 
                       display: 'flex', 
                       alignItems: 'center', 
                       justifyContent: 'center', 
                       color: '#50e3c2',
                       border: '1px solid rgba(80, 227, 194, 0.3)'
                    }}>
                      [图]
                   </div>
                   <div style={{color: '#fff', flex: 1}}>
                      <div style={{fontWeight: 'bold', fontSize: '16px', color: '#50e3c2'}}>{item.plate}</div>
                      <div style={{fontSize: '12px', color: '#aaa', marginTop: '5px'}}>{item.time} | {item.type}</div>
                   </div>
                </div>
             ))}
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

