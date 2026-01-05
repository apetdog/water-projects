import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutStyle, IndexPageStyle, IndexPageContent } from './style';
import TopPage from '../TopPage';
import { previewFitScale } from '@/utils/previewScale'

// 总页面
export const LayoutPage = () => {
  const scaleDom = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const { calcRate, windowResize, unWindowResize } = previewFitScale(1920, 1080, scaleDom.current)
    calcRate()
    windowResize()
    return () => {
      unWindowResize()
    }
  }, [])

  return (
    <LayoutStyle ref={scaleDom} className='scale-layout'>
      <IndexPageStyle>
        <TopPage />
        <IndexPageContent>
          <Outlet />
        </IndexPageContent>
      </IndexPageStyle>
    </LayoutStyle>
  )
}