import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '@/utils/index';
import {
  Decoration10,
  Decoration8,
  Decoration6,
} from '@jiaminghi/data-view-react';

import { TopBox, TimeBox, TabBox } from './style';
import useConfigStore from '@/store/index';
import { projectData } from '@/api/mock/projectData'

interface TopData {
  title: string;
  weekday: string[];
  tabs: { key: string; label: string }[];
  config: {
    decoration8Color: string[];
    decoration6Color: string[];
  };
}

const TopPageIndex = () => {
  const navigate = useNavigate();
  const [timeStr, setTimeStr] = useState('')
  const activeTab = useConfigStore(state => state.activeTab)
  const setActiveTab = useConfigStore(state => state.setActiveTab)
  const [topData, setTopData] = useState<TopData | undefined>(undefined)

  const fetchData = async () => {
    setTopData(projectData.top)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    // 初始化开启定时
    if (!topData) return;

    const interval = setInterval(() => {
      const dateYear = formatTime(new Date(), 'yyyy-MM-dd');
      const dateDay = formatTime(new Date(), 'HH: mm: ss');
      const dateWeek = topData.weekday[new Date().getDay()];
      setTimeStr(`${dateYear} | ${dateDay} ${dateWeek}`)
    }, 1000);

    return () => clearInterval(interval)
  }, [topData])

  if (!topData) return <div>loading...</div>

  return (
    <>
      <TopBox>
        <div className='top_box'>
          <TabBox>
            {topData.tabs.map((tab) => (
              <div
                key={tab.key}
                className={`tab-item ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(tab.key as 'overview' | 'structure' | 'generator');
                  const tabMap: Record<string, string> = {
                    overview: '/page1',
                    structure: '/page2',
                    generator: '/page3'
                  };
                  const path = tabMap[tab.key];
                  if (path) {
                    navigate(path);
                  }
                }}
              >
                {tab.label}
              </div>
            ))}
          </TabBox>
          <Decoration10 className='top_decoration10' />
          <div className='title-box'>
            <Decoration8
              className='top_decoration8'
              color={topData.config.decoration8Color}
            />
            <div className='title'>
              <span className='title-text'>{topData.title}</span>
              <Decoration6
                className='title-bototm top_decoration6'
                reverse={true}
                color={topData.config.decoration6Color}
              />
            </div>

            <Decoration8
              reverse={true}
              className='top_decoration8'
              color={topData.config.decoration8Color}
            />
          </div>
          <Decoration10 className='top_decoration10 top_decoration10_reverse' />
          <TimeBox>
            <h3>{timeStr}</h3>
          </TimeBox>
        </div>
      </TopBox>
    </>
  );
}

export default TopPageIndex;
