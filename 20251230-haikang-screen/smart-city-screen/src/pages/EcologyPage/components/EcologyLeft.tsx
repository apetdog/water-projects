import { BorderBox12, BorderBox13, WaterLevelPond } from '@jiaminghi/data-view-react';
import { ModuleTitle } from '@/style/globalStyledSet';
import EChartsCommon from '@/components/EChartsCommon';
import { graphic } from 'echarts';
import styled from 'styled-components';

type Props = {
  environmentFactors?: any
  waterQuality?: any
  carbonEmission?: any
}

const EnvGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 20px;
`;

const EnvCard = styled.div`
  background: rgba(0, 220, 255, 0.05);
  border: 1px solid rgba(0, 220, 255, 0.2);
  padding: 15px 5px;
  border-radius: 4px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(0, 220, 255, 0.15);
    border-color: rgba(0, 220, 255, 0.5);
    transform: translateY(-2px);
  }
  
  .icon { font-size: 24px; margin-bottom: 8px; }
  .label { color: #bbb; font-size: 12px; margin-bottom: 4px; }
  .value { color: #fff; font-size: 16px; font-weight: bold; text-shadow: 0 0 5px rgba(0, 220, 255, 0.5); }
`;

const StatBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  padding: 10px;
`;

const AirQualityChart = () => {
    const option = {
        grid: { top: 30, bottom: 20, left: 30, right: 10, containLabel: true },
        tooltip: { trigger: 'axis' },
        xAxis: { 
            type: 'category', 
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], 
            axisLabel: { color: '#aaa' },
            axisLine: { lineStyle: { color: '#333' } }
        },
        yAxis: { 
            type: 'value', 
            axisLabel: { color: '#aaa' }, 
            splitLine: { lineStyle: { color: '#333', type: 'dashed' } } 
        },
        series: [{
            data: [50, 75, 60, 80, 45, 90, 100],
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(80, 227, 194, 0.4)' },
                    { offset: 1, color: 'rgba(80, 227, 194, 0.05)' }
                ])
            },
            itemStyle: { color: '#50e3c2', borderColor: '#fff', borderWidth: 2 }
        }]
    };
    return <EChartsCommon option={option} />;
}

export const EcologyLeft = ({ environmentFactors, waterQuality, carbonEmission }: Props) => {
  const waterConfig = {
    data: [55],
    shape: 'round',
    waveHeight: 15,
    waveNum: 2,
    colors: ['#294d99', '#50e3c2']
  }

  return (
    <div style={{ width: '450px', display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
       <BorderBox12 style={{flex: 1.2, minHeight: 0, padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe78f;</i>
              <span>环境六要素</span>
          </ModuleTitle>
          <EnvGrid>
              <EnvCard>
                  <div className="icon">🌡️</div>
                  <div className="label">温度</div>
                  <div className="value">{environmentFactors?.temperature || '--'}</div>
              </EnvCard>
              <EnvCard>
                  <div className="icon">💧</div>
                  <div className="label">湿度</div>
                  <div className="value">{environmentFactors?.humidity || '--'}</div>
              </EnvCard>
              <EnvCard>
                  <div className="icon">🌫️</div>
                  <div className="label">PM2.5</div>
                  <div className="value">{environmentFactors?.pm25 || '--'}</div>
              </EnvCard>
              <EnvCard>
                  <div className="icon">🔊</div>
                  <div className="label">噪音</div>
                  <div className="value">{environmentFactors?.noise || '--'}</div>
              </EnvCard>
              <EnvCard>
                  <div className="icon">🌬️</div>
                  <div className="label">风速</div>
                  <div className="value">{environmentFactors?.windSpeed || '--'}</div>
              </EnvCard>
              <EnvCard>
                  <div className="icon">⏲️</div>
                  <div className="label">气压</div>
                  <div className="value">{environmentFactors?.pressure || '--'}</div>
              </EnvCard>
          </EnvGrid>
       </BorderBox12>

       <BorderBox13 style={{flex: 1.5, minHeight: 0, padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe88e;</i>
              <span>空气质量趋势</span>
          </ModuleTitle>
          <div style={{height: 'calc(100% - 40px)', marginTop: '10px'}}>
              <AirQualityChart />
          </div>
       </BorderBox13>

       <div style={{display: 'flex', justifyContent: 'space-between', flex: 1, minHeight: 0, gap: '20px'}}>
           <BorderBox12 style={{flex: 1, padding: '15px'}}>
               <ModuleTitle><span>水质监测</span></ModuleTitle>
               <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                   <WaterLevelPond config={waterConfig} style={{width: '90px', height: '90px'}} />
                   <div>
                       <div style={{fontSize: '14px', color: '#aaa'}}>PH值</div>
                       <div style={{fontSize: '24px', color: '#50e3c2', fontWeight: 'bold'}}>{waterQuality?.ph}</div>
                       <div style={{fontSize: '12px', color: '#fff', background: '#28a745', padding: '2px 8px', borderRadius: '10px', marginTop: '5px', textAlign: 'center'}}>{waterQuality?.status}</div>
                   </div>
               </div>
           </BorderBox12>
           <BorderBox12 style={{flex: 1, padding: '15px'}}>
               <ModuleTitle><span>碳排放指标</span></ModuleTitle>
               <div style={{display: 'flex', flexDirection: 'column', height: 'calc(100% - 30px)', justifyContent: 'center', gap: '10px'}}>
                   <StatBox>
                       <div style={{fontSize: '24px', color: '#e3b337', fontWeight: 'bold'}}>{carbonEmission?.dailyReduction}</div>
                       <div style={{fontSize: '12px', color: '#aaa'}}>今日减排</div>
                   </StatBox>
                   <StatBox style={{flexDirection: 'row', gap: '10px'}}>
                       <div style={{fontSize: '24px'}}>🌲</div>
                       <div>
                           <div style={{fontSize: '18px', color: '#fff', fontWeight: 'bold'}}>x {carbonEmission?.treeEquivalent}</div>
                           <div style={{fontSize: '12px', color: '#aaa'}}>植树当量</div>
                       </div>
                   </StatBox>
               </div>
           </BorderBox12>
       </div>
    </div>
  );
};
