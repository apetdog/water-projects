import React, { useEffect, useRef, useState } from 'react';
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
    background: rgba(0, 0, 0, 0.85);
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    
    h3 {
      margin-bottom: 20px;
      color: #50e3c2;
    }
    
    .form-group {
      margin-bottom: 15px;
      width: 80%;
      
      label {
        display: block;
        margin-bottom: 5px;
        font-size: 12px;
        color: #aaa;
      }
      
      input {
        width: 100%;
        padding: 8px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid #333;
        color: #fff;
        border-radius: 4px;
        
        &:focus {
          border-color: #50e3c2;
          outline: none;
        }
      }
    }
    
    button {
      padding: 8px 24px;
      background: #50e3c2;
      border: none;
      color: #000;
      font-weight: bold;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
      
      &:hover {
        background: #3ac2a4;
      }
    }

    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background: transparent;
      color: #fff;
      font-size: 20px;
      padding: 0;
      width: auto;
    }
  }

  .status-bar {
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 12px;
    color: rgba(255,255,255,0.6);
    background: rgba(0,0,0,0.5);
    padding: 2px 6px;
    border-radius: 2px;
    pointer-events: none;
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
    } else {
      setIsConfigOpen(true);
    }

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
        cbPluginErrorHandler: (iWndIndex: number, iErrorCode: number, oError: any) => {
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
      success: (xmlDoc: any) => {
        setStatus('登录成功，获取通道...');
        getChannelsAndPlay(ip);
      },
      error: (status: any, xmlDoc: any) => {
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
    <Wrapper onDoubleClick={() => setIsConfigOpen(true)}>
      <div id={containerId.current} className="plugin-container"></div>
      
      {status !== 'LIVE' && <div className="status-bar">{status}</div>}

      {isConfigOpen && (
        <div className="config-overlay">
          <button className="close-btn" onClick={() => setIsConfigOpen(false)}>×</button>
          <h3>海康设备配置</h3>
          <div className="form-group">
            <label>IP地址</label>
            <input 
              value={formData.ip} 
              onChange={e => setFormData({...formData, ip: e.target.value})}
              placeholder="192.168.1.64"
            />
          </div>
          <div className="form-group">
            <label>端口</label>
            <input 
              value={formData.port} 
              onChange={e => setFormData({...formData, port: e.target.value})}
              placeholder="80"
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
            />
          </div>
          <button onClick={handleSaveConfig}>连接设备</button>
        </div>
      )}
    </Wrapper>
  );
};

export default HikVideoPlayer;
