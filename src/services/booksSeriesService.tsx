import {
  GetBookSeriesResponse,
  SearchBookSeriesResponse,
} from '../interfaces/interfaces';
import { BASE_URL, DEFAULT_PAGE_SIZE, SEARCH } from '../constants/constants';

export function searchBooksSeries(
  title: string,
  pageNumber: number = 0
): Promise<SearchBookSeriesResponse> {
  const url = `${BASE_URL}/${SEARCH}?pageSize=${DEFAULT_PAGE_SIZE}&pageNumber=${pageNumber}`;
  return fetch(url, {
    method: 'POST',
    body: new URLSearchParams({ title }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  }).then((response): Promise<SearchBookSeriesResponse> => {
    if (!response.ok) {
      throw new Error(`Server answered with error code ${response.status}`);
    }
    return response.json();
  });
}

export function getBookSeries(uid: string): Promise<GetBookSeriesResponse> {
  const url = `${BASE_URL}?uid=${uid}`;

  return fetch(url).then((response): Promise<GetBookSeriesResponse> => {
    if (!response.ok) {
      throw new Error(`Server answered with error code ${response.status}`);
    }
    return response.json();
  });
}
