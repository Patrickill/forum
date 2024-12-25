const getWebReqUrl = (url: string = '') => {
  if (!url) return '/';
  const baseUrl = 'http://127.0.0.1:4523/m1/5396351-0-default';
  if (!baseUrl) return url;

  if (!url.startsWith('/') || url.startsWith(baseUrl)) return url;
  return `${baseUrl}${url}`;
};

export default getWebReqUrl;
