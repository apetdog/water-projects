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
      <LeftPageIndex data={leftData} />
      <CenterPageIndex />
      <RightPageIndex data={rightData} />
    </>
  )
}
