import React, { useState, useEffect } from 'react';
import { EcologyLeft } from './components/EcologyLeft';
import { EcologyCenter } from './components/EcologyCenter';
import { EcologyRight } from './components/EcologyRight';
import { ecologyPageDataApi } from '@/api/mock/index'
import { get } from '@/api/http'
import { ResultEnum } from '@/enums/httpEnum'
import { EcologyPageDataType } from '@/api/mock/ecologyPageData'

export const EcologyPage = () => {
  const [data, setData] = useState<EcologyPageDataType | undefined>(undefined);
  const [selectedLampPost, setSelectedLampPost] = useState(null);

  const fetchData = async () => {
    const res = await get(ecologyPageDataApi)
    if (res.code === ResultEnum.SUCCESS) {
      setData(res.data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <EcologyLeft 
         environmentFactors={data?.environmentFactors}
         waterQuality={data?.waterQuality}
         carbonEmission={data?.carbonEmission}
      />
      <EcologyCenter onSelectLampPost={setSelectedLampPost} />
      <EcologyRight 
         selectedLampPost={selectedLampPost} 
         energyAnalysis={data?.energyAnalysis}
         photovoltaic={data?.photovoltaic}
      />
    </>
  );
};
