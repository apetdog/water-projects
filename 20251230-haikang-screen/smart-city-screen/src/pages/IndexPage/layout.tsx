import { useEffect, useRef } from 'react';
import { LayoutStyle, IndexPageStyle, IndexPageContent } from './style';
import TopPage from '../TopPage';
import { LeftPageIndex } from '../LeftPage';
import { CenterPageIndex } from '../CenterPage';
import { RightPageIndex } from '../RightPage';
import { SecurityPage } from '../SecurityPage';
import { VideoPage } from '../VideoPage';
import { EcologyPage } from '../EcologyPage';
import { previewFitScale } from '@/utils/previewScale'
import useConfigStore from '@/store/index';

// 总页面
export const LayoutPage = () => {
  const scaleDom = useRef<HTMLDivElement>(null)
  const { activeTab } = useConfigStore()

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
          {activeTab === 'comprehensive' && (
            <>
              <LeftPageIndex />
              <CenterPageIndex />
              <RightPageIndex />
            </>
          )}
          {activeTab === 'security' && <SecurityPage />}
          {activeTab === 'video' && <VideoPage />}
          {activeTab === 'ecology' && <EcologyPage />}
        </IndexPageContent>
      </IndexPageStyle>
    </LayoutStyle>
  )
}