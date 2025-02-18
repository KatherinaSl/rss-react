import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Card from '../../components/card/Card';
import { MemoryRouter, Route, Routes } from 'react-router';
import renderWithProviders from '../utils/test-utils';
import CardDetails from '../../components/cardDetails/CardDetails';
import { store } from '../../app/store';

describe('Card', () => {
  const uid = '123';
  it('should render valid card on default page', () => {
    renderWithProviders(
      <MemoryRouter>
        <Card uid={uid} title={'Book'} />
      </MemoryRouter>
    );
    const link = screen.getByRole('link');

    expect(screen.getByRole('heading')).toHaveTextContent(/book/i);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/page/1/card/${uid}`);
  });

  it('should render valid link on provided page', () => {
    const uid = '567';
    renderWithProviders(
      <MemoryRouter initialEntries={['/page/78']}>
        <Routes>
          <Route
            path="/page/:pid"
            element={<Card uid={uid} title={'Link Test'} />}
          ></Route>
        </Routes>
      </MemoryRouter>
    );
    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/page/78/card/${uid}`);
  });

  it('should open CardDetails on click and trigger additional API call', async () => {
    const uid = '123';
    renderWithProviders(
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
    expect(screen.getByText(`TestBook${uid}`));
  });

  it('should save or remove BookSeries from store', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/page/78']}>
        <Routes>
          <Route
            path="/page/:pid"
            element={<Card uid={'567'} title={'Store Test'} />}
          ></Route>
        </Routes>
      </MemoryRouter>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    const isStored = store
      .getState()
      .picker.pickedValues.some(
        (bookSeries) => bookSeries.title === 'Store Test'
      );
    expect(isStored).toBeTruthy();

    fireEvent.click(checkbox);

    const isStoreEmpty = store.getState().picker.pickedValues.length === 0;
    expect(isStoreEmpty).toBeTruthy();
  });
});
