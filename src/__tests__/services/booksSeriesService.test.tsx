import { BASE_URL, DEFAULT_PAGE_SIZE, SEARCH } from '../../constants/constants';
import {
  getBookSeries,
  searchBooksSeries,
} from '../../services/booksSeriesService';
import prepareFetchResponse from '../utils/fetchUtils';
import { bookSeriesSearchResponse, firstBook } from '../utils/mockData';

describe('booksSeriesService.searchBooksSeries', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch data successfully and return a result', async () => {
    const title = 'Book';
    const pageNumber = 0;
    const url = `${BASE_URL}/${SEARCH}?pageSize=${DEFAULT_PAGE_SIZE}&pageNumber=${pageNumber}`;

    const mockFetchResponse = prepareFetchResponse(
      200,
      bookSeriesSearchResponse
    );

    vi.mocked(fetch).mockResolvedValueOnce(mockFetchResponse as Response);

    const result = await searchBooksSeries(title, pageNumber);

    expect(fetch).toHaveBeenCalledWith(
      url,
      expect.objectContaining({
        method: 'POST',
        body: new URLSearchParams({ title }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
    );
    expect(result).toEqual(bookSeriesSearchResponse);
  });

  it('should throw an error when the server responds with an error', async () => {
    const title = 'Book';
    const pageNumber = 0;

    const mockFetchResponse = prepareFetchResponse(404);
    vi.mocked(fetch).mockResolvedValueOnce(mockFetchResponse as Response);

    await expect(searchBooksSeries(title, pageNumber)).rejects.toThrowError();
  });
});

describe('booksSeriesService.getBookSeries', () => {
  it('should fetch data successfully and return a result', async () => {
    const uid = '456';
    const url = `${BASE_URL}?uid=${uid}`;

    const mockFetchResponse = prepareFetchResponse(200, firstBook);

    vi.mocked(fetch).mockResolvedValueOnce(mockFetchResponse as Response);

    const result = await getBookSeries(uid);
    expect(fetch).toHaveBeenCalledWith(url);
    expect(result).toEqual(firstBook);
  });

  it('should throw an error when the server responds with an error', async () => {
    const uid = '456';
    const mockFetchResponse = prepareFetchResponse(500, firstBook);

    vi.mocked(fetch).mockResolvedValueOnce(mockFetchResponse as Response);

    await expect(getBookSeries(uid)).rejects.toThrowError();
  });
});
