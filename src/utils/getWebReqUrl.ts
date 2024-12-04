const getWebReqUrl = (url: string = '') => {
  if (!url) return '/';
  const baseUrl = '';
  if (!baseUrl) return url;

  if (!url.startsWith('/') || url.startsWith(baseUrl)) return url;
  return `${baseUrl}${url}`;
};

export default getWebReqUrl;
