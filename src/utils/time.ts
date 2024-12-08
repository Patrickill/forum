import dayjs from 'dayjs';

export const formatTime2YMDHMW = (time?: Date) => dayjs(time).format('YYYY-MM-DD HH:mm:ss dddd');
export const formatTime2YMDHMS = (time?: Date) =>
  time ? dayjs(time).format('YYYY-MM-DD HH:mm:ss') : '';
export const formatTime2YMDHM = (time?: Date) =>
  time ? dayjs(time).format('YYYY-MM-DD HH:mm') : '';
export const formatTime2YMD = (time?: Date) => (time ? dayjs(time).format('YYYY-MM-DD') : '');
export const formatTime2HM = (time: Date = new Date()) => dayjs(time).format('HH:mm');

/**
 * 格式化时间成聊天格式
 */
export const formatTimeToChatTime = (time: Date) => {
  const now = dayjs();
  const target = dayjs(time);

  // 如果传入时间小于60秒，返回刚刚
  if (now.diff(target, 'second') < 60) {
    return '刚刚';
  }

  // 如果时间是今天，展示几时:几分
  //用#占位，i18n生效后replace成:
  if (now.isSame(target, 'day')) {
    return target.format('HH : mm');
  }

  // 如果是昨天，展示昨天
  if (now.subtract(1, 'day').isSame(target, 'day')) {
    return '昨天';
  }

  // 如果是今年，展示某月某日
  if (now.isSame(target, 'year')) {
    return target.format('MM-DD');
  }

  // 如果是更久之前，展示某年某月某日
  return target.format('YYYY-M-D');
};

export const formatTimeToChatItemTime = (time: Date) => {
  const now = dayjs();
  const target = dayjs(time);
  const detailTime = target.format('HH : mm');

  // 如果时间是今天，展示几时:几分
  if (now.isSame(target, 'day')) {
    return detailTime;
  }

  // 如果是昨天，展示昨天+几时:几分
  if (now.subtract(1, 'day').isSame(target, 'day')) {
    return '昨天 ' + detailTime;
  }

  // 如果是今年，展示某月某日+几时:几分
  if (now.isSame(target, 'year')) {
    return target.format('MM-DD') + ' ' + detailTime;
  }

  // 如果是更久之前，展示某年某月某日+几时:几分
  return target.format('YYYY-M-D') + ' ' + detailTime;
};
