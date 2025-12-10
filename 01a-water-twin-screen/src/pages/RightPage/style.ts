import styled from 'styled-components';

export const RightPage = styled.div`
  width: 500px;
  height: auto;
  padding: 0px 16px;
`;

export const RightTopBox = styled.div`
  position: relative;
  height: 250px;
  width: 100%;
  margin-bottom: 20px;
  .right-top-borderBox12 {
    width: inherit;
    height: inherit;
    padding: 15px;
    .right-top {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: rgba(19, 25, 47, 0.75);
    }
  }
  .right-top {
    &-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 15px;
    }
  }
`;

export const RightCenterBox = styled.div`
  position: relative;
  height: 300px;
  width: 100%;
  margin-bottom: 20px;
`;

export const RightBottomBox = styled.div`
  position: relative;
  height: 400px;
  width: 100%;
  .right-bottom-borderBox13 {
    padding: 20px 15px 15px;
    .right-bottom {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: rgba(19, 25, 47, 0.75);
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
