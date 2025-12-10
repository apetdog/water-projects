interface HistoryItem {
  key: string;
  address: string;
  time: string;
  waterLevel: string;
  rainGauge: string;
}

const baseHistoryData: HistoryItem[] = [
  {
    key: '1',
    address: '002512010117',
    time: '2025-12-09 11:00:00',
    waterLevel: '3344',
    rainGauge: '0',
  },
  {
    key: '2',
    address: '002512010117',
    time: '2025-12-09 10:45:29',
    waterLevel: '3344',
    rainGauge: '0',
  },
];

const generatedHistoryData: HistoryItem[] = Array.from({ length: 16 }).map((_, index) => {
  const id = index + 3;
  return {
    key: `${id}`,
    address: '002512010117',
    time: `2025-12-09 ${10 - Math.floor(index / 6)}:${59 - (index % 60)}:00`,
    waterLevel: `${3300 + index}`,
    rainGauge: `${Math.floor(Math.random() * 10)}`,
  };
});

export const historyData: HistoryItem[] = [...baseHistoryData, ...generatedHistoryData];
