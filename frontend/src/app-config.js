let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendHost = process.env.REACT_APP_API_DOMAIN;
}

export const API_BASE_URL = `${backendHost}`;
