import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

declare global {
  interface Window {
    WebVideoCtrl: any;
    $: any;
  }
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: #000;
  overflow: hidden;

  /* Tech border corners */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    border-top: 2px solid #50e3c2;
    border-left: 2px solid #50e3c2;
    z-index: 50;
    pointer-events: none;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    border-bottom: 2px solid #50e3c2;
    border-right: 2px solid #50e3c2;
    z-index: 50;
    pointer-events: none;
  }
  
  .plugin-container {
    width: 100%;
    height: 100%;
  }

  .config-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(10, 15, 20, 0.95);
    backdrop-filter: blur(5px);
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    
    /* Subtle grid background */
    background-image: 
      linear-gradient(rgba(80, 227, 194, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(80, 227, 194, 0.05) 1px, transparent 1px);
    background-size: 20px 20px;

    .config-box {
      width: 85%;
      max-width: 400px;
      padding: 30px;
      background: rgba(20, 30, 40, 0.6);
      border: 1px solid rgba(80, 227, 194, 0.3);
      box-shadow: 0 0 20px rgba(80, 227, 194, 0.1);
      position: relative;
      
      /* Tech corners for the box */
      &::before {
        content: '';
        position: absolute;
        top: -1px;
        left: -1px;
        width: 15px;
        height: 15px;
        border-top: 2px solid #50e3c2;
        border-left: 2px solid #50e3c2;
      }
      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        right: -1px;
        width: 15px;
        height: 15px;
        border-bottom: 2px solid #50e3c2;
        border-right: 2px solid #50e3c2;
      }
    }
    
    h3 {
      margin-bottom: 25px;
      color: #50e3c2;
      font-size: 18px;
      text-transform: uppercase;
      letter-spacing: 2px;
      text-align: center;
      text-shadow: 0 0 10px rgba(80, 227, 194, 0.5);
    }
    
    .form-group {
      margin-bottom: 20px;
      width: 100%;
      
      label {
        display: block;
        margin-bottom: 8px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.7);
        letter-spacing: 1px;
      }
      
      input {
        width: 100%;
        padding: 10px 12px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(80, 227, 194, 0.2);
        color: #fff;
        font-family: monospace;
        font-size: 14px;
        transition: all 0.3s ease;
        
        &:focus {
          border-color: #50e3c2;
          box-shadow: 0 0 10px rgba(80, 227, 194, 0.2);
          outline: none;
          background: rgba(0, 0, 0, 0.5);
        }

        &::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }
      }
    }
    
    button.connect-btn {
      width: 100%;
      padding: 12px;
      background: linear-gradient(90deg, rgba(80, 227, 194, 0.1), rgba(80, 227, 194, 0.3));
      border: 1px solid #50e3c2;
      color: #50e3c2;
      font-weight: bold;
      letter-spacing: 2px;
      cursor: pointer;
      margin-top: 10px;
      transition: all 0.3s ease;
      text-transform: uppercase;
      position: relative;
      overflow: hidden;
      
      &:hover {
        background: #50e3c2;
        color: #000;
        box-shadow: 0 0 15px rgba(80, 227, 194, 0.4);
      }

      &:active {
        transform: scale(0.98);
      }
    }

    .close-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      background: transparent;
      border: none;
      color: rgba(255, 255, 255, 0.5);
      font-size: 24px;
      line-height: 1;
      padding: 0;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #50e3c2;
      }
    }
  }

  .status-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    font-size: 12px;
    color: #50e3c2;
    background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
    pointer-events: none;
    z-index: 10;
    
    .status-text {
      display: flex;
      align-items: center;
      gap: 6px;
      
      &::before {
        content: '';
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: ${props => props['data-status'] === 'LIVE' ? '#50e3c2' : '#ff4d4f'};
        box-shadow: 0 0 5px ${props => props['data-status'] === 'LIVE' ? '#50e3c2' : '#ff4d4f'};
      }
    }

    .hint {
      color: rgba(255, 255, 255, 0.4);
      font-size: 10px;
    }
  }

  .empty-state {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: rgba(80, 227, 194, 0.5);
      z-index: 20;

      .icon {
        font-size: 48px;
        margin-bottom: 15px;
        opacity: 0.8;
        animation: pulse 2s infinite;
      }
      
      .text {
        font-size: 14px;
        letter-spacing: 3px;
        text-transform: uppercase;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .login-btn {
        padding: 8px 24px;
        background: rgba(80, 227, 194, 0.1);
        border: 1px solid #50e3c2;
        color: #50e3c2;
        font-size: 12px;
        font-weight: bold;
        letter-spacing: 2px;
        cursor: pointer;
        transition: all 0.3s;
        text-transform: uppercase;
        
        &:hover {
          background: #50e3c2;
          color: #000;
          box-shadow: 0 0 15px rgba(80, 227, 194, 0.4);
          transform: translateY(-2px);
        }
        
        &:active {
          transform: translateY(0);
        }
      }

      @keyframes pulse {
        0% { opacity: 0.4; transform: scale(0.95); }
        50% { opacity: 0.8; transform: scale(1.05); }
        100% { opacity: 0.4; transform: scale(0.95); }
      }
    }
  }
