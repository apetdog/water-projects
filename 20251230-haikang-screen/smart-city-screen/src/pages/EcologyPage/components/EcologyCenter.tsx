import styled, { keyframes } from 'styled-components';
import lightOnImg from '@/assets/light-on.png';
import lightOffImg from '@/assets/light-off.png';

const rain = keyframes`
  0% { transform: translateY(-100vh); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
`;

const RainDrop = styled.div`
  position: absolute;
  width: 2px;
  height: 40px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(80, 227, 194, 0.5));
  top: 0;
  animation: ${rain} 1s linear infinite;
  pointer-events: none;
`;

const SceneContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  background: radial-gradient(circle at center, #001529 0%, #000 100%);
  perspective: 1000px;
`;

const FloorGrid = styled.div`
  position: absolute;
  bottom: -100px;
  width: 300%;
  height: 1000px;
  background: 
    linear-gradient(rgba(80, 227, 194, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(80, 227, 194, 0.1) 1px, transparent 1px);
  background-size: 60px 60px;
  transform: rotateX(70deg);
  opacity: 0.2;
  pointer-events: none;
`;

const LampPostWrapper = styled.div<{ active?: boolean, top: string, left: string, scale: number }>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  transform: scale(${props => props.scale}) translate(-50%, -50%);
  cursor: pointer;
  opacity: ${props => props.active ? 1 : 0.7};
  transition: all 0.3s;
  z-index: ${props => Math.floor(props.scale * 100)};
  
  &:hover {
    transform: scale(${props => props.scale * 1.2}) translate(-50%, -50%);
    filter: drop-shadow(0 0 15px #50e3c2);
    z-index: 1000;
    
    .info-box {
        opacity: 1;
        transform: translateY(0);
    }
  }
`;

const LampPostImage = styled.img`
    height: 160px;
    width: auto;
    filter: drop-shadow(0 0 15px rgba(80, 227, 194, 0.4));
    transition: all 0.3s;
    object-fit: contain;
`;

const InfoBox = styled.div`
    background: rgba(0, 20, 40, 0.8);
    border: 1px solid #50e3c2;
    padding: 8px 12px;
    color: #fff;
    border-radius: 4px;
    margin-top: 10px;
    text-align: center;
    white-space: nowrap;
    opacity: 0.8;
    transform: translateY(5px);
    transition: all 0.3s;
    font-size: 12px;
    
    .status-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 5px;
    }
`;

type LampPost = {
  id: number;
  top: string;
  left: string;
  scale: number;
  status: string;
  name: string;
  wifiUsers: number;
  screenText: string;
};

type Props = {
  onSelectLampPost: (post: LampPost) => void
}

export const EcologyCenter = ({ onSelectLampPost }: Props) => {
  // Generate raindrops
  const drops = Array.from({ length: 40 }).map(() => ({
    left: Math.random() * 100 + '%',
    delay: Math.random() * 2 + 's',
    duration: 0.5 + Math.random() * 0.5 + 's'
  }));

  const lampPosts = [
    { id: 1, top: '50%', left: '50%', scale: 1.2, status: '在线', name: '灯杆 #001', wifiUsers: 45, screenText: '欢迎莅临' },
    { id: 2, top: '45%', left: '30%', scale: 0.9, status: '在线', name: '灯杆 #002', wifiUsers: 23, screenText: '车位充足' },
    { id: 3, top: '55%', left: '75%', scale: 1.0, status: '离线', name: '灯杆 #003', wifiUsers: 0, screenText: '设备维护' },
    { id: 4, top: '40%', left: '60%', scale: 0.7, status: '在线', name: '灯杆 #004', wifiUsers: 12, screenText: '天气晴朗' },
    { id: 5, top: '65%', left: '40%', scale: 1.4, status: '在线', name: '灯杆 #005', wifiUsers: 67, screenText: '注意安全' },
    { id: 6, top: '35%', left: '80%', scale: 0.6, status: '在线', name: '灯杆 #006', wifiUsers: 8, screenText: '公益广告' },
    { id: 7, top: '30%', left: '20%', scale: 0.5, status: '在线', name: '灯杆 #007', wifiUsers: 5, screenText: '园区导航' },
  ];

  return (
    <SceneContainer>
       <FloorGrid />
       
       {drops.map((drop, i) => (
         <RainDrop key={i} style={{ left: drop.left, animationDelay: drop.delay, animationDuration: drop.duration }} />
       ))}

       <div style={{position: 'absolute', top: '20px', textAlign: 'center', zIndex: 10}}>
           <div style={{color: '#fff', fontSize: '24px', fontWeight: 'bold', textShadow: '0 0 10px #50e3c2'}}>写实天气系统: 雨 (3D场景)</div>
           <div style={{color: '#aaa', fontSize: '14px', marginTop: '5px'}}>空气粒子漂浮 + 灯杆光晕效果</div>
       </div>
       
       {lampPosts.map(post => {
           const isActive = post.status === '在线';
           const color = isActive ? '#50e3c2' : '#ff4d4f';
           
           return (
               <LampPostWrapper 
                  key={post.id}
                  active={isActive}
                  top={post.top}
                  left={post.left}
                  scale={post.scale}
                  onClick={() => onSelectLampPost(post)}
               >
                  <LampPostImage src={isActive ? lightOnImg : lightOffImg} alt={post.name} />
                  <InfoBox className="info-box">
                      <span className="status-dot" style={{background: color}}></span>
                      {post.name} ({post.status})
                  </InfoBox>
               </LampPostWrapper>
           );
       })}
    </SceneContainer>
  );
};
