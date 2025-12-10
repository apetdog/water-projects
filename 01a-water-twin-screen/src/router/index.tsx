import { Page1 } from '../pages/Page1'
import { Page2 } from '../pages/Page2'
import { Page3 } from '../pages/Page3'
import { Navigate } from 'react-router-dom'

const routes = [
  {
    path: '/',
    element: <Navigate to="/page1" replace />
  },
  {
    path: '/page1',
    element: <Page1 />
  },
  {
    path: '/page2',
    element: <Page2 />
  },
  {
    path: '/page3',
    element: <Page3 />
  },
  {
    path: '*',
    element: <div>页面丢失了</div>
  }
]

export default routes
