import ApiService from './apiService';
import axios, { AxiosRequestConfig } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import JwtService from './jwtService';
import history from 'utils/history';

const getAuthorizationHeader = (jwt: boolean) => {
  return jwt
    ? {
        authorization: 'Bearer ' + JwtService.getAccessToken()
      }
    : null;
};

const HttpService = {
  async get<T = any>(url: string, config?: AxiosRequestConfig, jwt = false) {
    const headers = getHeaders(config, getAuthorizationHeader(jwt));
    const res = await axios.get<T>(url, { ...config, headers });
    return res.data;
  },

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig, jwt = false) {
    const headers = getHeaders(config, {
      'Content-Type': 'application/json;charset=utf-8',
      ...getAuthorizationHeader(jwt)
    });
    const res = await axios.post<T>(url, data, { ...config, headers });

    return res.data;
  },

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig, jwt = false) {
    const headers = getHeaders(config, {
      'Content-Type': 'application/json;charset=utf-8',
      ...getAuthorizationHeader(jwt)
    });

    const res = await axios.put<T>(url, data, { ...config, headers });
    return res.data;
  },

  async delete<T = any>(url: string, config?: AxiosRequestConfig, jwt = false) {
    const headers = getHeaders(config, getAuthorizationHeader(jwt));

    const res = await axios.delete<T>(url, { ...config, headers });
    return res.data;
  }
};

const getHeaders = (config: AxiosRequestConfig | undefined, headers: any) => {
  const configHeaders = config ? { ...config.headers } : null;

  return { ...configHeaders, ...headers };
};

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest: any) =>
  ApiService.refreshToken(JwtService.getRefreshToken()!)
    .then(data => {
      JwtService.storeTokens(data);
      failedRequest.response.config.headers['authorization'] = 'Bearer ' + data.accessToken;
      return Promise.resolve();
    })
    .catch(() => {
      JwtService.removeTokens();
      history.push('/');
    });

// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(axios as any, refreshAuthLogic);

export default HttpService;
