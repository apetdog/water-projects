interface NoticeItem {
  key: string;
  title: string;
  author: string;
  publishTime: string;
  isValid: boolean;
  content: string;
}

const baseNoticeList: NoticeItem[] = [
  {
    key: '1',
    title: '系统维护公告：本周六凌晨2点进行',
    author: '运维部',
    publishTime: '2026-01-09 09:00:00',
    isValid: true,
    content: '为了保证系统稳定性，我们将于...',
  },
  {
    key: '2',
    title: '关于加强账户安全的通知',
    author: '安全部',
    publishTime: '2026-01-07 10:00:00',
    isValid: true,
    content: '请各位用户注意定期修改密码...',
  },
];

const generatedNoticeList: NoticeItem[] = Array.from({ length: 16 }).map((_, index) => {
  const id = index + 3;
  return {
    key: `${id}`,
    title: `模拟公告标题 ${id} - 重要通知`,
    author: index % 2 === 0 ? '运维部' : '安全部',
    publishTime: `2026-01-0${(index % 9) + 1} 10:00:00`,
    isValid: true,
    content: `这是第 ${id} 条模拟公告的内容...`,
  };
});

export const noticeList: NoticeItem[] = [...baseNoticeList, ...generatedNoticeList];
