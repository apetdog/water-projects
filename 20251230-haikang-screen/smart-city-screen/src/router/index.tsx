import { IndexPage } from '../pages/IndexPage'
import { Navigate } from 'react-router-dom'
import { ComprehensivePage } from '../pages/ComprehensivePage'
import { SecurityPage } from '../pages/SecurityPage'
import { VideoPage } from '../pages/VideoPage'
import { EcologyPage } from '../pages/EcologyPage'

const routes = [
  {
    path: '/',
    element: IndexPage(),
    children: [
      {
        path: '/',
        element: <Navigate to="/comprehensive" replace />
      },
      {
        path: '/comprehensive',
        element: <ComprehensivePage />
      },
      {
        path: '/security',
        element: <SecurityPage />
      },
      {
        path: '/video',
        element: <VideoPage />
      },
      {
        path: '/ecology',
        element: <EcologyPage />
      }
    ]
  },
  {
    path: '*',
    element: <div>页面丢失了</div>
  }
]

export default routes
