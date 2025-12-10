import { useEffect } from 'react';
import useConfigStore from '@/store/index';
import { LayoutPage } from '../IndexPage/layout';

export const Page1 = () => {
  const setActiveTab = useConfigStore(state => state.setActiveTab);

  useEffect(() => {
    setActiveTab('overview');
  }, [setActiveTab]);

  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: ' translate(-50%, -50%)'
    }}>
      <LayoutPage />
    </div>
  );
};
