import { BorderBox12, BorderBox13, Decoration9 } from '@jiaminghi/data-view-react';
import { ModuleTitle } from '@/style/globalStyledSet';
import styled from 'styled-components';

type Props = {
  selectedLampPost?: any
  energyAnalysis?: any
  photovoltaic?: any
}

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 15px;
`;

const DetailItem = styled.div`
  background: rgba(255,255,255,0.05);
  padding: 10px;
  border-radius: 4px;
  border-left: 2px solid #50e3c2;
  .label { color: #aaa; font-size: 12px; }
  .value { color: #fff; font-size: 14px; margin-top: 5px; font-weight: bold; }
`;

const EnergyRow = styled.div`
  margin-bottom: 15px;
  .info {
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 14px;
    margin-bottom: 5px;
  }
`;

const EnergyBar = styled.div<{ color: string, width: string }>`
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.width || '0%'};
    background: ${props => props.color};
    border-radius: 4px;
    box-shadow: 0 0 10px ${props => props.color};
    transition: width 1s ease-in-out;
  }
`;

const PhotoVoltaicStats = styled.div`
  margin-left: 30px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  .stat-item {
    .label { font-size: 14px; color: #aaa; margin-bottom: 5px; }
    .value { font-size: 24px; font-weight: bold; color: #50e3c2; }
  }
`;

export const EcologyRight = ({ selectedLampPost, energyAnalysis, photovoltaic }: Props) => {
  return (
    <div style={{ width: '450px', display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
       <BorderBox13 style={{flex: 1.2, minHeight: 0, padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe790;</i>
              <span>智慧灯杆详情</span>
          </ModuleTitle>
          {selectedLampPost ? (
             <div style={{color: '#fff', marginTop: '20px', height: '100%', overflow: 'hidden'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px'}}>
                    <div style={{fontSize: '22px', color: '#50e3c2', fontWeight: 'bold'}}>{selectedLampPost.name}</div>
                    <div style={{
                        padding: '2px 8px', 
                        borderRadius: '4px', 
                        background: selectedLampPost.status === '在线' ? 'rgba(80, 227, 194, 0.2)' : 'rgba(255, 0, 0, 0.2)',
                        color: selectedLampPost.status === '在线' ? '#50e3c2' : '#ff4d4f'
                    }}>
                        {selectedLampPost.status}
                    </div>
                </div>
                
                <div style={{marginBottom: '15px'}}>
                    <div style={{fontSize: '12px', color: '#aaa', marginBottom: '5px'}}>亮度调节</div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <EnergyBar color="#50e3c2" width="80%" style={{flex: 1}} />
                        <span style={{width: '30px'}}>80%</span>
                    </div>
                </div>

                <DetailGrid>
                    <DetailItem>
                        <div className="label">WiFi 在线</div>
                        <div className="value">{selectedLampPost.wifiUsers} 人</div>
                    </DetailItem>
                    <DetailItem>
                        <div className="label">环境监测</div>
                        <div className="value">运行中</div>
                    </DetailItem>
                    <DetailItem style={{gridColumn: 'span 2'}}>
                        <div className="label">信息屏内容</div>
                        <div className="value">"{selectedLampPost.screenText}"</div>
                    </DetailItem>
                </DetailGrid>
                
                <div style={{marginTop: '20px', textAlign: 'center', fontSize: '12px', color: '#666', borderTop: '1px dashed #333', paddingTop: '10px'}}>
                    点击地图灯杆查看不同设备状态
                </div>
             </div>
          ) : (
             <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#aaa'}}>
                 <i className='iconfont' style={{fontSize: '40px', marginBottom: '10px'}}>&#xe790;</i>
                 <div>请选择左侧灯杆查看详情</div>
                 <div style={{fontSize: '12px', color: '#666', marginTop: '5px'}}>默认选中 #001</div>
             </div>
          )}
       </BorderBox13>
       
       <BorderBox12 style={{flex: 1.5, minHeight: 0, padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe7fd;</i>
              <span>园区能耗分析</span>
          </ModuleTitle>
          <div style={{color: '#fff', marginTop: '20px', height: '100%', overflowY: 'auto'}}>
             <EnergyRow>
                <div className="info"><span>照明系统</span><span>{energyAnalysis?.lighting}</span></div>
                <EnergyBar color="#50e3c2" width={energyAnalysis?.lighting} />
             </EnergyRow>
             <EnergyRow>
                <div className="info"><span>空调系统</span><span>{energyAnalysis?.ac}</span></div>
                <EnergyBar color="#e3b337" width={energyAnalysis?.ac} />
             </EnergyRow>
             <EnergyRow>
                <div className="info"><span>充电桩</span><span>{energyAnalysis?.evCharging}</span></div>
                <EnergyBar color="#4d94ff" width={energyAnalysis?.evCharging} />
             </EnergyRow>
             <EnergyRow>
                <div className="info"><span>水泵系统</span><span>{energyAnalysis?.waterPump}</span></div>
                <EnergyBar color="#29ccff" width={energyAnalysis?.waterPump} />
             </EnergyRow>
             <EnergyRow>
                <div className="info"><span>安防设备</span><span>{energyAnalysis?.security}</span></div>
                <EnergyBar color="#ff4d4f" width={energyAnalysis?.security} />
             </EnergyRow>
          </div>
       </BorderBox12>
       
       <BorderBox12 style={{flex: 1.2, minHeight: 0, padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe633;</i>
              <span>光伏发电收益</span>
          </ModuleTitle>
           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
               <Decoration9 style={{ width: '150px', height: '150px' }}>
                   <div style={{ color: '#fff', textAlign: 'center', paddingTop: '45px' }}>
                       <div style={{ fontSize: '32px', color: '#50e3c2', fontWeight: 'bold' }}>{photovoltaic?.dailyGeneration}</div>
                       <div style={{fontSize: '14px', marginTop: '5px'}}>今日 kWh</div>
                   </div>
               </Decoration9>
               <PhotoVoltaicStats>
                  <div className="stat-item">
                      <div className="label">累计收益</div>
                      <div className="value">{photovoltaic?.totalRevenue}</div>
                  </div>
                  <div className="stat-item">
                      <div className="label">累计减排</div>
                      <div className="value" style={{color: '#e3b337'}}>{photovoltaic?.totalReduction}</div>
                  </div>
               </PhotoVoltaicStats>
           </div>
       </BorderBox12>
    </div>
  );
};
