import { useEffect, useRef, lazy, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { LayoutStyle, IndexPageStyle, IndexPageContent } from './style';
import TopPage from '../TopPage';
import { previewFitScale } from '@/utils/previewScale'

const CityModel = lazy(() => import('@/components/CityModel').then(module => ({ default: module.CityModel })));

// 总页面
export const LayoutPage = () => {
  const scaleDom = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    const { calcRate, windowResize, unWindowResize } = previewFitScale(1920, 1080, scaleDom.current)
    calcRate()
    windowResize()
    return () => {
      unWindowResize()
    }
  }, [])

  // Show CityModel only on comprehensive page (and potentially center page if it's a route)
  // According to current structure, CenterPageIndex is inside ComprehensivePage, so just checking for /comprehensive is enough?
  // Wait, CenterPageIndex is used inside ComprehensivePage. But if user navigates to /security, we want to hide it.
  const showCityModel = location.pathname === '/comprehensive' || location.pathname === '/' || location.pathname === '/center';

  return (
    <LayoutStyle ref={scaleDom} className='scale-layout'>
      <IndexPageStyle>
        <TopPage />
        <IndexPageContent>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            visibility: showCityModel ? 'visible' : 'hidden',
            pointerEvents: showCityModel ? 'auto' : 'none',
            zIndex: 0
          }}>
            <Suspense fallback={null}>
               <CityModel />
            </Suspense>
          </div>
          <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <Outlet />
          </div>
        </IndexPageContent>
      </IndexPageStyle>
    </LayoutStyle>
  )
}