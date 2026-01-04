import { BorderBox12, BorderBox13, CapsuleChart } from '@jiaminghi/data-view-react';
import { useEffect, useState } from 'react';
import { ModuleTitle } from '@/style/globalStyledSet';
import { DroneView } from '@/components/DroneView';
import IndustrialRadar from './charts/IndustrialRadar';
import { LeftPage, LeftTopBox, LeftMiddleBox, LeftBottomBox } from './style';
import { leftPageDataType } from '@/api/mock/leftPageData'
import { get } from '@/api/http'
import { ResultEnum } from '@/enums/httpEnum'
import {
  leftPageDataApi,
} from '@/api/mock/index'

export const LeftPageIndex = () => {
  const [leftData, setLeftData] = useState<leftPageDataType | undefined>(undefined)

  const fetchData = async () => {
    const res = await get(leftPageDataApi)
    if (res.code === ResultEnum.SUCCESS) {
      setLeftData(res.data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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

  return leftData ?
    <LeftPage>
      {/* 顶部图表 - 物联设备在线统计 */}
      <LeftTopBox>
        <BorderBox13 className='left-top-borderBox12'>
          <div className='left-top'>
            <ModuleTitle>
              <i className='iconfont'>&#xe7eb;</i>
              <span>物联设备在线统计</span>
            </ModuleTitle>
            <div style={{ width: '100%', height: 'calc(100% - 40px)', padding: '20px' }}>
               <CapsuleChart config={config} style={{width: '100%', height: '100%'}} />
            </div>
          </div>
        </BorderBox13>
      </LeftTopBox>

      {/* 中部图表 - 无人机视角 */}
      <LeftMiddleBox>
        <BorderBox13 className='left-middle-borderBox13'>
          <div className='left-middle'>
            <ModuleTitle>
              <i className='iconfont'>&#xe78f;</i>
              <span>无人机视角</span>
            </ModuleTitle>
            <div style={{ marginTop: '20px', height: 'calc(100% - 40px)' }}>
               <DroneView />
            </div>
          </div>
        </BorderBox13>
      </LeftMiddleBox>

      {/* 底部图表 */}
      <LeftBottomBox>
        <BorderBox13 className='left-bottom-borderBox13'>
          <div className='left-bottom'>
            <ModuleTitle>
              <i className='iconfont'>&#xe88e;</i>
              <span>产业结构分析</span>
            </ModuleTitle>
            {/* 图表 */}
            <div style={{ width: '100%', height: 'calc(100% - 40px)' }}>
              <IndustrialRadar />
            </div>
          </div>
        </BorderBox13>
      </LeftBottomBox>
    </LeftPage> : <div>loading...</div>
}
