import { useState, useEffect } from 'react';
import { VideoLeft } from './components/VideoLeft';
import { VideoCenter } from './components/VideoCenter';
import { VideoRight } from './components/VideoRight';
import { videoPageDataApi } from '@/api/mock/index'
import { get } from '@/api/http'
import { ResultEnum } from '@/enums/httpEnum'
import { VideoPageDataType } from '@/api/mock/videoPageData'

export const VideoPage = () => {
  const [data, setData] = useState<VideoPageDataType | undefined>(undefined);

  const fetchData = async () => {
    const res = await get(videoPageDataApi)
    if (res.code === ResultEnum.SUCCESS) {
      setData(res.data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <VideoLeft captureRecords={data?.captureRecords} storageStats={data?.storageStats} />
      <VideoCenter />
      <VideoRight qualityDiagnosis={data?.qualityDiagnosis} />
    </>
  );
};
