import { useEffect, useState } from 'react'
import { BorderBox13 } from '@jiaminghi/data-view-react'
import { ModuleTitle } from '@/style/globalStyledSet'
import { rightPageDataType } from '@/api/mock/rightPageData'
import { RightPage, RightTopBox, RightCenterBox, RightBottomBox } from './style'
import { get } from '@/api/http'
import { ResultEnum } from '@/enums/httpEnum'
import { rightPageDataApi } from '@/api/mock/index'
import earthRotate from '@/assets/images/earth-rotate.gif'

import BrowseCategories from './charts/BrowseCategories'
import { KeyMonitoring } from '@/components/KeyMonitoring'
import HeatIndex from './charts/HeatIndex'
import Satisfaction from './charts/Satisfaction'

export const RightPageIndex = () => {
  const [rightData, setRightData] = useState<rightPageDataType | undefined>(undefined)

  const fetchData = async () => {
    const res = await get(rightPageDataApi)
    if (res.code === ResultEnum.SUCCESS) {
      setRightData(res.data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    rightData ? (
      <RightPage>
        <RightTopBox>
          <BorderBox13 className='right-top-borderBox13'>
            <div className='right-top'>
              <ModuleTitle>
                <i className='iconfont'>&#xe7f7;</i>
                <span>常驻人口统计</span>
              </ModuleTitle>
              <div className='right-top-content'>
                <BrowseCategories
                  browseCategories={rightData.browseCategories}
                ></BrowseCategories>
                <img
                  alt='地球'
                  className='earth-gif'
                  src={earthRotate}
                />
              </div>
            </div>
          </BorderBox13>
        </RightTopBox>

        <RightCenterBox>
          <BorderBox13 className='right-center-borderBox13'>
            <div className='right-center'>
              <ModuleTitle>
                <i className='iconfont'>&#xe7fd;</i>
                <span>重点监控</span>
              </ModuleTitle>
              <div style={{marginTop: '20px', height: 'calc(100% - 40px)'}}>
                 <KeyMonitoring />
              </div>
            </div>
          </BorderBox13>
        </RightCenterBox>

        <RightBottomBox>
          <BorderBox13 className='right-bottom-borderBox13'>
            <div className='right-bottom'>
              <ModuleTitle>
                <i className='iconfont'>&#xe790;</i>
                <span>园区热力与满意度</span>
              </ModuleTitle>
              
              <div style={{display: 'flex', width: '100%', flex: 1, minHeight: 0}}>
                 <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                    <div style={{textAlign: 'center', color: '#fff', marginBottom: '10px'}}>园区热力指数</div>
                    <div style={{flex: 1, minHeight: 0}}>
                      <HeatIndex />
                    </div>
                 </div>
                 <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                    <div style={{textAlign: 'center', color: '#fff', marginBottom: '10px'}}>企业服务满意度</div>
                    <div style={{flex: 1, minHeight: 0}}>
                      <Satisfaction />
                    </div>
                 </div>
              </div>
            </div>
          </BorderBox13>
        </RightBottomBox>
      </RightPage>)
      : <div>loading...</div>
  )
}
