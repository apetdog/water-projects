import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 220px;
  position: relative;
  background: #000;
  border: 1px solid #1e3a8a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  overflow: hidden;

  &:hover {
    border-color: #50e3c2;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoPlaceholder = styled.div`
  width: 80%;
  height: 80%;
  background: #111;
  border: 2px solid #50e3c2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #fff;
  flex-direction: column;
`;

export const KeyMonitoring = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Container onClick={() => setExpanded(true)}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: '20px', marginBottom: '10px'}}>📷 重点监控 (海康)</div>
          <div style={{color: '#0f0'}}>● LIVE</div>
          <div style={{fontSize: '12px', marginTop: '10px', color: '#aaa'}}>点击放大</div>
        </div>
      </Container>
      {expanded && (
        <Modal onClick={() => setExpanded(false)}>
          <VideoPlaceholder>
            <div>重点监控画面 (海康SDK接入)</div>
            <div style={{fontSize: '16px', marginTop: '20px', color: '#aaa'}}>点击任意处关闭</div>
            <div style={{marginTop: '20px'}}>
               <button style={{marginRight: '10px', padding: '5px 10px'}}>云台左</button>
               <button style={{marginRight: '10px', padding: '5px 10px'}}>云台右</button>
               <button style={{marginRight: '10px', padding: '5px 10px'}}>云台上</button>
               <button style={{padding: '5px 10px'}}>云台下</button>
            </div>
          </VideoPlaceholder>
        </Modal>
      )}
    </>
  );
};
