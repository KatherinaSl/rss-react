import { BookSeriesResponse } from '../interfaces/interfaces';

const BASE_URL = 'https://stapi.co/api/v1/rest/bookSeries/';
const SEARCH = 'search';

export default function searchBooksSeries(
  title: string,
  pageNumber: number = 0
): Promise<BookSeriesResponse> {
  const url =
    BASE_URL + SEARCH + (pageNumber ? `?pageNumber=${pageNumber}` : '');
  return fetch(url, {
    method: 'POST',
    body: new URLSearchParams({ title }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  }).then((response): Promise<BookSeriesResponse> => {
    if (!response.ok) {
      throw new Error(`Server answered with error code ${response.status}`);
    }
    return response.json(); //todo check type
  });
}
