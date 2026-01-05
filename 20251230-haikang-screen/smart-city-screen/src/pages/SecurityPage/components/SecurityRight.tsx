import { BorderBox12, BorderBox13, ScrollBoard } from '@jiaminghi/data-view-react';
import { ModuleTitle } from '@/style/globalStyledSet';
import { useState, useMemo, useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as echarts from 'echarts';

const ScrollBoardWrapper = styled.div`
  width: 100%;
  height: 100%;
  .dv-scroll-board {
    .header {
      font-size: 16px;
      color: #00dcff;
      font-weight: bold;
    }
    .rows {
      .row-item {
        font-size: 15px;
        color: #fff;
      }
    }
  }
`;

type Props = {
  alarmLogs?: SecurityPageDataType['alarmLogs']
  deviceStats?: SecurityPageDataType['deviceStats']
}

export const SecurityRight = ({ alarmLogs, deviceStats }: Props) => {
  const [showAlarm, setShowAlarm] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const config = useMemo(() => {
    if (!alarmLogs) return null;
    return {
      ...alarmLogs,
      headerBGC: 'rgba(0, 160, 233, 0.2)',
      oddRowBGC: 'rgba(0, 0, 0, 0)',
      evenRowBGC: 'rgba(80, 227, 194, 0.1)',
      carousel: 'single',
      waitTime: 2000,
      rowNum: 6,
      align: ['center', 'center', 'center']
    };
  }, [alarmLogs]);

  // Init Chart
  useEffect(() => {
    if (!chartRef.current || !deviceStats) return;
    
    const chart = echarts.init(chartRef.current);
    const rate = parseFloat(deviceStats.onlineRate || '0');
    
    const option = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '75%'],
          radius: '90%',
          min: 0,
          max: 100,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.25, '#FF6E76'],
                [0.5, '#FDDD60'],
                [0.75, '#58D9F9'],
                [1, '#7CFFB2']
              ]
            }
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 20,
            offsetCenter: [0, '-60%'],
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: 'auto',
              width: 2
            }
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: 'auto',
              width: 5
            }
          },
          axisLabel: {
            color: '#464646',
            fontSize: 20,
            distance: -60,
            rotate: 'tangential',
            formatter: function (value: number) {
              if (value === 87.5) {
                return 'A';
              } else if (value === 62.5) {
                return 'B';
              } else if (value === 37.5) {
                return 'C';
              } else if (value === 12.5) {
                return 'D';
              }
              return '';
            }
          },
          title: {
            offsetCenter: [0, '-10%'],
            fontSize: 20,
            color: '#fff'
          },
          detail: {
            fontSize: 30,
            offsetCenter: [0, '-35%'],
            valueAnimation: true,
            formatter: function (value: number) {
              return Math.round(value) + '%';
            },
            color: 'auto'
          },
          data: [
            {
              value: rate,
              name: '在线率'
            }
          ]
        }
      ]
    };
    
    chart.setOption(option);
    
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      chart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [deviceStats]);

  return (
    <div style={{ width: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', position: 'relative' }}>
       <BorderBox13 style={{height: '48%', padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe790;</i>
              <span>安防告警列表</span>
          </ModuleTitle>
          <div style={{height: '300px', marginTop: '20px'}}>
             {config && (
               <ScrollBoardWrapper>
                 <ScrollBoard config={config} />
               </ScrollBoardWrapper>
             )}
          </div>
       </BorderBox13>
       <BorderBox12 style={{height: '48%', padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe7fd;</i>
              <span>设备在线监测</span>
          </ModuleTitle>
          <div style={{height: 'calc(100% - 40px)', position: 'relative'}}>
             <div ref={chartRef} style={{width: '100%', height: '100%'}}></div>
             <div style={{position: 'absolute', bottom: '10px', width: '100%', textAlign: 'center', color: '#fff', fontSize: '16px'}}>
                在线设备数: <span style={{color: '#50e3c2', fontWeight: 'bold'}}>{deviceStats?.onlineCount || 0}</span>
             </div>
          </div>
       </BorderBox12>
       
       {/* Hidden Alarm Button (Bottom Right Corner) */}
       <div 
          style={{
             position: 'absolute', 
             bottom: '0', 
             right: '0', 
             width: '50px', 
             height: '50px', 
             background: 'transparent',
             cursor: 'pointer',
             zIndex: 999
          }}
          onClick={() => setShowAlarm(true)}
          title="Hidden Alarm Button"
       />
       
       {showAlarm && (
          <div style={{
             position: 'fixed',
             top: 0, left: 0, width: '100vw', height: '100vh',
             background: 'rgba(255,0,0,0.5)',
             zIndex: 9999,
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             backdropFilter: 'blur(5px)'
          }} onClick={() => setShowAlarm(false)}>
             <div style={{
                background: '#fff', 
                padding: '50px', 
                borderRadius: '10px', 
                textAlign: 'center',
                boxShadow: '0 0 50px red',
                border: '5px solid red'
             }}>
                <h1 style={{color: 'red', fontSize: '60px', marginBottom: '20px'}}>⚠️ 紧急报警 ⚠️</h1>
                <p style={{fontSize: '30px', color: '#000', marginBottom: '20px'}}>检测到异常入侵！</p>
                <p style={{color: '#666'}}>点击任意处关闭</p>
             </div>
          </div>
       )}
    </div>
  );
};
