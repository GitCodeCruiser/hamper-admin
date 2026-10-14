import axios, { AxiosError, AxiosResponse } from 'axios';

import { baseUrlApi, endpoints, successNotificationEndPoints } from '../endpoints';

import events from '@/lib/event';
import {
  globalCatchError,
  globalCatchSuccess,
  globalCatchWarning,
} from '@/lib/functions/_helpers.lib';
import eventEmitter from '@/lib/services/event.emitter';
import { BaseApiResponse } from '@/types/interface/common.interface';

let abortController = new AbortController();
let isHandlingServerError = false;
let isHandlingUnauthorized = false;

const axiosInstance = axios.create({
  baseURL: baseUrlApi,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  if (isHandlingUnauthorized || isHandlingServerError) {
    const controller = new AbortController();
    config.signal = controller.signal;
    controller.abort();
    return config;
  }

  config.signal = abortController.signal;

  return config;
});

// axiosInstance.interceptors.response.use(
//   (res: AxiosResponse) => {
//     if (successNotificationEndPoints.includes(res.config.url as string)) {
//       if (res?.data?.statusCode !== 200) {
//         globalCatchWarning(res);
//       } else {
//         globalCatchSuccess(res);
//       }
//     }

//     return res;
//   },
axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    const url = res.config.url?.split('?')[0];

    if (successNotificationEndPoints.some((ep) => url?.includes(ep))) {
      if (res.status >= 200 && res.status < 300) {
        globalCatchSuccess(res);
      } else {
        globalCatchWarning(res);
      }
    }

    return res;
  },
  async (error: AxiosError<BaseApiResponse>) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const status = error?.response?.status;

    const configUrl = error.config?.url;
    const isAuthEndpoint =
      configUrl &&
      (configUrl.includes(endpoints.auth.admin.login) ||
        configUrl.includes(endpoints.auth.admin.forgotPassword) ||
        configUrl.includes(endpoints.auth.admin.resetPassword));

    if (status === 401 && !isAuthEndpoint) {
      if (!isHandlingUnauthorized) {
        isHandlingUnauthorized = true;

        abortController.abort();
        abortController = new AbortController();

        eventEmitter.emit(events.logoutCurrentUser, false, 'unauthorized');

        setTimeout(() => {
          isHandlingUnauthorized = false;
        }, 3000);
      }

      return Promise.reject(error);
    }

    if (isHandlingServerError) {
      return Promise.reject(error);
    }

    const isNetworkError = !error.response || error.code === 'ERR_NETWORK';

    if ((status && status >= 505) || isNetworkError) {
      if (!isHandlingServerError) {
        isHandlingServerError = true;

        abortController.abort();
        abortController = new AbortController();

        globalCatchError(error);
        eventEmitter.emit(events.logoutCurrentUser, false, 'server_error');

        setTimeout(() => {
          isHandlingServerError = false;
        }, 3000);
      }
    } else {
      globalCatchError(error);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
