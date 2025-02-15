import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import BooksSeriesSearch from '../../components/bookSeriesSearch/BooksSeriesSearch';
import { MemoryRouter } from 'react-router';
import { SEARCH_TERM } from '../../constants/constants';
import renderWithProviders from '../utils/test-utils';

describe('BooksSeriesSearch', () => {
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

  afterEach(() => {
    localStorage.clear();
    getItemSpy.mockClear();
    setItemSpy.mockClear();
  });

  it('should render the page with Book Series Cards', async () => {
    renderWithProviders(
      <MemoryRouter>
        <BooksSeriesSearch />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('EmptyTitle')).toBeVisible());
    screen.debug();
    expect(screen.getAllByRole('heading').length).toEqual(2);
  });

  it('should save search tearm to local storage', async () => {
    renderWithProviders(
      <MemoryRouter>
        <BooksSeriesSearch />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('EmptyTitle')).toBeVisible());

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    const submit = screen.getByTestId('search-submit');

    fireEvent.input(input, { target: { value: 'test' } });
    fireEvent.click(submit);
    expect(localStorage.setItem).toHaveBeenCalledWith(SEARCH_TERM, 'test');

    await waitFor(() => expect(screen.getByText('test')).toBeVisible());
  });

  it('should get search term from local storage', async () => {
    renderWithProviders(
      <MemoryRouter>
        <BooksSeriesSearch />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('EmptyTitle')).toBeVisible());
    expect(localStorage.getItem).toHaveBeenCalledWith(SEARCH_TERM);
  });
});
