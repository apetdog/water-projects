import styled, { keyframes } from 'styled-components';
import { DroneView } from '@/components/DroneView';

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const LiveTag = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  color: #0f0;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &::before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background: #0f0;
    border-radius: 50%;
    animation: ${blink} 1s infinite;
  }
`;

const VideoGridItem = styled.div`
  background: #000;
  border: 1px solid #1e3a8a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  position: relative;
  overflow: hidden;
  
  &:hover {
    border: 1px solid #50e3c2;
    cursor: pointer;
  }
`;

const GridLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(80, 227, 194, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(80, 227, 194, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.3;
  pointer-events: none;
`;

export const VideoCenter = () => {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', padding: '0 20px', position: 'relative' }}>
       {/* Video Grid */}
       <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '10px', height: '100%'}}>
          {[1,2,3,4].map(i => (
             <VideoGridItem key={i}>
                <GridLine />
                <LiveTag>LIVE</LiveTag>
                <div style={{zIndex: 1}}>海康SDK 画面 {i}</div>
                <div style={{position: 'absolute', bottom: '10px', right: '10px', fontSize: '12px', color: '#aaa'}}>CAM_0{i} | 1080P</div>
             </VideoGridItem>
          ))}
       </div>
       
       {/* Floating Drone View */}
       <div style={{position: 'absolute', bottom: '20px', left: '20px', width: '300px', height: '200px', zIndex: 10}}>
          <DroneView />
       </div>
    </div>
  );
};
