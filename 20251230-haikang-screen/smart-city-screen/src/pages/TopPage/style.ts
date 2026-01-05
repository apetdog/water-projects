import styled, { keyframes } from 'styled-components';


const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;



export const TopBox = styled.div`
  width: 100%;
  height: 80px;
  background-color: transparent;
  padding-top: 10px;
  
  .top_box {
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;

    .top_decoration10 {
      position: relative;
      width: 33.3%;
      height: 5px;
    }

    .top_decoration10_reverse {
      transform: rotateY(180deg);
    }

    .title-box {
      display: flex;
      justify-content: center;
      position: relative;
      z-index: 10;

      .top_decoration8 {
        width: 200px;
        height: 50px;
      }

      .title {
        position: relative;
        width: 500px;
        text-align: center;
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        align-items: center;

        .title-text {
          font-size: 32px;
          font-weight: bold;
          color: #fff;
          letter-spacing: 4px;
          margin-top: 10px;
          background: linear-gradient(to bottom, #ffffff, #87cefa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 5px rgba(135, 206, 250, 0.5));
        }

        .top_decoration6 {
          width: 300px;
          height: 30px;
          margin-top: -5px;
        }

        .title-bototm {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translate(-50%);
        }
      } 
    }
  }
`;

export const TimeBox = styled.div`
  position: absolute;
  right: 0;
  top: 35px;
  text-align: right;
  color: #fff;
  z-index: 100;
  
  h3{
    font-size: 14px;
    font-family: 'DIN Alternate', sans-serif;
    color: #a1c4fd;
    text-shadow: 0 0 5px rgba(161, 196, 253, 0.5);
    letter-spacing: 1px;
  }
`;

export const LeftTabBox = styled.div`
  position: absolute;
  top: 45px;
  left: 12%;
  display: flex;
  gap: 0px;
  z-index: 999;
  animation: ${fadeIn} 0.8s ease-out;
`;

export const RightTabBox = styled.div`
  position: absolute;
  top: 45px;
  right: 12%;
  display: flex;
  gap: 0px;
  z-index: 999;
  animation: ${fadeIn} 0.8s ease-out;
`;

export const TabItem = styled.div<{ $active: boolean }>`
  position: relative;
  cursor: pointer;
  padding: 8px 30px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  color: ${props => props.$active ? '#fff' : 'rgba(255, 255, 255, 0.6)'};
  background: ${props => props.$active ? 
    'linear-gradient(90deg, rgba(80, 227, 194, 0.1) 0%, rgba(80, 227, 194, 0.4) 50%, rgba(80, 227, 194, 0.1) 100%)' : 
    'rgba(0, 0, 0, 0.3)'};
  clip-path: polygon(15% 0, 100% 0, 85% 100%, 0% 100%);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-bottom: 2px solid ${props => props.$active ? '#50e3c2' : 'transparent'};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${props => props.$active ? '#50e3c2' : 'rgba(255,255,255,0.1)'}, transparent);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom, ${props => props.$active ? '#50e3c2' : 'transparent'}, transparent);
    opacity: 0.5;
  }

  &:hover {
    color: #50e3c2;
    background: rgba(80, 227, 194, 0.15);
    text-shadow: 0 0 8px rgba(80, 227, 194, 0.6);
    transform: translateY(-2px);
    
    &::after {
      background: linear-gradient(to bottom, #50e3c2, transparent);
    }
  }
`;
