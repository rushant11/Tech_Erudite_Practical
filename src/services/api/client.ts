import axios, {AxiosError} from 'axios';
import {API_BASE_URL} from '@utils/apiConstant';

export type ApiError = {
  status: number;
  data?: unknown;
  message: string;
};

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    Accept: 'application/json',
  },
});

export const toApiError = (error: AxiosError): ApiError => {
  return {
    status: error.response?.status ?? 500,
    data: error.response?.data,
    message: error.message || 'Something went wrong',
  };
};
