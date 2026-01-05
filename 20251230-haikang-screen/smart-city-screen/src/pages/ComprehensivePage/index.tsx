import { useEffect, useState } from 'react';
import { LeftPageIndex } from '../LeftPage';
import { CenterPageIndex } from '../CenterPage';
import { RightPageIndex } from '../RightPage';
import { leftPageDataType } from '@/api/mock/leftPageData'
import { rightPageDataType } from '@/api/mock/rightPageData'
import { get } from '@/api/http'
import { ResultEnum } from '@/enums/httpEnum'
import { leftPageDataApi, rightPageDataApi } from '@/api/mock/index'

export const ComprehensivePage = () => {
  const [leftData, setLeftData] = useState<leftPageDataType | undefined>(undefined)
  const [rightData, setRightData] = useState<rightPageDataType | undefined>(undefined)

  const fetchData = async () => {
    const resLeft = await get(leftPageDataApi)
    if (resLeft.code === ResultEnum.SUCCESS) {
      setLeftData(resLeft.data)
    }
    const resRight = await get(rightPageDataApi)
    if (resRight.code === ResultEnum.SUCCESS) {
      setRightData(resRight.data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <iframe 
        id="city-3d-iframe"
        src="http://localhost:8080"
        style={{
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%',
          height: '100%',
          border: 'none',
          zIndex: 0,
          pointerEvents: 'auto' // Allow interaction with 3D scene directly
        }}
        title="3D City Map"
      />
      <div style={{position: 'relative', zIndex: 1, display: 'flex', width: '100%', height: '100%', justifyContent: 'space-between'}}>
        <LeftPageIndex data={leftData} />
        <CenterPageIndex />
        <RightPageIndex data={rightData} />
      </div>
    </>
  )
}
