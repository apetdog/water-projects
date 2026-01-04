import { BorderBox12, BorderBox13, Decoration9 } from '@jiaminghi/data-view-react';
import { ModuleTitle } from '@/style/globalStyledSet';

type Props = {
  selectedLampPost?: any
  energyAnalysis?: any
  photovoltaic?: any
}

export const EcologyRight = ({ selectedLampPost, energyAnalysis, photovoltaic }: Props) => {
  return (
    <div style={{ width: '450px', display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
       <BorderBox13 style={{height: '32%', padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe790;</i>
              <span>智慧灯杆详情</span>
          </ModuleTitle>
          {selectedLampPost ? (
             <div style={{color: '#fff', marginTop: '20px'}}>
                <div style={{fontSize: '20px', marginBottom: '10px', color: '#50e3c2'}}>{selectedLampPost.name} ({selectedLampPost.status})</div>
                <div>亮度: <div style={{display: 'inline-block', width: '100px', height: '10px', background: '#333'}}><div style={{width: '80%', height: '100%', background: '#50e3c2'}}></div></div> 80%</div>
                <div style={{marginTop: '10px'}}>WiFi: {selectedLampPost.wifiUsers}人在线</div>
                <div style={{marginTop: '10px'}}>信息屏: "{selectedLampPost.screenText}"</div>
                
                <div style={{marginTop: '20px', textAlign: 'center', fontSize: '12px', color: '#aaa'}}>
                    (爆炸图展示传感器联动中...)
                </div>
             </div>
          ) : (
             <div style={{color: '#aaa', textAlign: 'center', marginTop: '50px'}}>请选择左侧灯杆查看详情</div>
          )}
       </BorderBox13>
       
       <BorderBox12 style={{height: '32%', padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe7fd;</i>
              <span>园区能耗分析</span>
          </ModuleTitle>
          <div style={{color: '#fff', marginTop: '20px'}}>
             <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                <span>照明</span>
                <span>{energyAnalysis?.lighting}</span>
             </div>
             <div style={{width: '100%', height: '10px', background: '#333'}}><div style={{width: energyAnalysis?.lighting || '40%', height: '100%', background: '#50e3c2'}}></div></div>
             
             <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginBottom: '10px'}}>
                <span>空调</span>
                <span>{energyAnalysis?.ac}</span>
             </div>
             <div style={{width: '100%', height: '10px', background: '#333'}}><div style={{width: energyAnalysis?.ac || '30%', height: '100%', background: '#e3b337'}}></div></div>
          </div>
       </BorderBox12>
       
       <BorderBox12 style={{height: '32%', padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe633;</i>
              <span>光伏发电收益</span>
          </ModuleTitle>
           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
               <Decoration9 style={{ width: '120px', height: '120px' }}>
                   <div style={{ color: '#fff', textAlign: 'center', paddingTop: '30px' }}>
                       <div style={{ fontSize: '24px', color: '#50e3c2' }}>{photovoltaic?.dailyGeneration}</div>
                       <div style={{fontSize: '12px'}}>今日 kWh</div>
                   </div>
               </Decoration9>
               <div style={{marginLeft: '20px', color: '#fff'}}>
                  <div>累计: {photovoltaic?.totalRevenue}</div>
                  <div>减排: {photovoltaic?.totalReduction}</div>
               </div>
           </div>
       </BorderBox12>
    </div>
  );
};
