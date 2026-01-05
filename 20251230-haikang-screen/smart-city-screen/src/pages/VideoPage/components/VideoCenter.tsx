import { BorderBox12, BorderBox10 } from '@jiaminghi/data-view-react';
import { ResourceOverview } from '../charts/ResourceOverview';
import { EventTrend } from '../charts/EventTrend';

export const VideoCenter = () => {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', padding: '0 20px', gap: '20px' }}>
       {/* Resource Overview */}
       <BorderBox12 style={{height: '60%', padding: '20px'}}>
           <div style={{height: '100%'}}>
               <ResourceOverview />
           </div>
       </BorderBox12>
       
       {/* Event Trend */}
       <BorderBox10 style={{height: 'calc(40% - 20px)', padding: '20px'}}>
           <div style={{height: '100%'}}>
               <EventTrend />
           </div>
       </BorderBox10>
    </div>
  );
};

