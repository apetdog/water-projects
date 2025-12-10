import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutStyle, IndexPageStyle, IndexPageContent } from './style';
import TopPage from '../TopPage';
import { LeftPageIndex } from '../LeftPage';
import { CenterPageIndex } from '../CenterPage';
import { RightPageIndex } from '../RightPage';
import { previewFitScale } from '@/utils/previewScale'
import useConfigStore from '@/store/index';

// 总页面
export const LayoutPage = () => {
  const [searchParams] = useSearchParams();
  const hideHeader = searchParams.get('hideHeader') === 'true';
  const scaleDom = useRef<HTMLDivElement>(null)
  const activeTab = useConfigStore(state => state.activeTab);

  useEffect(() => {
    const { calcRate, windowResize, unWindowResize } = previewFitScale(1920, 1080, scaleDom.current)
    calcRate()
    windowResize()
    return () => {
      unWindowResize()
    }
  }, [])

  const getVideoSource = () => {
    const baseUrl = import.meta.env.BASE_URL;
    switch (activeTab) {
      case 'overview':
        return `${baseUrl}bg01.mp4`;
      case 'structure':
        return `${baseUrl}bg02.mp4`;
      case 'generator':
        return `${baseUrl}bg03.mp4`;
      default:
        return `${baseUrl}bg01.mp4`;
    }
  }

  return (
    <LayoutStyle ref={scaleDom} className='scale-layout'>
      <IndexPageStyle>
        <video
          key={activeTab}
          autoPlay
          loop
          muted
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        >
          <source src={getVideoSource()} type="video/mp4" />
        </video>
        <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
          {!hideHeader && <TopPage />}
          <IndexPageContent>
            <LeftPageIndex />
            <CenterPageIndex />
            <RightPageIndex />
          </IndexPageContent>
        </div>
      </IndexPageStyle>
    </LayoutStyle>
  )
}