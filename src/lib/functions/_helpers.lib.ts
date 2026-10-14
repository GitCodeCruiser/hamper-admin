import { AxiosError, AxiosResponse } from 'axios';

import events from '../event';
import eventEmitter from '../services/event.emitter';

import { ToastVariant } from '@/types/enums/common.emums';
import { BaseApiResponse } from '@/types/interface/common.interface';

/**
 * Check if the window object exists.
 * @returns A function that checks if the window is undefined.
 */
export function checkWindow() {
  return typeof window !== 'undefined';
}

export function isInServer() {
  return typeof document === 'undefined';
}

export function isApple() {
  if (typeof navigator === 'undefined') {
    return false;
  }
  const platformExpression = /Mac|iPhone|iPod|iPad/i;
  const agent = navigator.userAgent;

  return platformExpression.test(agent);
}

export function isAppleSafari() {
  if (typeof navigator === 'undefined') {
    return false;
  }
  const rejectedExpression = /Chrome|Android|CriOS|FxiOS|EdgiOS/i;
  const expectedExpression = /Safari/i;

  const agent = navigator.userAgent;
  if (rejectedExpression.test(agent)) {
    return false;
  }

  return isApple() && expectedExpression.test(agent);
}

/**
 *
 * Global API Success message handler
 * @param response AxiosResponse<BaseApiResponse>
 */
export const globalCatchSuccess = (response: AxiosResponse<BaseApiResponse>) => {
  let message = 'Something went wrong';
  if (response?.data?.message) {
    message = response?.data.message;
  }
  eventEmitter.emit(events.showNotification, {
    message,
    variant: ToastVariant.SUCCESS,
  });
};

/**
 *
 * Global API Warning message handler
 * @param response AxiosResponse<BaseApiResponse>
 */
export const globalCatchWarning = (response: AxiosResponse<BaseApiResponse>) => {
  let message = 'Something went wrong';
  if (response?.data?.message) {
    message = response?.data.message;
  }

  eventEmitter.emit(events.showNotification, {
    message,
    variant: ToastVariant.WARNING,
  });
};

/**
 *
 * Global API Error message handler
 * @param error AxiosError<BaseApiResponse>
 */
export const globalCatchError = (error: AxiosError<BaseApiResponse>) => {
  let message = 'Something went wrong';
  if (error.response?.data?.message) {
    message = error.response?.data.message;
  }

  eventEmitter.emit(events.showNotification, {
    message,
    variant: ToastVariant.ERROR,
  });
};
