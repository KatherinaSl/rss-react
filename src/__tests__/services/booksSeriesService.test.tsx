import { BASE_URL, DEFAULT_PAGE_SIZE, SEARCH } from '../../constants/constants';
import {
  getBookSeries,
  searchBooksSeries,
} from '../../services/booksSeriesService';
import prepareFetchResponse from '../utils/fetchUtils';

const fullResponse = {
  bookSeries: [
    {
      uid: 'Test1',
      title: 'Book series1',
    },
  ],
  page: {
    pageNumber: 1,
    pageSize: 5,
    numberOfElements: 5,
    totalElements: 5,
    totalPages: 1,
    firstPage: true,
    lastPage: true,
  },
};

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

    const mockFetchResponse = prepareFetchResponse(200, fullResponse);

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
    expect(result).toEqual(fullResponse);
  });

  it('should throw an error when the server responds with an error', async () => {
    const title = 'Book';
    const pageNumber = 0;

    const mockFetchResponse = prepareFetchResponse(404);
    vi.mocked(fetch).mockResolvedValueOnce(mockFetchResponse as Response);

    await expect(searchBooksSeries(title, pageNumber)).rejects.toThrowError();
  });
});

const firstBook = {
  bookSeries: {
    uid: 'Test1',
    title: 'Book series1',
  },
};

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
