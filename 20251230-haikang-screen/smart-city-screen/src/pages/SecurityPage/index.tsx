import { useState, useEffect } from 'react';
import { SecurityLeft } from './components/SecurityLeft';
import { SecurityCenter } from './components/SecurityCenter';
import { SecurityRight } from './components/SecurityRight';
import { securityPageDataApi } from '@/api/mock/index'
import { get } from '@/api/http'
import { ResultEnum } from '@/enums/httpEnum'
import { SecurityPageDataType } from '@/api/mock/securityPageData'

export const SecurityPage = () => {
  const [data, setData] = useState<SecurityPageDataType | undefined>(undefined);

  const fetchData = async () => {
    const res = await get(securityPageDataApi)
    if (res.code === ResultEnum.SUCCESS) {
      setData(res.data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'space-between' }}>
      <SecurityLeft accessLogs={data?.accessLogs} aiAnalysis={data?.aiAnalysis} />
      <SecurityCenter />
      <SecurityRight alarmLogs={data?.alarmLogs} deviceStats={data?.deviceStats} />
    </div>
  );
};
