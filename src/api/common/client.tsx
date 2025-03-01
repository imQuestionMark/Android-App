import { Env } from '@env';
import axios, { AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

import { devLog } from '@/lib/utils';

export const client = axios.create({
  baseURL: Env.API_URL,
});

// Request interceptor: Convert request payload keys to snake_case
client.interceptors.request.use((config) => {
  devLog(`📩📩📩 [API REQUEST] ${config.method?.toUpperCase()} ${config.url}`);
  if (config.data) {
    config.data = snakecaseKeys(config.data, { deep: true });

    devLog(
      'Request Data Interceptor',
      snakecaseKeys(config.data, { deep: true })
    );
  }

  if (config.params) {
    config.params = snakecaseKeys(config.params, { deep: true });

    devLog(
      'Request Params Interceptor',
      snakecaseKeys(config.params, { deep: true })
    );
  }

  return config;
});

// Response interceptor: Convert response payload keys to camelCase
client.interceptors.response.use((response) => {
  response.data = camelcaseKeys(response.data, { deep: true });
  devLog('Response Interceptor', camelcaseKeys(response.data, { deep: true }));

  if (response.data) {
    const { status } = response.data;

    if (status && status >= 400) {
      devLog('Response rejected', status);

      // Create an AxiosError with the proper structure
      const error = new AxiosError(
        response.data.message || 'Unknown Axios Error',
        axios.AxiosError.ERR_BAD_RESPONSE,
        response.config,
        response.request,
        response
      );

      // Override the HTTP status with the one from the response body
      if (error.response) error.response.status = status;

      return Promise.reject(error);
    }
  }

  return response;
});
