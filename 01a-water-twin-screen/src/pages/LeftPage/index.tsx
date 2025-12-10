import {
  BorderBox12,
  BorderBox13,
  ScrollBoard,
} from "@jiaminghi/data-view-react";
import { useEffect, useState } from "react";
import { ModuleTitle } from "@/style/globalStyledSet";
import { LeftPage, LeftTopBox, LeftCenterBox, LeftBottomBox } from "./style";
import { projectData } from "@/api/mock/projectData";
import useConfigStore from "@/store/index";
import styled from "styled-components";
import EChartsCommon from "@/components/EChartsCommon";

// 样式组件
const CircleStats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
  gap: 20px;

  .row {
    display: flex;
    justify-content: center;
    gap: 30px;
  }

  .stat-item-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;

    .circle-item {
      width: 64px;
      height: 64px;
      border: 2px solid rgba(0, 186, 255, 0.6);
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: rgba(0, 186, 255, 0.1);
      box-shadow: 0 0 15px rgba(0, 186, 255, 0.2) inset;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
        border-radius: 50%;
        border: 1px dashed rgba(0, 186, 255, 0.3);
        animation: rotate 10s linear infinite;
      }

      @keyframes rotate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      .value {
        font-size: 16px;
        color: #fff;
        font-weight: bold;
      }
    }

    .label {
      margin-top: 4px;
      font-size: 12px;
      color: #ccc;
    }
  }
`;

const MonitorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 20px;
  height: calc(100% - 40px);

  .monitor-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: linear-gradient(to right, rgba(0, 186, 255, 0.1), transparent);
    border-radius: 500px 0 0 500px;

    .icon-wrapper {
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 0;

      .icon {
        font-size: 32px;
        color: #00baff;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border-radius: 8px;
      padding: 12px 15px 12px 0;
      flex: 1;
      transition: all 0.3s;

      .text {
        color: #fff;
        font-size: 14px;
        margin-bottom: 5px;
      }

      .count {
        color: #ffcc00;
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
`;

const HydrologyInfo = styled.div`
  padding: 15px 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 16px;

  .info-block {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .label {
      color: #00baff;
      font-size: 13px;
      margin-bottom: 5px;
      padding: 6px 12px;
      display: flex;
      align-items: center;
      background: linear-gradient(
        to right,
        rgba(0, 186, 255, 0.3),
        transparent
      );
      border-left: 2px solid #00baff;

      &::before {
        content: "";
        display: inline-block;
        width: 6px;
        height: 6px;
        background: #00baff;
        border-radius: 50%;
        margin-right: 6px;
      }
    }

    .value {
      color: #fff;
      font-size: 24px;
      font-weight: bold;
      padding-left: 12px;
      margin-top: 5px;
      font-family: "DIN Alternate", sans-serif;
    }
  }
`;

const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 20px;
  padding: 15px;

  .plan-item {
    display: flex;
    flex-direction: column;
    border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
    padding-bottom: 5px;

    .label {
      color: #aaa;
      font-size: 12px;
      margin-bottom: 3px;
      display: flex;
      align-items: center;

      &::before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 4px;
        background: #fff;
        border-radius: 50%;
        margin-right: 5px;
      }
    }

    .value {
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      padding-left: 10px;
    }
  }
