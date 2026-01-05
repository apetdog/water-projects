import styled from 'styled-components';

export const RightPage = styled.div`
  width: 500px;
  height: 100%;
  padding: 0px 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
`;

export const RightTopBox = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  width: 100%;
  .right-top-borderBox13 {
    width: inherit;
    height: inherit;
    padding: 20px 15px;
    .right-top {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: rgba(19, 25, 47, 0.6);
      &-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
      }
      .earth-gif {
        width: 180px;
        height: auto;
        border-radius: 50%;
        overflow: hidden;
      }
    }
  }
`;

export const RightCenterBox = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  width: 100%;
  .right-center-borderBox13 {
    width: inherit;
    height: inherit;
    padding: 20px 15px;
    .right-center {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: rgba(19, 25, 47, 0.6);
    }
  }
`;

export const RightBottomBox = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  width: 100%;
  .right-bottom-borderBox13 {
    width: inherit;
    height: inherit;
    padding: 20px 15px 15px;
    .right-bottom {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: rgba(19, 25, 47, 0.6);
      display: flex;
      flex-direction: column;
      .feedback-box {
        margin-top: 8px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        &-item {
          display: flex;
          align-items: center;
          flex-direction: column;
          height: 140px;
          .dis-text {
            font-weight: bold;
            margin-top: 5px;
            color: #b2cfee;
            font-size: 16px;
            background: linear-gradient(to bottom, #fff, #6176F4);
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
          }
        }
      }
      .offline-portal-box {
        margin-top: 10px;
      }
    }
  }
`;
