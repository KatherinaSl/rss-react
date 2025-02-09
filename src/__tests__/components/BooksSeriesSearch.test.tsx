import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import BooksSeriesSearch from '../../components/bookSeriesSearch/BooksSeriesSearch';
import { MemoryRouter } from 'react-router';
import prepareFetchResponse from '../utils/fetchUtils';
import { bookSeriesResponseOne } from '../utils/mockData';

describe('BooksSeriesSearch', () => {
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    getItemSpy.mockClear();
    setItemSpy.mockClear();
  });

  it('should render the page with Book Series Cards', async () => {
    const mockFetchResponse = prepareFetchResponse(200, bookSeriesResponseOne);
    vi.mocked(fetch).mockResolvedValueOnce(mockFetchResponse as Response);

    render(
      <MemoryRouter>
        <BooksSeriesSearch />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('TestBookSeries1')).toBeVisible()
    );
    expect(screen.getAllByRole('heading').length).toEqual(3);
  });

  it('should save search tearm to local storage', async () => {
    const mockFetchResponse = prepareFetchResponse(200, bookSeriesResponseOne);
    vi.mocked(fetch).mockResolvedValue(mockFetchResponse as Response);

    render(
      <MemoryRouter>
        <BooksSeriesSearch />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('TestBookSeries1')).toBeVisible()
    );

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    const submit = screen.getByTestId('search-submit');

    fireEvent.input(input, { target: { value: 'test' } });
    fireEvent.click(submit);
    expect(localStorage.setItem).toHaveBeenCalledWith('SEARCH_TERM', 'test');
  });

  it('should get search term from local storage', async () => {
    const mockFetchResponse = prepareFetchResponse(200, bookSeriesResponseOne);
    vi.mocked(fetch).mockResolvedValue(mockFetchResponse as Response);

    render(
      <MemoryRouter>
        <BooksSeriesSearch />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('TestBookSeries1')).toBeVisible()
    );
    expect(localStorage.getItem).toHaveBeenCalledWith('SEARCH_TERM');
  });
});
