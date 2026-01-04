import { BorderBox12, BorderBox13 } from '@jiaminghi/data-view-react';
import { ModuleTitle } from '@/style/globalStyledSet';

type Props = {
  captureRecords?: any[]
  storageStats?: any
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
                <div key={idx} style={{display: 'flex', background: 'rgba(255,255,255,0.1)', padding: '10px', alignItems: 'center'}}>
                   <div style={{width: '60px', height: '60px', background: '#333', marginRight: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa'}}>
                      [图]
                   </div>
                   <div style={{color: '#fff'}}>
                      <div>{item.plate}</div>
                      <div style={{fontSize: '12px', color: '#aaa'}}>{item.time} | {item.type}</div>
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
          <div style={{color: '#fff', textAlign: 'center', marginTop: '50px'}}>
             <div style={{width: '200px', height: '200px', borderRadius: '50%', border: '10px solid #50e3c2', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px'}}>
                {storageStats?.usage || '0%'}
             </div>
             <div style={{marginTop: '20px'}}>剩余存储时间: {storageStats?.remainingDays || '-'}</div>
          </div>
       </BorderBox13>
    </div>
  );
};
