import { BorderBox12, BorderBox13 } from '@jiaminghi/data-view-react';
import { ModuleTitle } from '@/style/globalStyledSet';
import { QualityPie } from '../charts/QualityPie';
import { OnlineStatus } from '../charts/OnlineStatus';

export const VideoRight = () => {
  return (
    <div style={{ width: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
       <BorderBox13 style={{height: '48%', padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe790;</i>
              <span>视频质量诊断</span>
          </ModuleTitle>
          <div style={{height: 'calc(100% - 40px)', marginTop: '20px'}}>
             <QualityPie />
          </div>
       </BorderBox13>
       <BorderBox12 style={{height: '48%', padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe7fd;</i>
              <span>设备在线状态</span>
          </ModuleTitle>
          <div style={{height: 'calc(100% - 40px)', marginTop: '20px'}}>
             <OnlineStatus />
          </div>
       </BorderBox12>
    </div>
  );
};


