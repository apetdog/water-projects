import { BorderBox13, CapsuleChart } from '@jiaminghi/data-view-react';
import { ModuleTitle } from '@/style/globalStyledSet';
import { DroneView } from '@/components/DroneView';
import IndustrialRadar from './charts/IndustrialRadar';
import { leftPageDataType } from '@/api/mock/leftPageData'

type Props = {
  data?: leftPageDataType
}

export const LeftPageIndex = ({ data }: Props) => {
  // Prevent unused variable warning
  void data;
  // Mock data for the middle box
  const config = {
    data: [
      {
        name: '门禁设备',
        value: 167
      },
      {
        name: '摄像头',
        value: 67
      },
      {
        name: '烟感传感器',
        value: 123
      },
      {
        name: '智能路灯',
        value: 55
      },
      {
        name: '环境监测点',
        value: 98
      }
    ],
    colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
    unit: '台'
  }

  return (
    <div style={{ width: '450px', display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', pointerEvents: 'auto' }}>
      {/* 顶部图表 - 物联设备在线统计 */}
      <BorderBox13 style={{flex: 1, minHeight: 0, padding: '20px'}}>
        <ModuleTitle>
          <i className='iconfont'>&#xe7eb;</i>
          <span>物联设备在线统计</span>
        </ModuleTitle>
        <div style={{ width: '100%', height: 'calc(100% - 40px)', padding: '20px' }}>
            <CapsuleChart config={config} style={{width: '100%', height: '100%'}} />
        </div>
      </BorderBox13>

      {/* 中部图表 - 无人机视角 */}
      <BorderBox13 style={{flex: 1, minHeight: 0, padding: '20px'}}>
        <ModuleTitle>
          <i className='iconfont'>&#xe78f;</i>
          <span>无人机视角</span>
        </ModuleTitle>
        <div style={{ marginTop: '8px', height: 'calc(100% - 40px)' }}>
            <DroneView />
        </div>
      </BorderBox13>

      {/* 底部图表 */}
      <BorderBox13 style={{flex: 1, minHeight: 0, padding: '20px'}}>
        <ModuleTitle>
          <i className='iconfont'>&#xe88e;</i>
          <span>产业结构分析</span>
        </ModuleTitle>
        {/* 图表 */}
        <div style={{ width: '100%', height: 'calc(100% - 40px)' }}>
          <IndustrialRadar />
        </div>
      </BorderBox13>
    </div>
  )
}