`;

const ResultContainer = styled.div`
  display: flex;
  height: 100%;
  padding: 10px;

  .chart-box {
    flex: 1;
    height: 100%;
  }

  .stats-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;

    .stat-row {
      display: flex;
      flex-direction: column;

      .label {
        color: #ccc;
        font-size: 12px;
      }
      .value {
        color: #00baff;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
`;

const TopStatsBox = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
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
    // height: 50%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 10px;
  }
`;

const GridItem = styled.div`
  display: flex;
  align-items: center;
  // background: rgba(255, 255, 255, 0.05);
  background: linear-gradient(to right, rgba(0, 186, 255, 0.1), transparent);
  border-radius: 500px;
  padding: 16px;
  gap: 16px;

  .icon {
    font-size: 24px;
    margin-right: 8px;
    color: #00baff;
  }

  .info {
    display: flex;
    flex-direction: column;

    .name {
      color: #aaa;
      font-size: 12px;
      margin-bottom: 2px;
      white-space: nowrap;
    }

    .count {
      color: #fff;
      font-size: 32px;
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

// 简单的环形图配置
const getRingOption = (
  data: { name: string; value: number }[],
  seriesName: string
) => ({
  tooltip: {
    trigger: "item",
  },
  legend: {
    show: false,
  },
  series: [
    {
      name: seriesName,
      type: "pie",
      radius: ["55%", "75%"],
      center: ["50%", "50%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 5,
        borderColor: "#13192f",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: "bold",
          color: "#fff",
        },
      },
      labelLine: {
        show: false,
      },
      data: data,
    },
  ],
});

const getGaugeOption = (value: number, name: string) => ({
  series: [
    {
      type: "gauge",
      startAngle: 90,
      endAngle: -270,
      pointer: { show: false },
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        itemStyle: {
          borderWidth: 1,
          borderColor: "#464646",
        },
      },
      axisLine: {
        lineStyle: {
          width: 20,
        },
      },
      splitLine: { show: false, distance: 0, length: 10 },
      axisTick: { show: false },
      axisLabel: { show: false, distance: 50 },
      data: [
        {
          value: value,
          name: name,
          title: { offsetCenter: ["0%", "0%"] },
          detail: { offsetCenter: ["0%", "0%"] },
        },
      ],
      title: {
        fontSize: 14,
      },
      detail: {
        width: 50,
        height: 14,
        fontSize: 20,
        color: "#fff",
        formatter: "{value}%",
      },
    },
  ],
});

// 气象监测配置 (moved to mock data)
// const MONITOR_ITEMS = [
//   {
//     key: "waterLevelAlerts",
//     label: "监管区域水位",
//     icon: "🌊",
//   },
//   {
//     key: "waterQualityAlerts",
//     label: "水质告警",
//     icon: "💧",
//   },
//   {
//     key: "mountainTorrentAlerts",
//     label: "山洪预警",
//     icon: "⚠️",
//   },
//   {
//     key: "sunRadiationAlerts",
//     label: "太阳辐射告警",
//     icon: "☀️",
//   },
// ];

export const LeftPageIndex = () => {
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
    const { weatherOverview, weatherMonitor, config } = data.overview.left;
    return (
      <>
        <LeftTopBox>
          <BorderBox12 className="left-top-borderBox12">
            <div className="left-top">
              <ModuleTitle>
                <i className="iconfont">&#xe78f;</i>
                <span>{config.overviewTitle}</span>
              </ModuleTitle>
              <CircleStats>
                <div className="row">
                  <div className="stat-item-wrapper">
                    <div className="circle-item">
                      <div className="value">
                        {weatherOverview.monitoringPoints}个
                      </div>
                    </div>
                    <div className="label">{config.monitoringPointsLabel}</div>
                  </div>
                  <div className="stat-item-wrapper">
                    <div className="circle-item">
                      <div className="value">{weatherOverview.detectors}个</div>
                    </div>
                    <div className="label">{config.detectorsLabel}</div>
                  </div>
                </div>
                <div className="row">
                  <div className="stat-item-wrapper">
                    <div className="circle-item">
                      <div className="value">
                        {weatherOverview.avgRainfall}mm
                      </div>
                    </div>
                    <div className="label">{config.avgRainfallLabel}</div>
                  </div>
                  <div className="stat-item-wrapper">
                    <div className="circle-item">
                      <div
                        className="value"
                        style={{ color: config.colors.fireAlerts }}>
                        {weatherOverview.fireAlerts}次
                      </div>
                    </div>
                    <div className="label">{config.fireAlertsLabel}</div>
                  </div>
                  <div className="stat-item-wrapper">
                    <div className="circle-item">
                      <div
                        className="value"
                        style={{ color: config.colors.totalAlerts }}>
                        {weatherOverview.totalAlerts}次
                      </div>
                    </div>
                    <div className="label">{config.totalAlertsLabel}</div>
                  </div>
                </div>
              </CircleStats>
            </div>
          </BorderBox12>
        </LeftTopBox>

        <LeftCenterBox>
          <BorderBox13 className="left-center-borderBox13">
            <div className="left-center">
              <ModuleTitle>
                <i className="iconfont">&#xe88e;</i>
                <span>{config.monitorTitle}</span>
              </ModuleTitle>
              <MonitorGrid>
                {weatherMonitor.config.map((item: any) => (
                  <div
                    className="monitor-item"
                    key={item.key}>
                    <div className="icon-wrapper">
                      <span className="icon">{item.icon}</span>
                    </div>
                    <div className="content">
                      <span className="text">{item.label}</span>
                      <span className="count">
                        {weatherMonitor.data[item.key]} 个
                      </span>
                    </div>
                  </div>
                ))}
              </MonitorGrid>
            </div>
          </BorderBox13>
        </LeftCenterBox>

        <LeftBottomBox>
          <BorderBox13 className="left-bottom-borderBox13">
            <div className="left-bottom">
              <ModuleTitle>
                <i className="iconfont">&#xe7b3;</i>
                <span>{config.hydrologyTitle}</span>
              </ModuleTitle>
              <HydrologyInfo>
                <div className="info-block">
                  <span className="label">
                    {config.hydrologyLabels.maxWaterLevel}
                  </span>
                  <span className="value">
                    {weatherMonitor.hydrology.maxWaterLevel}
                  </span>
                </div>
                <div className="info-block">
                  <span className="label">
                    {config.hydrologyLabels.maxWaterLevelTime}
                  </span>
                  <span className="value">
                    {weatherMonitor.hydrology.maxWaterLevelTime}
                  </span>
                </div>
                <div className="info-block">
                  <span className="label">
                    {config.hydrologyLabels.outboundPeakFlow}
                  </span>
                  <span className="value">
                    {weatherMonitor.hydrology.outboundPeakFlow}
                  </span>
                </div>
                <div className="info-block">
                  <span className="label">
                    {config.hydrologyLabels.storageFlow}
                  </span>
                  <span className="value">
                    {weatherMonitor.hydrology.storageFlow}
                  </span>
                </div>
                <div className="info-block">
                  <span className="label">
                    {config.hydrologyLabels.monitorWaterLevel}
                  </span>
                  <span className="value">
                    {weatherMonitor.hydrology.monitorWaterLevel}
                  </span>
                </div>
                <div className="info-block">
                  <span className="label">
                    {config.hydrologyLabels.damElevation}
                  </span>
                  <span className="value">
                    {weatherMonitor.hydrology.damElevation}
                  </span>
                </div>
              </HydrologyInfo>
            </div>
          </BorderBox13>
        </LeftBottomBox>
      </>
    );
  };

  // Structure
  const renderStructure = () => {
    const {
      dispatchPlan,
      dispatchResult,
      responseMeasures,
      evacuationRoutes,
      config,
    } = data.generator.left;
    const routeData = evacuationRoutes.map((r: any) => [
      r.id,
      r.start,
      r.end,
      '<span style="color:#0f0">运行</span>',
    ]);

    return (
      <>
        <LeftTopBox>
          <BorderBox12 className="left-top-borderBox12">
            <div className="left-top">
              <ModuleTitle>
                <i className="iconfont">&#xe78f;</i>
                <span>{config.dispatchPlanTitle}</span>
              </ModuleTitle>
              <div style={{ padding: "10px" }}>
                <div
                  style={{
                    color: "#00baff",
                    fontSize: "14px",
                    marginBottom: "10px",
                  }}>
                  {config.alertInfoLabel}
                </div>
                <PlanGrid>
                  <div className="plan-item">
                    <span className="label">
                      {config.dispatchPlanLabels.maxWaterLevel}
                    </span>
                    <span className="value">{dispatchPlan.maxWaterLevel}</span>
                  </div>
                  <div className="plan-item">
                    <span className="label">
                      {config.dispatchPlanLabels.maxWaterLevelTime}
                    </span>
                    <span className="value">
                      {dispatchPlan.maxWaterLevelTime}
                    </span>
                  </div>
                  <div className="plan-item">
                    <span className="label">
                      {config.dispatchPlanLabels.outboundPeakFlow}
                    </span>
                    <span className="value">
                      {dispatchPlan.outboundPeakFlow}
                    </span>
                  </div>
                  <div className="plan-item">
                    <span className="label">
                      {config.dispatchPlanLabels.storageFlow}
                    </span>
                    <span className="value">{dispatchPlan.storageFlow}</span>
                  </div>
                  <div className="plan-item">
                    <span className="label">
                      {config.dispatchPlanLabels.highestReservoirLevel}
                    </span>
                    <span className="value">
                      {dispatchPlan.highestReservoirLevel}
                    </span>
                  </div>
                  <div className="plan-item">
                    <span className="label">
                      {config.dispatchPlanLabels.endWaterLevel}
                    </span>
                    <span className="value">{dispatchPlan.endWaterLevel}</span>
                  </div>
                </PlanGrid>
              </div>
            </div>
          </BorderBox12>
        </LeftTopBox>

        <LeftCenterBox>
          <BorderBox13 className="left-center-borderBox13">
            <div className="left-center">
              <ModuleTitle>
                <i className="iconfont">&#xe88e;</i>
                <span>{config.dispatchResultTitle}</span>
              </ModuleTitle>
              <ResultContainer>
                <div className="chart-box">
                  <EChartsCommon
                    renderer={renderer}
                    option={getGaugeOption(
                      dispatchResult.gaugeValue,
                      config.dispatchCompletionLabel
                    )}
                  />
                </div>
                <div className="stats-box">
                  <div className="stat-row">
                    <span className="label">
                      {config.dispatchResultLabels.inflow}
                    </span>
                    <span className="value">{dispatchResult.inflow}</span>
                  </div>
                  <div className="stat-row">
                    <span className="label">
                      {config.dispatchResultLabels.retention}
                    </span>
                    <span className="value">{dispatchResult.retention}</span>
                  </div>
                  <div className="stat-row">
                    <span className="label">
                      {config.dispatchResultLabels.outflow}
                    </span>
                    <span className="value">{dispatchResult.outflow}</span>
                  </div>
                  <div className="stat-row">
                    <span className="label">
                      {config.dispatchResultLabels.ecologicalFlow}
                    </span>
                    <span className="value">
                      {dispatchResult.ecologicalFlow}
                    </span>
                  </div>
                </div>
              </ResultContainer>
            </div>
          </BorderBox13>
        </LeftCenterBox>

        <LeftBottomBox>
          <div style={{ height: "40%", marginBottom: "10px" }}>
            <BorderBox13 style={{ padding: "15px" }}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "rgba(19, 25, 47, 0.75)",
                  borderRadius: "10px",
                }}>
                <ModuleTitle>
                  <i className="iconfont">&#xe7b3;</i>
                  <span>{config.responseMeasuresTitle}</span>
                </ModuleTitle>
                <div
                  style={{
                    padding: "10px",
                    color: "#ddd",
                    fontSize: "14px",
                    lineHeight: "1.5",
                  }}>
                  {responseMeasures}
                </div>
              </div>
            </BorderBox13>
          </div>
          <div style={{ height: "58%" }}>
            <BorderBox13 style={{ padding: "15px" }}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "rgba(19, 25, 47, 0.75)",
                  borderRadius: "10px",
                }}>
                <ModuleTitle>
                  <i className="iconfont">&#xe636;</i>
                  <span>{config.evacuationRoutesTitle}</span>
                </ModuleTitle>
                <div style={{ padding: "10px", height: "calc(100% - 40px)" }}>
                  <ScrollBoard
                    config={{
                      header: config.evacuationRoutesHeader,
                      data: routeData,
                      headerBGC: "#00baff",
                      align: ["center"],
                      rowNum: 5,
                    }}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            </BorderBox13>
          </div>
        </LeftBottomBox>
      </>
    );
  };

  // Generator
  const renderGenerator = () => {
    const { weatherWarningStats, waterLevelWarning, config } =
      data.structure.left;
    // Transform stats for chart
    const chartData = weatherWarningStats.details.map((d: any) => ({
      name: d.name,
      value: d.count,
    }));
    // Transform list for scrollboard
    const scrollData = waterLevelWarning.map((d: any) => [
      d.name,
      d.time,
      d.waterLevel,
      `<span style="color:${d.status === "高危" ? "red" : "green"}">${
        d.status
      }</span>`,
    ]);

    const icons = weatherWarningStats.icons;

    return (
      <>
        <LeftTopBox style={{ height: "500px" }}>
          <BorderBox12 className="left-top-borderBox12">
            <div className="left-top">
              <ModuleTitle>
                <i className="iconfont">&#xe78f;</i>
                <span>{config.warningStatsTitle}</span>
              </ModuleTitle>
              <TopStatsBox>
                <div className="chart-container">
                  <EChartsCommon
                    renderer={renderer}
                    option={getRingOption(chartData, config.warningStatsTitle)}
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
                        color: "#ff9f0e",
                      }}>
                      {weatherWarningStats.total}
                    </div>
                    <div style={{ color: "#ccc", fontSize: "12px" }}>
                      {config.totalWarningLabel}
                    </div>
                  </div>
                </div>
                <div className="grid-container">
                  {weatherWarningStats.details.map(
                    (item: any, index: number) => (
                      <GridItem key={index}>
                        <div className="icon">
                          {icons[index % icons.length]}
                        </div>
                        <div className="info">
                          <div className="name">{item.name}</div>
                          <div className="count">
                            {item.count}
                            <span className="unit">
                              {config.totalWarningUnit}
                            </span>
                          </div>
                        </div>
                      </GridItem>
                    )
                  )}
                </div>
              </TopStatsBox>
            </div>
          </BorderBox12>
        </LeftTopBox>

        <LeftBottomBox style={{ height: "460px", marginBottom: "20px" }}>
          <BorderBox13 className="left-bottom-borderBox13">
            <div className="left-bottom">
              <ModuleTitle>
                <i className="iconfont">&#xe88e;</i>
                <span>{config.waterLevelWarningTitle}</span>
              </ModuleTitle>
              <div style={{ padding: "10px", height: "calc(100% - 50px)" }}>
                <ScrollBoard
                  config={{
                    header: config.waterLevelWarningHeader,
                    data: scrollData,
                    headerBGC: "#00baff",
                    oddRowBGC: "rgba(0, 0, 0, 0.1)",
                    evenRowBGC: "rgba(0, 0, 0, 0.3)",
                    align: ["center"],
                    rowNum: 7,
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </BorderBox13>
        </LeftBottomBox>
      </>
    );
  };

  return (
    <LeftPage>
      {activeTab === "overview" && renderOverview()}
      {activeTab === "structure" && renderStructure()}
      {activeTab === "generator" && renderGenerator()}
    </LeftPage>
  );
};
