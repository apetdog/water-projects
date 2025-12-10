import {
  BorderBox12,
  BorderBox13,
  ScrollBoard,
} from "@jiaminghi/data-view-react";
import { useEffect, useState } from "react";
import { ModuleTitle } from "@/style/globalStyledSet";
import {
  RightPage,
  RightTopBox,
  RightCenterBox,
  RightBottomBox,
} from "./style";
import { projectData } from "@/api/mock/projectData";
import useConfigStore from "@/store/index";
import styled from "styled-components";
import EChartsCommon from "@/components/EChartsCommon";

// 样式组件 (复用)
const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 0 20px;

  .stat-item {
    display: flex;
    align-items: center;
    text-align: center;
    gap: 16px;

    .icon-wrapper {
      position: relative;
      width: 80px;
      height: 80px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 2px solid rgba(0, 186, 255, 0.6);
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        box-shadow: 0 0 15px rgba(0, 186, 255, 0.4);
      }

      .icon {
        font-size: 32px;
        position: relative;
        z-index: 1;
      }
    }

    .value {
      font-size: 24px;
      color: #fff;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .label {
      color: #ccc;
      font-size: 14px;
    }
  }
`;

const CommBox = styled.div`
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;

  .comm-text {
    color: #ddd;
    font-size: 14px;
    line-height: 1.6;
    text-indent: 2em;
    margin-bottom: 20px;
    background: rgba(0, 0, 0, 0.2);
    padding: 15px;
    border-radius: 4px;
  }

  .contact-list {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .contact-item {
      display: flex;
      align-items: center;
      color: #fff;
      font-size: 14px;
      padding: 10px;
      background: rgba(0, 186, 255, 0.1);
      border-radius: 4px;

      &::before {
        content: "";
        display: block;
        width: 8px;
        height: 8px;
        background: #00baff;
        border-radius: 50%;
        margin-right: 10px;
        box-shadow: 0 0 5px #00baff;
      }
    }
  }
`;

const TopStatsBox = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
  // height: 100%;
  align-items: center;
  padding: 0 10px;

  .chart-container {
    flex: 1;
    width: 100%;
    height: 50%;
    position: relative;
  }

  .grid-container {
    flex: 1;
    width: 100%;
    height: 50%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 10px;
  }
`;

const GridItem = styled.div`
  display: flex;
  align-items: center;
   background: linear-gradient(to right, rgba(0, 186, 255, 0.1), transparent);
  border-radius: 500px;
  padding: 16px;
  gap: 16px;

  .icon {
    font-size: 32px;
    margin-right: 8px;
    color: #00baff;
  }

  .info {
    display: flex;
    flex-direction: column;

    .name {
      color: #aaa;
      font-size: 12px;
      margin-bottom: 8px;
      white-space: nowrap;
    }

    .count {
      color: #fff;
      font-size: 24px;
      font-weight: bold;

      .unit {
        font-size: 12px;
        font-weight: normal;
        margin-left: 2px;
        color: #aaa;
      }
    }
  }
`;

// 图表配置
const getLineOption = (data: any) => ({
  tooltip: { trigger: "axis" },
  xAxis: {
    type: "category",
    data: data.xAxis,
    boundaryGap: false,
    axisLabel: { color: "#ccc" },
    axisLine: { lineStyle: { color: "#555" } },
  },
  yAxis: {
    type: "value",
    splitLine: { lineStyle: { color: "rgba(255,255,255,0.1)" } },
    axisLabel: { color: "#ccc" },
  },
  series: [
    {
      name: "data1",
      data: data.data1,
      type: "line",
      smooth: true,
      areaStyle: { opacity: 0.3, color: "#00baff" },
      itemStyle: { color: "#00baff" },
      showSymbol: false,
    },
    {
      name: "data2",
      data: data.data2,
      type: "line",
      smooth: true,
      areaStyle: { opacity: 0.3, color: "#00ff00" },
      itemStyle: { color: "#00ff00" },
      showSymbol: false,
    },
  ],
  grid: { top: 30, bottom: 30, left: 40, right: 20 },
});

