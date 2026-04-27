import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from './baseQuery';
import type {EventListingApiItem} from '@api/dashboardApi';

type LoginSuccessBody = {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      usr_id: number;
      usr_fname: string;
      usr_lname: string;
      usr_email: string;
      usr_profile_img: string;
    };
  };
};

type EventListingResponseBody = {
  success: boolean;
  message: string;
  data: {
    events: EventListingApiItem[];
    total: number;
  };
};

export const plieApi = createApi({
  reducerPath: 'plieApi',
  baseQuery: axiosBaseQuery,
  tagTypes: ['Events'],
  endpoints: builder => ({
    login: builder.mutation<
      LoginSuccessBody['data'],
      {email: string; password: string}
    >({
      query: ({email, password}) => {
        const fd = new FormData();
        fd.append('email', email);
        fd.append('password', password);
        return {url: '/login', method: 'POST', data: fd, skipAuth: true, skipLoader: true};
      },
      transformResponse: (body: LoginSuccessBody) => {
        if (!body?.success) {
          throw new Error(body?.message || 'Login failed');
        }
        return body.data;
      },
    }),
    getEvents: builder.query<EventListingApiItem[], void>({
      query: () => ({
        url: '/events-listing',
        method: 'POST',
        data: new FormData(),
      }),
      transformResponse: (body: EventListingResponseBody) => {
        if (!body?.success) {
          throw new Error(body?.message || 'Unable to load events');
        }
        return body.data.events;
      },
      providesTags: ['Events'],
    }),
  }),
});

export const {useLoginMutation, useGetEventsQuery} = plieApi;
