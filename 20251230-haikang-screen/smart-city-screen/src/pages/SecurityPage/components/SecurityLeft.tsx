import { BorderBox12, BorderBox13, ScrollBoard } from '@jiaminghi/data-view-react';
import { ModuleTitle } from '@/style/globalStyledSet';

type Props = {
  accessLogs?: any
  aiAnalysis?: any
}

export const SecurityLeft = ({ accessLogs, aiAnalysis }: Props) => {
  return (
    <div style={{ width: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
       <BorderBox12 style={{height: '48%', padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe78f;</i>
              <span>门禁通行实况</span>
          </ModuleTitle>
          <div style={{height: '300px', marginTop: '20px'}}>
             {accessLogs && <ScrollBoard config={accessLogs} />}
          </div>
       </BorderBox12>
       <BorderBox13 style={{height: '48%', padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe88e;</i>
              <span>AI 行为分析</span>
          </ModuleTitle>
          <div style={{color: '#fff', display: 'flex', justifyContent: 'space-around', marginTop: '50px', alignItems: 'center'}}>
             <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '40px', color: 'red', fontWeight: 'bold'}}>{aiAnalysis?.noHelmet || '15%'}</div>
                <div style={{marginTop: '10px', fontSize: '18px'}}>未戴帽</div>
             </div>
             <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '40px', color: 'orange', fontWeight: 'bold'}}>{aiAnalysis?.illegalParking || '30%'}</div>
                <div style={{marginTop: '10px', fontSize: '18px'}}>违停</div>
             </div>
          </div>
       </BorderBox13>
    </div>
  );
};
