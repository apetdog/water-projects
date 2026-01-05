import { useState } from 'react';
import styled from 'styled-components';
import HikVideoPlayer from './HikVideoPlayer';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: #000;
  border: 1px solid rgba(80, 227, 194, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  &:hover {
    border-color: #50e3c2;
    box-shadow: 0 0 15px rgba(80, 227, 194, 0.3);
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

const ExpandedContainer = styled.div`
  width: 80%;
  height: 80%;
  background: #000;
  border: 2px solid #50e3c2;
  position: relative;
  box-shadow: 0 0 50px rgba(80, 227, 194, 0.2);
`;

const CloseButton = styled.div`
  position: absolute;
  top: -40px;
  right: 0;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  padding: 5px 10px;
  background: rgba(80, 227, 194, 0.2);
  border: 1px solid #50e3c2;
  border-radius: 4px;
  
  &:hover {
    background: rgba(80, 227, 194, 0.4);
  }
`;

export const KeyMonitoring = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Container onDoubleClick={() => setExpanded(true)}>
        <HikVideoPlayer />
        <div style={{
          position: 'absolute', 
          bottom: 5, 
          left: 5, 
          fontSize: '12px', 
          color: 'rgba(255,255,255,0.5)', 
          pointerEvents: 'none',
          zIndex: 10
        }}>双击全屏 / 双击配置</div>
      </Container>
      
      {expanded && (
        <Modal>
          <ExpandedContainer>
            <CloseButton onClick={() => setExpanded(false)}>关闭全屏</CloseButton>
            <HikVideoPlayer />
          </ExpandedContainer>
        </Modal>
      )}
    </>
  );
};
