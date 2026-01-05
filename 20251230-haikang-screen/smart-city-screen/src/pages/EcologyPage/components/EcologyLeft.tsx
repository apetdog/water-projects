import { BorderBox12, BorderBox13, WaterLevelPond } from '@jiaminghi/data-view-react';
import { ModuleTitle } from '@/style/globalStyledSet';
import EChartsCommon from '@/components/EChartsCommon';
import { graphic } from 'echarts';

type Props = {
  environmentFactors?: any
  waterQuality?: any
  carbonEmission?: any
}

const AirQualityChart = () => {
    const option = {
        grid: { top: 10, bottom: 20, left: 30, right: 10 },
        xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], axisLabel: { color: '#fff' } },
        yAxis: { type: 'value', axisLabel: { color: '#fff' }, splitLine: { lineStyle: { color: '#333' } } },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(80, 227, 194, 0.8)' },
                    { offset: 1, color: 'rgba(80, 227, 194, 0)' }
                ])
            },
            itemStyle: { color: '#50e3c2' }
        }]
    };
    return <EChartsCommon option={option} />;
}

export const EcologyLeft = ({ environmentFactors, waterQuality, carbonEmission }: Props) => {
  const config = {
    data: [55],
    shape: 'round',
    waveHeight: 10,
    waveNum: 2
  }

  return (
    <div style={{ width: '450px', display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
       <BorderBox12 style={{flex: 1, minHeight: 0, padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe78f;</i>
              <span>环境六要素</span>
          </ModuleTitle>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px', color: '#fff', fontSize: '18px'}}>
              <div>🌡️ 温度: {environmentFactors?.temperature}</div>
              <div>💧 湿度: {environmentFactors?.humidity}</div>
              <div>🌫️ PM2.5: {environmentFactors?.pm25}</div>
              <div>🔊 噪音: {environmentFactors?.noise}</div>
              <div>🌬️ 风速: {environmentFactors?.windSpeed}</div>
              <div>⏲️ 气压: {environmentFactors?.pressure}</div>
          </div>
       </BorderBox12>
       <BorderBox13 style={{flex: 1, minHeight: 0, padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe88e;</i>
              <span>空气质量趋势</span>
          </ModuleTitle>
          <div style={{height: '160px'}}>
              <AirQualityChart />
          </div>
       </BorderBox13>
       <div style={{display: 'flex', justifyContent: 'space-between', flex: 1, minHeight: 0, gap: '20px'}}>
           <BorderBox12 style={{flex: 1, padding: '10px'}}>
               <ModuleTitle><span>水质监测</span></ModuleTitle>
               <div style={{height: '100px', display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                   <WaterLevelPond config={config} style={{width: '100px', height: '100px'}} />
               </div>
               <div style={{textAlign: 'center', color: '#fff', marginTop: '10px'}}>pH: {waterQuality?.ph} ({waterQuality?.status})</div>
           </BorderBox12>
           <BorderBox12 style={{flex: 1, padding: '10px'}}>
               <ModuleTitle><span>碳排放指标</span></ModuleTitle>
               <div style={{textAlign: 'center', color: '#fff', marginTop: '30px'}}>
                   <div style={{fontSize: '30px', color: '#50e3c2'}}>{carbonEmission?.dailyReduction}</div>
                   <div>今日减排</div>
                   <div style={{marginTop: '20px'}}>🌲 x {carbonEmission?.treeEquivalent}棵</div>
               </div>
           </BorderBox12>
       </div>
    </div>
  );
};
