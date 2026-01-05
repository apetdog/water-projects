import styled from 'styled-components';

export const LeftPage = styled.div`
  width: 500px;
  height: 100%;
  padding: 16px;
  padding-bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
`;

export const LeftTopBox = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  width: 100%;
  .left-top-borderBox12 {
    width: inherit;
    height: inherit;
    padding: 15px;
    .left-top {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: rgba(19, 25, 47, 0.4);
    }
  }
`;

export const LeftMiddleBox = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  width: 100%;
  .left-middle-borderBox13 {
    width: inherit;
    height: inherit;
    padding: 20px 15px;
    .left-middle {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: rgba(19, 25, 47, 0.4);
    }
  }
`;

export const LeftBottomBox = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  width: 100%;
  .left-bottom-borderBox13 {
    width: inherit;
    height: 100%;
    padding: 20px 15px;
    .left-bottom {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: rgba(19, 25, 47, 0.4);
    }
  }
`;
