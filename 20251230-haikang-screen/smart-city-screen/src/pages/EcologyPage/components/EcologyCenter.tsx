import styled, { keyframes } from 'styled-components';
import React from 'react';

const rain = keyframes`
  0% { transform: translateY(-100vh); }
  100% { transform: translateY(100vh); }
`;

const RainDrop = styled.div`
  position: absolute;
  width: 2px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  top: 0;
  animation: ${rain} 1s linear infinite;
`;

const LampPost = styled.div<{ active?: boolean }>`
  position: absolute;
  cursor: ${props => props.active ? 'pointer' : 'not-allowed'};
  opacity: ${props => props.active ? 1 : 0.5};
  transition: all 0.3s;
  
  &:hover {
    transform: ${props => props.active ? 'scale(1.1)' : 'none'};
    filter: ${props => props.active ? 'drop-shadow(0 0 10px #50e3c2)' : 'none'};
  }
`;

type Props = {
  onSelectLampPost: (post: any) => void
}

export const EcologyCenter = ({ onSelectLampPost }: Props) => {
  // Generate some raindrops
  const drops = Array.from({ length: 20 }).map((_, i) => ({
    left: Math.random() * 100 + '%',
    delay: Math.random() * 2 + 's',
    duration: 0.5 + Math.random() * 1 + 's'
  }));

  return (
    <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', overflow: 'hidden' }}>
       {/* Rain Effect */}
       {drops.map((drop, i) => (
         <RainDrop key={i} style={{ left: drop.left, animationDelay: drop.delay, animationDuration: drop.duration }} />
       ))}

       <div style={{color: '#fff', fontSize: '20px', marginBottom: '20px', zIndex: 10}}>写实天气系统: 雨/晴 (3D场景)</div>
       <div style={{color: '#aaa', fontSize: '14px', marginBottom: '40px', zIndex: 10}}>空气粒子漂浮 + 灯杆光晕</div>
       
       {/* Lamp Posts */}
       <LampPost 
          active={true} 
          style={{top: '40%', left: '30%'}} 
          onClick={() => onSelectLampPost({id: 1, name: '灯杆 #001', status: '在线', wifiUsers: 12, screenText: '欢迎莅临'})}
       >
          <div style={{width: '20px', height: '100px', background: '#50e3c2', margin: '0 auto', boxShadow: '0 0 20px #50e3c2'}}></div>
          <div style={{background: 'rgba(0,0,0,0.5)', padding: '5px', color: '#fff', borderRadius: '5px', marginTop: '10px'}}>💡 灯杆 #001 (在线)</div>
       </LampPost>
       
       <LampPost 
          active={false} 
          style={{top: '50%', right: '30%'}}
       >
          <div style={{width: '20px', height: '100px', background: '#aaa', margin: '0 auto'}}></div>
          <div style={{background: 'rgba(0,0,0,0.5)', padding: '5px', color: '#aaa', borderRadius: '5px', marginTop: '10px'}}>💡 灯杆 #002 (离线)</div>
       </LampPost>
    </div>
  );
};
