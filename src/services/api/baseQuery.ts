import type {BaseQueryFn} from '@reduxjs/toolkit/query/react';
import type {AxiosError, AxiosRequestConfig, Method} from 'axios';
import {logoutUser} from '@redux/reducer/commonReducer';
import type {RootState} from '@store/index';
import {clearAuthToken} from '@utils/asyncStorage';
import {axiosInstance, toApiError} from './client';
import type {ApiError} from './client';

export interface BaseQueryArgs {
  url: string;
  method: Method;
  data?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  skipAuth?: boolean;
  skipLoader?: boolean;
}

const getFullUrlForLog = (url: string) => {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  const base = (axiosInstance.defaults.baseURL ?? '').replace(/\/+$/, '');
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${base}${path}`;
};

const formatPayloadForLog = (payload: unknown) => {
  if (payload instanceof FormData) {
    return {
      type: 'FormData',
      parts: (payload as FormData & {_parts?: unknown})._parts ?? 'unavailable',
    };
  }
  return payload ?? null;
};

export const axiosBaseQuery: BaseQueryFn<BaseQueryArgs, unknown, ApiError> = async (
  args,
  api,
) => {
  const {dispatch, getState} = api;
  const {url, method, data, params, headers, skipAuth = false, skipLoader = false} = args;

  const token = (getState() as RootState).common.authToken;
  const authorizationHeader = !skipAuth && token ? {Authorization: `Bearer ${token}`} : {};

  const requestConfig: AxiosRequestConfig = {
    url,
    method,
    data,
    params,
    headers: {
      ...headers,
      ...authorizationHeader,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  };

  if (__DEV__) {
    console.log('API REQUEST', {
      method,
      url: getFullUrlForLog(url),
      params: params ?? null,
      data: formatPayloadForLog(data),
      hasAuthHeader: Boolean(authorizationHeader.Authorization),
      skipLoader,
    });
  }

  try {
    const response = await axiosInstance.request(requestConfig);

    if (__DEV__) {
      console.log('API RESPONSE', {
        method,
        url: getFullUrlForLog(url),
        status: response.status,
      });
    }

    return {data: response.data};
  } catch (rawError) {
    const error = rawError as AxiosError;

    if (__DEV__) {
      console.log('API ERROR', {
        method,
        url: getFullUrlForLog(url),
        status: error.response?.status ?? 'NO_STATUS',
        message: error.message,
        responseData: error.response?.data ?? null,
      });
    }

    if (error.response?.status === 401) {
      await clearAuthToken();
      dispatch(logoutUser());

      return {
        error: {
          status: 401,
          data: error.response?.data,
          message: 'Authentication failed. Please log in again.',
        },
      };
    }

    return {error: toApiError(error)};
  }
};
