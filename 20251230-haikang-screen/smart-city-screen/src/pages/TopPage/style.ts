import styled from 'styled-components';
import { TitleColor } from '@/style/color'

export const TopBox = styled.div`
  .top_box {
    display: flex;
    justify-content: center;
    position: relative;

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

        .title-text {
          font-size: 24px;
          position: absolute;
          bottom: 0;
          left: 50%;
          color: #fff;
          transform: translate(-50%);
        }

        .top_decoration6 {
          width: 250px;
          height: 8px;
        }

        .title-bototm {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translate(-50%);
        }
      } // end title
    } // end title-box
  } // end top_box
`;

export const TimeBox = styled.div`
  position: absolute;
  right: 16px;
  top: 30px;
  text-align: right;
  color: #fff;
  h3{
    font-size: 14px;
    color: ${TitleColor};
  }
`;

export const LeftTabBox = styled.div`
  position: absolute;
  top: 32px;
  left: 15%;
  display: flex;
  gap: 20px;
  z-index: 999;
`;

export const RightTabBox = styled.div`
  position: absolute;
  top: 32px;
  right: 15%;
  display: flex;
  gap: 20px;
  z-index: 999;
`;

export const TabItem = styled.div<{ $active: boolean }>`
  cursor: pointer;
  padding: 5px 15px;
  font-size: 16px;
  color: ${props => props.$active ? '#50e3c2' : '#fff'};
  background: ${props => props.$active ? 'rgba(80, 227, 194, 0.2)' : 'transparent'};
  border: 1px solid ${props => props.$active ? '#50e3c2' : 'transparent'};
  border-radius: 4px;
  transition: all 0.3s;
  
  &:hover {
    color: #50e3c2;
    background: rgba(80, 227, 194, 0.1);
  }
`;
