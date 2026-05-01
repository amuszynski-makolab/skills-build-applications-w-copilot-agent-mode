export const buildApiBaseUrl = () => {
  const host = window.location.hostname;

  if (host.includes('github.dev')) {
    return '/api';
  }

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  if (host.includes('-3000.')) {
    return `https://${host.replace('-3000.', '-8000.')}/api`;
  }

  return 'http://localhost:8000/api';
};

export const getResourceEndpoint = (resourcePath) => `${buildApiBaseUrl()}/${resourcePath}/`;

export const normalizeApiData = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.results)) {
    return data.results;
  }

  return [];
};
