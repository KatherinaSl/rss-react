import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import CardDetails from '../../components/cardDetails/CardDetails';
import { MemoryRouter, Route, Routes } from 'react-router';
import renderWithProviders from '../utils/test-utils';

describe('CardDetailes', () => {
  it('should render spinner in the Card Details component', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/page/1/card/123']}>
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
    renderWithProviders(
      <MemoryRouter initialEntries={['/page/1/card/123']}>
        <Routes>
          <Route
            path="/page/:pid/card/:cardId"
            element={<CardDetails />}
          ></Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByRole('heading')).toBeVisible());
    expect(screen.getByText('Test123')).toBeInTheDocument();
    expect(screen.getByText('TestBook123')).toBeInTheDocument();
  });

  it('should hide Card Details on button press', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/page/1/card/123']}>
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
    renderWithProviders(
      <MemoryRouter initialEntries={['/page/1/card/400']}>
        <Routes>
          <Route
            path="/page/:pid/card/:cardId"
            element={<CardDetails />}
          ></Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByRole('heading')).toBeVisible());
    expect(screen.getByText('Test400')).toBeInTheDocument();
    expect(
      screen.getByText(/There is no additional information/i)
    ).toBeInTheDocument();
  });
});
