import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: #000;
  border: 1px solid #1e3a8a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  overflow: hidden;

  &:hover {
    border-color: #50e3c2;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoPlaceholder = styled.div`
  width: 80%;
  height: 80%;
  background: #111;
  border: 2px solid #50e3c2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #fff;
  flex-direction: column;
`;

const ControlPanel = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 50%;
  border: 1px solid #50e3c2;
`;

const ControlBtn = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(80, 227, 194, 0.2);
  border: 1px solid #50e3c2;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(80, 227, 194, 0.5);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const DroneView = () => {
  const [expanded, setExpanded] = useState(false);

  const sendCommand = (action: string) => {
    const iframe = document.getElementById('city-3d-iframe') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'camera-control', action }, '*');
    }
  };

  return (
    <>
      <Container onClick={() => setExpanded(true)}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: '20px', marginBottom: '10px'}}>🚁 无人机视角 (控制台)</div>
          <div style={{color: '#0f0'}}>● LIVE</div>
          <div style={{fontSize: '12px', marginTop: '10px', color: '#aaa'}}>点击打开控制</div>
        </div>
      </Container>
      {expanded && (
        <Modal onClick={(e) => {
            // Only close if clicking the background, not the controls
            if (e.target === e.currentTarget) setExpanded(false);
        }}>
          <VideoPlaceholder style={{ background: 'rgba(0,0,0,0.8)', border: 'none' }}>
            <h2 style={{ marginBottom: '30px', color: '#50e3c2' }}>无人机飞行控制</h2>
            
            <div style={{ display: 'flex', gap: '50px', alignItems: 'center' }}>
                {/* Direction Controls */}
                <ControlPanel>
                    <div />
                    <ControlBtn onClick={() => sendCommand('move-forward')}>⬆</ControlBtn>
                    <div />
                    
                    <ControlBtn onClick={() => sendCommand('rotate-left')}>↺</ControlBtn>
                    <ControlBtn onClick={() => sendCommand('reset')}>●</ControlBtn>
                    <ControlBtn onClick={() => sendCommand('rotate-right')}>↻</ControlBtn>
                    
                    <div />
                    <ControlBtn onClick={() => sendCommand('move-backward')}>⬇</ControlBtn>
                    <div />
                </ControlPanel>

                {/* Elevation & Zoom */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <ControlBtn onClick={() => sendCommand('move-up')} title="上升">🚀</ControlBtn>
                    <ControlBtn onClick={() => sendCommand('move-down')} title="下降">🛬</ControlBtn>
                    <div style={{ height: '20px' }} />
                    <ControlBtn onClick={() => sendCommand('zoom-in')} title="放大">➕</ControlBtn>
                    <ControlBtn onClick={() => sendCommand('zoom-out')} title="缩小">➖</ControlBtn>
                </div>
            </div>

            <div style={{fontSize: '16px', marginTop: '40px', color: '#aaa'}}>点击背景关闭控制台</div>
          </VideoPlaceholder>
        </Modal>
      )}
    </>
  );
};
