import { BorderBox12, BorderBox13, ScrollBoard } from '@jiaminghi/data-view-react';
import { ModuleTitle } from '@/style/globalStyledSet';
import { useState, useMemo } from 'react';
import styled from 'styled-components';

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
  alarmLogs?: any
  deviceStats?: any
}

export const SecurityRight = ({ alarmLogs, deviceStats }: Props) => {
  const [showAlarm, setShowAlarm] = useState(false);

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
          <div style={{color: '#fff', textAlign: 'center', marginTop: '50px', fontSize: '20px'}}>
             <div style={{marginBottom: '20px'}}>在线设备数: {deviceStats?.onlineCount || 0}</div>
             <div>设备在线率: <span style={{color: '#50e3c2', fontSize: '50px', fontWeight: 'bold'}}>{deviceStats?.onlineRate || '0%'}</span></div>
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
