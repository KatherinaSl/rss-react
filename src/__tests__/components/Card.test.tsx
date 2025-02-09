import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Card from '../../components/card/Card';
import { MemoryRouter, Route, Routes } from 'react-router';
import prepareFetchResponse from '../utils/fetchUtils';
import { simpleBookSeriesDetails } from '../utils/mockData';
import CardDetails from '../../components/cardDetails/CardDetails';
import { BASE_URL } from '../../constants/constants';

describe('Card', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render valid card on default page', () => {
    render(
      <MemoryRouter>
        <Card uid={'123'} title={'Book'} />
      </MemoryRouter>
    );
    const link = screen.getByRole('link');

    expect(screen.getByRole('heading')).toHaveTextContent(/book/i);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/page/1/card/123');
  });

  it('should render valid link on provided page', () => {
    render(
      <MemoryRouter initialEntries={['/page/78']}>
        <Routes>
          <Route
            path="/page/:pid"
            element={<Card uid={'567'} title={'Link Test'} />}
          ></Route>
        </Routes>
      </MemoryRouter>
    );
    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/page/78/card/567');
  });

  it('should open CardDetails on click and trigger additional API call', async () => {
    const mockFetchResponse = prepareFetchResponse(
      200,
      simpleBookSeriesDetails
    );
    vi.mocked(fetch).mockResolvedValueOnce(mockFetchResponse as Response);

    const uid = '567';
    render(
      <MemoryRouter initialEntries={['/page/1']}>
        <Routes>
          <Route
            path="/page/:pid"
            element={<Card uid={uid} title={'TestTitle'} />}
          />
          <Route path="/page/:pid/card/:cardId" element={<CardDetails />} />
        </Routes>
      </MemoryRouter>
    );
    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();

    fireEvent.click(link);
    await waitFor(() =>
      expect(screen.getByText(/Information about/i)).toBeVisible()
    );

    const url = `${BASE_URL}?uid=${uid}`;
    expect(fetch).toHaveBeenCalledWith(url);
  });
});
