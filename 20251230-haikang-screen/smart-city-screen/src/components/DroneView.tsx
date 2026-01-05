import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  /* background: rgba(0, 0, 0, 0.3); */
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #fff;
  overflow: hidden;
  padding: 10px;
`;

const DPad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  align-items: center;
  justify-items: center;
  background: rgba(80, 227, 194, 0.1);
  padding: 10px;
  border-radius: 50%;
  border: 1px dashed rgba(80, 227, 194, 0.3);
`;

const ActionGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const ControlBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(80, 227, 194, 0.15);
  border: 1px solid rgba(80, 227, 194, 0.5);
  color: #50e3c2;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;

  &:hover {
    background: rgba(80, 227, 194, 0.4);
    box-shadow: 0 0 10px rgba(80, 227, 194, 0.4);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
  
  &.center-btn {
    background: rgba(80, 227, 194, 0.3);
    width: 30px;
    height: 30px;
  }
`;

export const DroneView = () => {
  const sendCommand = (action: string) => {
    const iframe = document.getElementById('city-3d-iframe') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'camera-control', action }, '*');
    }
  };

  return (
    <Container>
      {/* Direction Controls (Left Side) */}
      <DPad>
        <div />
        <ControlBtn onClick={() => sendCommand('rotate-up')} title="向上旋转">⬆</ControlBtn>
        <div />
        
        <ControlBtn onClick={() => sendCommand('rotate-left')} title="左旋">↺</ControlBtn>
        <ControlBtn className="center-btn" onClick={() => sendCommand('reset')} title="复位">●</ControlBtn>
        <ControlBtn onClick={() => sendCommand('rotate-right')} title="右旋">↻</ControlBtn>
        
        <div />
        <ControlBtn onClick={() => sendCommand('rotate-down')} title="向下旋转">⬇</ControlBtn>
        <div />
      </DPad>

      {/* Action Controls (Right Side) */}
      <ActionGroup>
        <ControlBtn onClick={() => sendCommand('move-up')} title="上升">🚀</ControlBtn>
        <ControlBtn onClick={() => sendCommand('zoom-in')} title="放大">➕</ControlBtn>
        
        <ControlBtn onClick={() => sendCommand('move-down')} title="下降">🛬</ControlBtn>
        <ControlBtn onClick={() => sendCommand('zoom-out')} title="缩小">➖</ControlBtn>
      </ActionGroup>
    </Container>
  );
};
