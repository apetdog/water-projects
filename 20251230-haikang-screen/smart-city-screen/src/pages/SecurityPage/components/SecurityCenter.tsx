import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const ripple = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
`;

const CenterContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const RotatingRing = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border: 2px dashed #50e3c2;
  border-radius: 50%;
  animation: ${rotate} 20s linear infinite;
  opacity: 0.3;
`;

const ReverseRing = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border: 2px dashed #e3b337;
  border-radius: 50%;
  animation: ${rotate} 15s linear infinite reverse;
  opacity: 0.3;
`;

const RippleCircle = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border: 2px solid #ff4d4f;
  border-radius: 50%;
  animation: ${ripple} 2s ease-out infinite;
`;

export const SecurityCenter = () => {
  return (
    <CenterContainer>
       <RotatingRing />
       <ReverseRing />
       <RippleCircle />
       
       <div style={{fontSize: '30px', color: '#50e3c2', textShadow: '0 0 10px #50e3c2', zIndex: 10}}>智慧安防指控中心</div>
       <div style={{fontSize: '16px', color: '#aaa', marginTop: '20px', zIndex: 10}}>全域监控 · 实时预警</div>
       
       <div style={{
           marginTop: '50px', 
           padding: '40px', 
           borderRadius: '20px',
           background: 'rgba(0, 0, 0, 0.5)',
           zIndex: 10,
           border: '1px solid #50e3c2'
       }}>
          <div style={{marginBottom: '10px', color: '#50e3c2'}}>🛡️ 电子围栏: 开启</div>
          <div style={{marginBottom: '10px', color: '#ff4d4f'}}>⚠️ 今日告警: 5</div>
          <div style={{color: '#e3b337'}}>🔍 巡逻人员: 12</div>
       </div>
    </CenterContainer>
  );
};
