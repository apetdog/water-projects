import { BorderBox12, BorderBox13, ScrollBoard } from '@jiaminghi/data-view-react';
import { ModuleTitle } from '@/style/globalStyledSet';
import AiBehaviorAnalysis from '../../RightPage/charts/AiBehaviorAnalysis';
import { SecurityPageDataType } from '@/api/mock/securityPageData';
import styled from 'styled-components';
import { useMemo } from 'react';

const ScrollBoardWrapper = styled.div`
  width: 100%;
  height: 100%;
  .dv-scroll-board {
    .header {
      font-size: 16px;
      color: #00dcff;
      font-weight: bold;
    }
    .rows {
      .row-item {
        font-size: 15px;
        color: #fff;
      }
    }
  }
`;

type Props = {
  accessLogs?: SecurityPageDataType['accessLogs']
  aiAnalysis?: SecurityPageDataType['aiAnalysis']
}

export const SecurityLeft = ({ accessLogs, aiAnalysis }: Props) => {
  const config = useMemo(() => {
    if (!accessLogs) return null;
    return {
      ...accessLogs,
      headerBGC: 'rgba(0, 160, 233, 0.2)',
      oddRowBGC: 'rgba(0, 0, 0, 0)',
      evenRowBGC: 'rgba(80, 227, 194, 0.1)',
      carousel: 'single',
      waitTime: 2000,
      rowNum: 6,
      align: ['center', 'center', 'center', 'center']
    };
  }, [accessLogs]);

  return (
    <div style={{ width: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
       <BorderBox12 style={{height: '48%', padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe78f;</i>
              <span>门禁通行实况</span>
          </ModuleTitle>
          <div style={{height: 'calc(100% - 60px)', marginTop: '20px'}}>
             {config && (
               <ScrollBoardWrapper>
                 <ScrollBoard config={config} />
               </ScrollBoardWrapper>
             )}
          </div>
       </BorderBox12>
       <BorderBox13 style={{height: '48%', padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe88e;</i>
              <span>AI 行为分析</span>
          </ModuleTitle>
          <div style={{height: 'calc(100% - 40px)', marginTop: '10px'}}>
             <AiBehaviorAnalysis 
                noHelmet={aiAnalysis?.noHelmet} 
                illegalParking={aiAnalysis?.illegalParking} 
             />
          </div>
       </BorderBox13>
    </div>
  );
};
