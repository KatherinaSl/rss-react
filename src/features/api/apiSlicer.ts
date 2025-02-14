import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, DEFAULT_PAGE_SIZE, SEARCH } from '../../constants/constants';
import {
  BookSeries,
  GetBookSeriesResponse,
  SearchBookSeriesResponse,
} from '../../interfaces/interfaces';

export const apiBookSeries = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    searchBooksSeries: builder.mutation<
      SearchBookSeriesResponse,
      { title: string; pageNumber: number }
    >({
      query: ({ pageNumber = 0, title }) => ({
        url: `/${SEARCH}?pageSize=${DEFAULT_PAGE_SIZE}&pageNumber=${pageNumber}`,
        method: 'POST',
        body: new URLSearchParams({ title }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }),
    }),
    getBookSeries: builder.query<BookSeries, string>({
      query: (uid) => ({
        url: `?uid=${uid}`,
      }),
      transformResponse: (response: GetBookSeriesResponse) =>
        response.bookSeries,
    }),
  }),
});

export const { useSearchBooksSeriesMutation, useGetBookSeriesQuery } =
  apiBookSeries;
