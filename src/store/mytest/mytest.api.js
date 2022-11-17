import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const testApi = createApi({
  reducerPath: 'mytest/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/'
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    animalsList: build.query({
      query: () => ({
        url: `photos`,
        params: {
          albumId: 5
        }
      })
    })
  })
});

export const { useAnimalsListQuery } = testApi;
