import { BorderBox12, BorderBox13, ScrollBoard } from '@jiaminghi/data-view-react';
import { ModuleTitle } from '@/style/globalStyledSet';

type Props = {
  qualityDiagnosis?: any
}

export const VideoRight = ({ qualityDiagnosis }: Props) => {
  return (
    <div style={{ width: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
       <BorderBox13 style={{height: '48%', padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe790;</i>
              <span>视频质量诊断</span>
          </ModuleTitle>
          <div style={{height: '300px', marginTop: '20px'}}>
             {qualityDiagnosis && <ScrollBoard config={qualityDiagnosis} />}
          </div>
       </BorderBox13>
       <BorderBox12 style={{height: '48%', padding: '20px'}}>
          <ModuleTitle>
              <i className='iconfont'>&#xe7fd;</i>
              <span>云台控制</span>
          </ModuleTitle>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px', gap: '10px'}}>
             <button style={{padding: '10px 20px', background: 'rgba(80, 227, 194, 0.2)', border: '1px solid #50e3c2', color: '#fff', cursor: 'pointer'}}>▲</button>
             <div style={{display: 'flex', gap: '10px'}}>
                <button style={{padding: '10px 20px', background: 'rgba(80, 227, 194, 0.2)', border: '1px solid #50e3c2', color: '#fff', cursor: 'pointer'}}>◀</button>
                <button style={{padding: '10px 20px', background: 'rgba(80, 227, 194, 0.2)', border: '1px solid #50e3c2', color: '#fff', cursor: 'pointer'}}>●</button>
                <button style={{padding: '10px 20px', background: 'rgba(80, 227, 194, 0.2)', border: '1px solid #50e3c2', color: '#fff', cursor: 'pointer'}}>▶</button>
             </div>
             <button style={{padding: '10px 20px', background: 'rgba(80, 227, 194, 0.2)', border: '1px solid #50e3c2', color: '#fff', cursor: 'pointer'}}>▼</button>
             
             <div style={{marginTop: '20px', display: 'flex', gap: '20px', color: '#fff'}}>
                <button style={{padding: '5px 15px', background: 'transparent', border: '1px solid #fff', color: '#fff', cursor: 'pointer'}}>-</button>
                <span>变倍</span>
                <button style={{padding: '5px 15px', background: 'transparent', border: '1px solid #fff', color: '#fff', cursor: 'pointer'}}>+</button>
             </div>
          </div>
       </BorderBox12>
    </div>
  );
};
