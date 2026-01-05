import { useEffect, useRef, useState } from 'react';
import { formatTime } from '@/utils/index';
import {
  Decoration10,
  Decoration8,
  Decoration6,
} from '@jiaminghi/data-view-react';
import { useNavigate, useLocation } from 'react-router-dom';

import { TopBox, TimeBox, LeftTabBox, RightTabBox, TabItem } from './style';

const stateInfo = {
  title: '智慧管控平台',
  weekday: [
    '星期天',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ],
}

const leftTabs = [
  { key: 'comprehensive', label: '综合态势', path: '/comprehensive' },
  { key: 'security', label: '智慧安防', path: '/security' },
]

const rightTabs = [
  { key: 'video', label: '视频融合', path: '/video' },
  { key: 'ecology', label: '绿色生态', path: '/ecology' },
]

const TopPageIndex = () => {
  const [timeStr, setTimeStr] = useState('')
  const timing = useRef<number | null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  
  // Determine active tab based on current path
  const currentPath = location.pathname
  const activeTab = [...leftTabs, ...rightTabs].find(tab => currentPath.includes(tab.path))?.key || 'comprehensive'

  // 设置时间
  const setTimingFn = () => {
    timing.current = setInterval(() => {
      const dateYear = formatTime(new Date(), 'yyyy-MM-dd');
      const dateDay = formatTime(new Date(), 'HH: mm: ss');
      const dateWeek = stateInfo.weekday[new Date().getDay()];
      setTimeStr(`${dateYear} | ${dateDay} ${dateWeek}`)
    }, 1000);
  }

  useEffect(() => {
    // 初始化开启定时
    setTimingFn()
    return () => {
      if (timing.current) clearInterval(timing.current)
    }
  }, [])

  const handleTabClick = (path: string) => {
    navigate(path)
  }

  return (
    <>
      <TopBox>
        <div className='top_box'>
          <Decoration10 className='top_decoration10' />
          <div className='title-box'>
            <Decoration8
              className='top_decoration8'
              color={['#568aea', '#000000']}
            />
            <div className='title'>
              <span className='title-text'>{stateInfo.title}</span>
              <Decoration6
                className='title-bototm top_decoration6'
                reverse={true}
                color={['#50e3c2', '#67a1e5']}
              />
            </div>

            <Decoration8
              reverse={true}
              className='top_decoration8'
              color={['#568aea', '#000000']}
            />
          </div>
          <Decoration10 className='top_decoration10 top_decoration10_reverse' />
          <TimeBox>
            <h3>{timeStr}</h3>
          </TimeBox>
        </div>
      </TopBox>
      
      <LeftTabBox>
        {leftTabs.map(tab => (
          <TabItem 
            key={tab.key} 
            $active={activeTab === tab.key}
            onClick={() => handleTabClick(tab.path)}
          >
            {tab.label}
          </TabItem>
        ))}
      </LeftTabBox>

      <RightTabBox>
        {rightTabs.map(tab => (
          <TabItem 
            key={tab.key} 
            $active={activeTab === tab.key}
            onClick={() => handleTabClick(tab.path)}
          >
            {tab.label}
          </TabItem>
        ))}
      </RightTabBox>
    </>
  );
}

export default TopPageIndex;
