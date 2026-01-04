import { BorderBox12, BorderBox13 } from '@jiaminghi/data-view-react';
import { useEffect, useState } from 'react';
import { ModuleTitle } from '@/style/globalStyledSet';
import { DroneView } from '@/components/DroneView';
import IndustrialRadar from './charts/IndustrialRadar';
import { LeftPage, LeftTopBox, LeftBottomBox } from './style';
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

  return leftData ?
    <LeftPage>
      {/* 顶部图表 */}
      <LeftTopBox>
        <BorderBox12 className='left-top-borderBox12'>
          <div className='left-top'>
            <ModuleTitle>
              <i className='iconfont'>&#xe78f;</i>
              <span>无人机视角</span>
            </ModuleTitle>
            <div style={{ marginTop: '20px', height: 'calc(100% - 40px)' }}>
               <DroneView />
            </div>
          </div>
        </BorderBox12>
      </LeftTopBox>

      {/* 底部图表 */}
      <LeftBottomBox>
        <BorderBox13 className='left-bottom-borderBox13'>
          <div className='left-bottom'>
            <ModuleTitle>
              <i className='iconfont'>&#xe88e;</i>
              <span>产业结构分析</span>
            </ModuleTitle>
            {/* 图表 */}
            <div style={{ width: '100%', height: '300px' }}>
              <IndustrialRadar />
            </div>
          </div>
        </BorderBox13>
      </LeftBottomBox>
    </LeftPage> : <div>loading...</div>
}

