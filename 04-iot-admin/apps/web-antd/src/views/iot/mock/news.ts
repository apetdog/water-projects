interface NewsItem {
  key: string;
  title: string;
  author: string;
  publishTime: string;
  isValid: boolean;
  content: string;
}

const baseNewsList: NewsItem[] = [
  {
    key: '1',
    title: '关于2026年物联网平台升级通知',
    author: '系统管理员',
    publishTime: '2026-01-09 10:00:00',
    isValid: true,
    content: '为了提供更好的服务，我们将于...',
  },
  {
    key: '2',
    title: '行业新闻：5G与工业互联网融合发展',
    author: '新闻部',
    publishTime: '2026-01-08 14:30:00',
    isValid: true,
    content: '随着5G技术的普及...',
  },
];

const generatedNewsList: NewsItem[] = Array.from({ length: 16 }).map((_, index) => {
  const id = index + 3;
  return {
    key: `${id}`,
    title: `模拟新闻标题 ${id} - 关于物联网发展的深度报道`,
    author: index % 2 === 0 ? '系统管理员' : '新闻部',
    publishTime: `2026-01-0${(index % 9) + 1} 09:00:00`,
    isValid: index % 5 !== 0,
    content: `这是第 ${id} 条模拟新闻的内容...`,
  };
});

export const newsList: NewsItem[] = [...baseNewsList, ...generatedNewsList];
