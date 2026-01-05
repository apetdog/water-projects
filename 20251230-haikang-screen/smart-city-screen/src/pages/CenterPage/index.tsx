import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for pulse animation
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 77, 79, 0.7);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(255, 77, 79, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 77, 79, 0);
  }
`;

const AlarmBtn = styled.div`
  position: absolute;
  right: 30px;
  bottom: 30px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #fff;
  border: 4px solid #ff4d4f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
  animation: ${pulse} 2s infinite;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);

  &:hover {
    transform: scale(1.1);
    background: #ff4d4f;
    border-color: #fff;
    
    .btn-text, .iconfont {
      color: #fff;
    }
  }

  .iconfont {
    font-size: 32px;
    color: #ff4d4f;
    margin-bottom: 2px;
    transition: all 0.3s;
  }

  .btn-text {
    font-size: 14px;
    font-weight: bold;
    color: #ff4d4f;
    transition: all 0.3s;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
`;

const PopupBox = styled.div`
  width: 500px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from { transform: translateY(-50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const PopupHeader = styled.div`
  background: #ff4d4f;
  padding: 15px 20px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .close-btn {
    cursor: pointer;
    font-size: 24px;
    opacity: 0.8;
    &:hover { opacity: 1; }
  }
`;

const PopupContent = styled.div`
  padding: 30px;
  background: #f0f2f5;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

const AlarmMessage = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
`;

const InfoRow = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px dashed #ccc;
  font-size: 16px;
  color: #666;
  
  .label {
    width: 100px;
    text-align: right;
    margin-right: 15px;
  }
  
  .value {
    flex: 1;
    color: #333;
    font-weight: 500;
    
    &.urgent {
      color: #ff4d4f;
      font-weight: bold;
    }
  }
`;

const ConfirmBtn = styled.button`
  background: #ff4d4f;
  color: #fff;
  border: none;
  padding: 12px 40px;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(255, 77, 79, 0.3);

  &:hover {
    background: #ff7875;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(255, 77, 79, 0.4);
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
        <div className="btn-text">呼叫</div>
      </AlarmBtn>

      {showAlarm && (
        <Overlay onClick={handleClose}>
          <PopupBox onClick={e => e.stopPropagation()}>
            <PopupHeader>
              <span>提醒</span>
              <span className="close-btn" onClick={handleClose}>×</span>
            </PopupHeader>
            <PopupContent>
              <AlarmMessage>星级酒店606客房 紧急报警</AlarmMessage>
              <InfoRow>
                <span className="label">防区编号:</span>
                <span className="value">001</span>
              </InfoRow>
              <InfoRow>
                <span className="label">防区属性:</span>
                <span className="value urgent">紧急</span>
              </InfoRow>
              <InfoRow>
                <span className="label">报警时间:</span>
                <span className="value">{currentTime}</span>
              </InfoRow>
              <ConfirmBtn onClick={handleClose}>确认</ConfirmBtn>
            </PopupContent>
          </PopupBox>
        </Overlay>
      )}
    </div>
  )
}
