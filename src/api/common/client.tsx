import { Env } from '@env';
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

import { devLog } from '@/lib/utils';

export const client = axios.create({
  baseURL: Env.API_URL,
});

// Request interceptor: Convert request payload keys to snake_case
client.interceptors.request.use((config) => {
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
  if (response.data) {
    response.data = camelcaseKeys(response.data, { deep: true });
    devLog(
      'Response Interceptor',
      camelcaseKeys(response.data, { deep: true })
    );
  }

  return response;
});