`;

const HikVideoPlayer = () => {
  const containerId = useRef(`hik-player-${Math.random().toString(36).substr(2, 9)}`);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [status, setStatus] = useState('初始化中...');
  const [formData, setFormData] = useState({
    ip: '',
    port: '80',
    username: 'admin',
    password: ''
  });

  useEffect(() => {
    // 检查缓存
    const cached = localStorage.getItem('hik_credentials');
    if (cached) {
      setFormData(JSON.parse(cached));
    }
    // 移除默认打开配置弹窗逻辑

    // 初始化插件
    const initPlugin = () => {
      if (!window.WebVideoCtrl) {
        setStatus('SDK未加载');
        return;
      }

      if (!window.WebVideoCtrl.I_SupportNoPlugin()) {
        setStatus('浏览器不支持');
        return;
      }

      window.WebVideoCtrl.I_InitPlugin('100%', '100%', {
        bWndFull: true,
        iWndowType: 1,
        cbInitPluginComplete: () => {
          window.WebVideoCtrl.I_InsertOBJECTPlugin(containerId.current);
          if (cached) {
            autoLogin(JSON.parse(cached));
          } else {
            setStatus('请配置设备信息');
          }
        },
        cbPluginErrorHandler: (_: number, iErrorCode: number, oError: any) => {
          console.error(`Plugin Error: ${iErrorCode}`, oError);
          setStatus(`插件错误: ${iErrorCode}`);
        }
      });
    };

    // 延时等待脚本加载
    setTimeout(initPlugin, 500);

    return () => {
      // 销毁
      try {
        window.WebVideoCtrl.I_Stop({
          success: () => window.WebVideoCtrl.I_Logout(formData.ip)
        });
      } catch (e) {
        console.error(e);
      }
    };
  }, []);

  const autoLogin = (creds: typeof formData) => {
    setStatus('正在登录...');
    const { ip, port, username, password } = creds;

    window.WebVideoCtrl.I_Login(ip, 1, port, username, password, {
      success: () => {
        setStatus('登录成功，获取通道...');
        getChannelsAndPlay(ip);
      },
      error: (status: any) => {
        console.error('Login failed', status);
        setStatus('登录失败，请检查配置');
        setIsConfigOpen(true);
      }
    });
  };

  const getChannelsAndPlay = (ip: string) => {
    window.WebVideoCtrl.I_GetDigitalChannelInfo(ip, {
      async: false,
      success: (xmlDoc: any) => {
        const channels = window.$(xmlDoc).find("InputProxyChannelStatus");
        let firstChannelId = null;
        
        // 查找第一个在线通道
        window.$.each(channels, function(this: any) {
           if (window.$(this).find("online").text() === "true") {
             firstChannelId = window.$(this).find("id").text();
             return false; 
           }
        });

        if (firstChannelId) {
          startPreview(ip, firstChannelId);
        } else {
          setStatus('无在线通道');
        }
      },
      error: () => {
        setStatus('获取通道失败');
      }
    });
  };

  const startPreview = (ip: string, channelId: any) => {
    window.WebVideoCtrl.I_StartRealPlay(ip, {
      iStreamType: 2, // 2: 子码流 (流畅)
      iChannelID: channelId,
      bZeroChannel: false,
      success: () => setStatus('LIVE'),
      error: () => setStatus('预览失败')
    });
  };

  const handleSaveConfig = () => {
    localStorage.setItem('hik_credentials', JSON.stringify(formData));
    setIsConfigOpen(false);
    autoLogin(formData);
  };

  return (
    <Wrapper onDoubleClick={() => setIsConfigOpen(true)} data-status={status}>
      <div id={containerId.current} className="plugin-container"></div>
      
      {!isConfigOpen && status !== 'LIVE' && (
        <div className="empty-state">
          <div className="icon">❖</div>
          <div className="text">SYSTEM OFFLINE</div>
          <button className="login-btn" onClick={(e) => { e.stopPropagation(); setIsConfigOpen(true); }}>
            CONNECT
          </button>
        </div>
      )}
      
      {/* Always show status bar for feedback */}
      <div className="status-bar">
        <span className="status-text">{status === 'LIVE' ? '实时监控' : status}</span>
        {status === 'LIVE' && <span className="hint">双击配置</span>}
      </div>

      {isConfigOpen && (
        <div className="config-overlay">
          <div className="config-box">
            <button className="close-btn" onClick={() => setIsConfigOpen(false)}>×</button>
            <h3>设备接入配置</h3>
            <div className="form-group">
              <label>设备IP</label>
              <input 
                value={formData.ip} 
                onChange={e => setFormData({...formData, ip: e.target.value})}
                placeholder="例如: 192.168.1.64"
              />
            </div>
            <div className="form-group">
              <label>端口</label>
              <input 
                value={formData.port} 
                onChange={e => setFormData({...formData, port: e.target.value})}
                placeholder="例如: 80"
              />
            </div>
            <div className="form-group">
              <label>用户名</label>
              <input 
                value={formData.username} 
                onChange={e => setFormData({...formData, username: e.target.value})}
                placeholder="admin"
              />
            </div>
            <div className="form-group">
              <label>密码</label>
              <input 
                type="password"
                value={formData.password} 
                onChange={e => setFormData({...formData, password: e.target.value})}
                placeholder="••••••"
              />
            </div>
            <button className="connect-btn" onClick={handleSaveConfig}>
              建立连接
            </button>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default HikVideoPlayer;
