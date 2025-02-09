import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import CardDetails from '../../components/cardDetails/CardDetails';
import { MemoryRouter, Route, Routes } from 'react-router';
import prepareFetchResponse from '../utils/fetchUtils';
import { bookSeriesOne, emptyBookSeries } from '../utils/mockData';

describe('CardDetailes', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render spinner in the Card Details component', () => {
    const mockFetchResponse = prepareFetchResponse(200, bookSeriesOne);
    vi.mocked(fetch).mockResolvedValueOnce(mockFetchResponse as Response);

    render(
      <MemoryRouter initialEntries={['/page/1/card/2']}>
        <Routes>
          <Route
            path="/page/:pid/card/:cardId"
            element={<CardDetails />}
          ></Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render Card Details component', async () => {
    const mockFetchResponse = prepareFetchResponse(200, bookSeriesOne);
    vi.mocked(fetch).mockResolvedValueOnce(mockFetchResponse as Response);

    render(
      <MemoryRouter initialEntries={['/page/1/card/2']}>
        <Routes>
          <Route
            path="/page/:pid/card/:cardId"
            element={<CardDetails />}
          ></Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByRole('heading')).toBeVisible());
    expect(screen.getByText('TestBookSeries')).toBeInTheDocument();
    expect(screen.getByText('test book')).toBeInTheDocument();
  });

  it('should hide Card Details on button press', async () => {
    const mockFetchResponse = prepareFetchResponse(200, bookSeriesOne);
    vi.mocked(fetch).mockResolvedValueOnce(mockFetchResponse as Response);

    render(
      <MemoryRouter initialEntries={['/page/1/card/2']}>
        <Routes>
          <Route
            path="/page/:pid/card/:cardId"
            element={<CardDetails />}
          ></Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByRole('heading')).toBeVisible());
    const hideLink = screen.getByRole('link');
    fireEvent.click(hideLink);
    await waitFor(() => expect(screen.queryByRole('heading')).toBeFalsy());
  });

  it('should render Card Details without books', async () => {
    const mockFetchResponse = prepareFetchResponse(200, emptyBookSeries);
    vi.mocked(fetch).mockResolvedValueOnce(mockFetchResponse as Response);

    render(
      <MemoryRouter initialEntries={['/page/1/card/2']}>
        <Routes>
          <Route
            path="/page/:pid/card/:cardId"
            element={<CardDetails />}
          ></Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByRole('heading')).toBeVisible());
    expect(screen.getByText('TestBookSeries')).toBeInTheDocument();
    expect(
      screen.getByText(/There is no additional information/i)
    ).toBeInTheDocument();
  });
});
