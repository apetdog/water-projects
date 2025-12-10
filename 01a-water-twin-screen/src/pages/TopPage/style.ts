import styled from "styled-components";
import { TitleColor } from "@/style/color";

export const TopBox = styled.div`
  .top_box {
    display: flex;
    justify-content: center;
    background: rgba(19, 25, 47, 0.75);
    padding-bottom: 10px;
    padding-top: 12px;
    margin-top: -12px;

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
        min-width: 500px;
        text-align: center;
        background-size: cover;
        background-repeat: no-repeat;

        .title-text {
          font-size: 24px;
          font-weight: 800;
          letter-spacing: 4px;
          position: absolute;
          top: 8px;
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
  right: 30px;
  top: 24px;
  text-align: right;
  color: #fff;
  h3 {
    font-size: 18px;
    color: ${TitleColor};
  }
`;

export const TabBox = styled.div`
  position: absolute;
  left: 40px;
  top: 24px;
  display: flex;
  gap: 15px;
  z-index: 10;

  .tab-item {
    color: rgba(255, 255, 255, 0.7);
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s;
    padding: 5px 25px;
    position: relative;

    // 默认的菱形背景 (未选中状态)
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      transform: skewX(30deg);
      z-index: -1;
      transition: all 0.3s;
    }

    &:hover {
      color: #fff;
      text-shadow: 0 0 5px #00baff;

      &::before {
        background: rgba(0, 186, 255, 0.1);
        border-color: rgba(0, 186, 255, 0.3);
      }
    }

    &.active {
      color: #fff;
      font-weight: bold;
      text-shadow: 0 0 10px #00baff;

      // 选中状态的背景高亮
      &::before {
        background: rgba(0, 186, 255, 0.15);
        border: 1px solid rgba(0, 186, 255, 0.6);
        box-shadow: 0 0 10px rgba(0, 186, 255, 0.3) inset;
      }

      // 选中状态的底部亮条
      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 7%;
        width: 100%;
        height: 1px;
        background: #00baff;
        box-shadow: 0 0 8px #00baff;
        transform: skewX(-30deg);
      }
    }
  }
`;
