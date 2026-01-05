export type EcologyPageDataType = {
  environmentFactors: {
    temperature: string
    humidity: string
    pm25: number
    noise: string
    windSpeed: string
    pressure: number
  }
  waterQuality: {
    ph: number
    status: string
  }
  carbonEmission: {
    dailyReduction: string
    treeEquivalent: number
  }
  energyAnalysis: {
    lighting: string
    ac: string
    evCharging: string
    waterPump: string
    security: string
  }
  photovoltaic: {
    dailyGeneration: number
    totalRevenue: string
    totalReduction: string
  }
}

const ecologyPageData: EcologyPageDataType = {
  environmentFactors: {
    temperature: '26°C',
    humidity: '60%',
    pm25: 35,
    noise: '45dB',
    windSpeed: '3m/s',
    pressure: 1012
  },
  waterQuality: {
    ph: 7.2,
    status: '正常'
  },
  carbonEmission: {
    dailyReduction: '120kg',
    treeEquivalent: 10
  },
  energyAnalysis: {
    lighting: '35%',
    ac: '25%',
    evCharging: '20%',
    waterPump: '10%',
    security: '10%'
  },
  photovoltaic: {
    dailyGeneration: 500,
    totalRevenue: '1.2 万元',
    totalReduction: '5.6 吨'
  }
}

export default ecologyPageData
