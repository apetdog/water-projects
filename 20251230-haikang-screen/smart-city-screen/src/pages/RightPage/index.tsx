import { BorderBox13 } from '@jiaminghi/data-view-react'
import { ModuleTitle } from '@/style/globalStyledSet'
import { rightPageDataType } from '@/api/mock/rightPageData'
import earthRotate from '@/assets/images/earth-rotate.gif'

import BrowseCategories from './charts/BrowseCategories'
import { KeyMonitoring } from '@/components/KeyMonitoring'
import HeatIndex from './charts/HeatIndex'
import Satisfaction from './charts/Satisfaction'

type Props = {
  data?: rightPageDataType
}

export const RightPageIndex = ({ data }: Props) => {
  return (
    data ? (
      <div style={{ width: '450px', display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
        <BorderBox13 style={{flex: 1, minHeight: 0, padding: '20px'}}>
            <div className='right-top' style={{ width: '100%', height: '100%' }}>
              <ModuleTitle>
                <i className='iconfont'>&#xe7f7;</i>
                <span>常驻人口统计</span>
              </ModuleTitle>
              <div className='right-top-content' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                <BrowseCategories
                  browseCategories={data.browseCategories}
                ></BrowseCategories>
                <img
                  alt='地球'
                  className='earth-gif'
                  src={earthRotate}
                  style={{ width: '180px', height: 'auto', borderRadius: '50%', overflow: 'hidden' }}
                />
              </div>
            </div>
        </BorderBox13>

        <BorderBox13 style={{flex: 1, minHeight: 0, padding: '20px'}}>
            <div className='right-center' style={{ width: '100%', height: '100%' }}>
              <ModuleTitle>
                <i className='iconfont'>&#xe7fd;</i>
                <span>重点监控</span>
              </ModuleTitle>
              <div style={{marginTop: '20px', height: 'calc(100% - 40px)'}}>
                 <KeyMonitoring />
              </div>
            </div>
        </BorderBox13>

        <BorderBox13 style={{flex: 1, minHeight: 0, padding: '20px'}}>
            <div className='right-bottom' style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
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
      </div>)
      : <div>loading...</div>
  )
}