const getRingOption = (data: { name: string; value: number }[], seriesName: string) => ({
  tooltip: { trigger: "item" },
  legend: { show: false },
  series: [
    {
      name: seriesName,
      type: "pie",
      radius: ["60%", "80%"],
      center: ["50%", "50%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 5,
        borderColor: "#13192f",
        borderWidth: 2,
      },
      label: { show: false, position: "center" },
      emphasis: {
        label: { show: true, fontSize: 20, fontWeight: "bold", color: "#fff" },
      },
      labelLine: { show: false },
      data: data,
    },
  ],
});

export const RightPageIndex = () => {
  const activeTab = useConfigStore((state) => state.activeTab);
  const renderer = useConfigStore((state) => state.renderer);
  const [data, setData] = useState<any>(undefined);

  const fetchData = async () => {
    setData(projectData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <div>loading...</div>;

  // Overview
  const renderOverview = () => {
    const { extremeWeather, waterLevelCurve, overviewTable, config } =
      data.overview.right;
    const tableData = overviewTable.map((d: any) => [
      d.name,
      d.waterLevel,
      d.flow,
    ]);

    return (
      <>
        <RightTopBox>
          <BorderBox12
            className="right-top-borderBox12"
            style={{ padding: "15px" }}>
            <div
              className="right-top"
              style={{
                height: "100%",
                background: "rgba(19, 25, 47, 0.75)",
                borderRadius: "10px",
              }}>
              <ModuleTitle>
                <i className="iconfont">&#xe7f7;</i>
                <span>{config.extremeWeatherTitle}</span>
              </ModuleTitle>
              <StatGrid>
                {config.weatherStats.map((stat: any, index: number) => (
                  <div
                    className="stat-item"
                    key={index}>
                    <div className="icon-wrapper">
                      <div className="icon">{stat.icon}</div>
                      <div className="label">{stat.label}</div>
                    </div>
                    <div className="value">{extremeWeather[stat.key]} {config.extremeWeatherUnit}</div>
                  </div>
                ))}
              </StatGrid>
            </div>
          </BorderBox12>
        </RightTopBox>

        <RightCenterBox>
          <BorderBox13
            className="right-center-borderBox13"
            style={{ padding: "20px 15px" }}>
            <div
              className="right-center"
              style={{
                height: "100%",
                background: "rgba(19, 25, 47, 0.75)",
                borderRadius: "10px",
              }}>
              <ModuleTitle>
                <i className="iconfont">&#xe7fd;</i>
                <span>{config.waterLevelCurveTitle}</span>
              </ModuleTitle>
              <div style={{ width: "100%", height: "200px" }}>
                <EChartsCommon
                  renderer={renderer}
                  option={getLineOption(waterLevelCurve)}
                />
              </div>
            </div>
          </BorderBox13>
        </RightCenterBox>

        <RightBottomBox>
          <BorderBox13 className="right-bottom-borderBox13">
            <div className="right-bottom">
              <ModuleTitle>
                <i className="iconfont">&#xe790;</i>
                <span>{config.overviewTableTitle}</span>
              </ModuleTitle>
              <div style={{ padding: "10px", height: "calc(100% - 40px)" }}>
                <ScrollBoard
                  config={{
                    header: config.overviewTableHeader,
                    data: tableData,
                    headerBGC: "#00baff",
                    oddRowBGC: "rgba(0, 0, 0, 0.1)",
                    evenRowBGC: "rgba(0, 0, 0, 0.3)",
                    align: ["center"],
                    rowNum: 8,
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </BorderBox13>
        </RightBottomBox>
      </>
    );
  };

  // Structure
  const renderStructure = () => {
    const { personnelSupport, materialSupport, commSupport, config } =
      data.generator.right;
    const personnelData = personnelSupport.map((p: any) => [
      p.name,
      p.unit,
      p.job,
      p.phone,
    ]);
    const materialData = materialSupport.map((m: any) => [
      m.name,
      m.count,
      m.unit,
      m.area,
    ]);

    return (
      <>
        <RightTopBox>
          <div className="right-top">
            <ModuleTitle>
              <i className="iconfont">&#xe7f7;</i>
              <span>{config.personnelTitle}</span>
            </ModuleTitle>
            <div style={{ padding: "5px", height: "190px" }}>
              <ScrollBoard
                config={{
                  header: config.personnelHeader,
                  data: personnelData,
                  headerBGC: "#00baff",
                  align: ["center"],
                  rowNum: 5,
                }}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </RightTopBox>

        <RightCenterBox>
          <BorderBox13
            className="right-center-borderBox13"
            style={{ padding: "20px 15px" }}>
            <div
              className="right-center"
              style={{
                height: "100%",
                background: "rgba(19, 25, 47, 0.75)",
                borderRadius: "10px",
              }}>
              <ModuleTitle>
                <i className="iconfont">&#xe7fd;</i>
                <span>{config.materialTitle}</span>
              </ModuleTitle>
              <div style={{ padding: "5px", height: "240px" }}>
                <ScrollBoard
                  config={{
                    header: config.materialHeader,
                    data: materialData,
                    headerBGC: "#00baff",
                    align: ["center"],
                    rowNum: 5,
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </BorderBox13>
        </RightCenterBox>

        <RightBottomBox>
          <BorderBox13 className="right-bottom-borderBox13">
            <div className="right-bottom">
              <ModuleTitle>
                <i className="iconfont">&#xe790;</i>
                <span>{config.commTitle}</span>
              </ModuleTitle>
              <CommBox>
                {commSupport.length > 0 && (
                  <div className="comm-text">{commSupport[0]}</div>
                )}
                <div className="contact-list">
                  {commSupport.slice(1).map((text: string, idx: number) => (
                    <div
                      key={idx}
                      className="contact-item">
                      {text}
                    </div>
                  ))}
                </div>
              </CommBox>
            </div>
          </BorderBox13>
        </RightBottomBox>
      </>
    );
  };

  // Generator
  const renderGenerator = () => {
    const { rainWarningStats, rainWarningList, config } = data.structure.right;
    const chartData = config.stats.map((item: any) => ({
      name: item.label,
      value: rainWarningStats.details[item.key],
      icon: item.icon,
    }));
    const tableData = rainWarningList.map((d: any) => [
      d.name,
      d.start,
      d.end,
      d.level,
    ]);

    return (
      <>
        <RightTopBox style={{ height: "500px" }}>
          <BorderBox12 className="right-top-borderBox12">
            <div className="right-top">
              <ModuleTitle>
                <i className="iconfont">&#xe7f7;</i>
                <span>{config.rainWarningStatsTitle}</span>
              </ModuleTitle>
              <TopStatsBox>
                <div className="chart-container">
                  <EChartsCommon
                    renderer={renderer}
                    option={getRingOption(chartData, config.rainWarningStatsTitle)}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                      pointerEvents: "none",
                    }}>
                    <div
                      style={{
                        fontSize: "28px",
                        fontWeight: "bold",
                        color: "#00baff",
                      }}>
                      {rainWarningStats.total}
                    </div>
                    <div style={{ color: "#ccc", fontSize: "12px" }}>
                      {config.rainWarningTotalLabel}
                    </div>
                  </div>
                </div>
                <div className="grid-container">
                  {chartData.map((item: any, index: number) => (
                    <GridItem key={index}>
                      <div className="icon">{item.icon}</div>
                      <div className="info">
                        <div className="name">{item.name}</div>
                        <div className="count">
                          {item.value}
                          <span className="unit">{config.rainWarningUnit}</span>
                        </div>
                      </div>
                    </GridItem>
                  ))}
                </div>
              </TopStatsBox>
            </div>
          </BorderBox12>
        </RightTopBox>

        <RightBottomBox style={{ height: "430px", marginTop: "20px" }}>
          <BorderBox13 className="right-bottom-borderBox13">
            <div className="right-bottom">
              <ModuleTitle>
                <i className="iconfont">&#xe790;</i>
                <span>{config.rainWarningListTitle}</span>
              </ModuleTitle>
              <div style={{ padding: "10px", height: "calc(100% - 40px)" }}>
                <ScrollBoard
                  config={{
                    header: config.rainWarningListHeader,
                    data: tableData,
                    headerBGC: "#00baff",
                    align: ["center"],
                    rowNum: 8,
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </BorderBox13>
        </RightBottomBox>
      </>
    );
  };

  return (
    <RightPage>
      {activeTab === "overview" && renderOverview()}
      {activeTab === "structure" && renderStructure()}
      {activeTab === "generator" && renderGenerator()}
    </RightPage>
  );
};
