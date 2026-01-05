import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for pulse animation
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(80, 227, 194, 0.4);
    transform: scale(1);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(80, 227, 194, 0);
    transform: scale(1.05);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(80, 227, 194, 0);
    transform: scale(1);
  }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const slideIn = keyframes`
  from { transform: translate(-50%, -60%) scale(0.9); opacity: 0; }
  to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
`;

const wave = keyframes`
  0%, 100% { height: 20%; }
  50% { height: 100%; }
`;

const AlarmBtn = styled.div`
  position: absolute;
  right: 8%;
  bottom: 8%;
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
  
  // Inner circle
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle at center, rgba(80, 227, 194, 0.4) 0%, rgba(80, 227, 194, 0.1) 70%, transparent 100%);
    border: 2px solid rgba(80, 227, 194, 0.6);
    box-shadow: 0 0 15px rgba(80, 227, 194, 0.4), inset 0 0 10px rgba(80, 227, 194, 0.4);
    animation: ${pulse} 2s infinite;
  }

  // Rotating Ring
  &::after {
    content: '';
    position: absolute;
    width: 110%;
    height: 110%;
    border-radius: 50%;
    border: 2px dashed rgba(80, 227, 194, 0.3);
    animation: ${rotate} 10s linear infinite;
  }

  &:hover::before {
    background: radial-gradient(circle at center, rgba(80, 227, 194, 0.6) 0%, rgba(80, 227, 194, 0.2) 70%, transparent 100%);
    border-color: #50e3c2;
    box-shadow: 0 0 25px rgba(80, 227, 194, 0.6), inset 0 0 15px rgba(80, 227, 194, 0.6);
  }

  .iconfont {
    font-size: 32px;
    color: #fff;
    z-index: 1;
    text-shadow: 0 0 10px rgba(80, 227, 194, 0.8);
    margin-bottom: 5px;
  }
`;

const WaveChart = styled.div`
  display: flex;
  gap: 3px;
  height: 16px;
  align-items: flex-end;
  z-index: 1;
  margin-bottom: 24px;
  
  span {
    width: 3px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 0 5px rgba(80, 227, 194, 0.8);
    animation: ${wave} 1s ease-in-out infinite;
    
    &:nth-child(1) { animation-delay: 0s; height: 40%; }
    &:nth-child(2) { animation-delay: 0.2s; height: 100%; }
    &:nth-child(3) { animation-delay: 0.4s; height: 60%; }
    &:nth-child(4) { animation-delay: 0.1s; height: 80%; }
    &:nth-child(5) { animation-delay: 0.3s; height: 50%; }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2000;
  backdrop-filter: blur(8px);
`;

const PopupBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  background: rgba(13, 26, 60, 0.95);
  border: 1px solid rgba(80, 227, 194, 0.3);
  box-shadow: 0 0 50px rgba(80, 227, 194, 0.2), inset 0 0 20px rgba(80, 227, 194, 0.1);
  animation: ${slideIn} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  // Tech corners
  &::before, &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid #50e3c2;
    transition: all 0.3s;
  }
  &::before {
    top: -2px;
    left: -2px;
    border-right: none;
    border-bottom: none;
  }
  &::after {
    bottom: -2px;
    right: -2px;
    border-left: none;
    border-top: none;
  }

  // Scan line effect
  .scan-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, transparent, rgba(80, 227, 194, 0.8), transparent);
    animation: scan 3s linear infinite;
    opacity: 0.3;
    pointer-events: none;
  }

  @keyframes scan {
    0% { top: 0; }
    100% { top: 100%; }
  }
`;

const PopupHeader = styled.div`
  height: 50px;
  background: linear-gradient(90deg, rgba(80, 227, 194, 0.2) 0%, transparent 100%);
  border-bottom: 1px solid rgba(80, 227, 194, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  
  .title {
    font-size: 18px;
    color: #50e3c2;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 10px;
    text-shadow: 0 0 10px rgba(80, 227, 194, 0.5);
    
    &::before {
      content: '';
      display: block;
      width: 6px;
      height: 6px;
      background: #50e3c2;
      transform: rotate(45deg);
      box-shadow: 0 0 5px #50e3c2;
    }
  }

  .close-btn {
    color: rgba(255, 255, 255, 0.6);
    font-size: 24px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: #50e3c2;
      text-shadow: 0 0 10px #50e3c2;
      transform: rotate(90deg);
    }
  }
`;

const PopupContent = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AlarmMessage = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin-bottom: 10px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  background: linear-gradient(180deg, #fff 0%, #50e3c2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const InfoBox = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 4px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
  
  .label {
    width: 100px;
    text-align: right;
    margin-right: 20px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
  }
  
  .value {
    flex: 1;
    color: #fff;
    font-size: 16px;
    font-family: 'Din Alternate', sans-serif;
    letter-spacing: 1px;
    
    &.urgent {
      color: #faad14;
      font-weight: bold;
      text-shadow: 0 0 10px rgba(250, 173, 20, 0.6);
      animation: blink 1s infinite alternate;
    }
  }

  @keyframes blink {
    from { opacity: 1; }
    to { opacity: 0.6; }
  }
`;

const ConfirmBtn = styled.button`
  background: linear-gradient(90deg, #50e3c2 0%, #1890ff 100%);
  color: #000;
  border: none;
  padding: 12px 0;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
  transition: all 0.3s;
  letter-spacing: 2px;
  text-shadow: 0 1px 2px rgba(255,255,255,0.2);

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(80, 227, 194, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const CenterPageIndex = () => {
  const [showAlarm, setShowAlarm] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const handleCall = () => {
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    setCurrentTime(timeStr);
    setShowAlarm(true);
  };

  const handleClose = () => {
    setShowAlarm(false);
  };

  return (
    <div className='center-page' style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      {/* 3D City Map Placeholder */}
      <div style={{
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        color: 'rgba(255,255,255,0.1)', 
        fontSize: '24px',
        pointerEvents: 'none'
      }}>
        3D City Map Area
      </div>

      <AlarmBtn onClick={handleCall}>
        <i className='iconfont'>&#xe61d;</i>
        <WaveChart>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </WaveChart>
      </AlarmBtn>

      {showAlarm && (
        <Overlay onClick={handleClose}>
          <PopupBox onClick={e => e.stopPropagation()}>
            <div className="scan-line"></div>
            <PopupHeader>
              <div className="title">系统警告 SYSTEM WARNING</div>
              <div className="close-btn" onClick={handleClose}>×</div>
            </PopupHeader>
            <PopupContent>
              <AlarmMessage>⚠ 星级酒店606客房 紧急报警</AlarmMessage>
              <InfoBox>
                <InfoRow>
                  <span className="label">报警区域</span>
                  <span className="value">ZONE-001 高级客房区</span>
                </InfoRow>
                <InfoRow>
                  <span className="label">警情等级</span>
                  <span className="value urgent">URGENT / 紧急</span>
                </InfoRow>
                <InfoRow>
                  <span className="label">触发时间</span>
                  <span className="value">{currentTime}</span>
                </InfoRow>
                <InfoRow>
                  <span className="label">处理状态</span>
                  <span className="value" style={{color: '#faad14'}}>待处理 / PENDING</span>
                </InfoRow>
              </InfoBox>
              <ConfirmBtn onClick={handleClose}>立即处置 / CONFIRM</ConfirmBtn>
            </PopupContent>
          </PopupBox>
        </Overlay>
      )}
    </div>
  )
}
