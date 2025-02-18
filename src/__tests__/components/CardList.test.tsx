import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import CardList from '../../components/cardList/CardList';
import { MemoryRouter } from 'react-router';
import renderWithProviders from '../utils/test-utils';
import { BookSeries } from '../../interfaces/models';

const emptyBookSeries: BookSeries[] = [];
const bookSeries = [
  { uid: '123', title: 'TestSeries1' },
  { uid: '345', title: 'TestSeries2' },
];

describe('CardList', () => {
  it('should render correct number of cards on page', () => {
    renderWithProviders(
      <MemoryRouter>
        <CardList bookSeries={bookSeries} />
      </MemoryRouter>
    );
    const titles = screen.getAllByRole('heading');
    expect(titles.length).toBe(bookSeries.length);
  });

  it('should render correct page with 0 book series', () => {
    renderWithProviders(
      <MemoryRouter>
        <CardList bookSeries={emptyBookSeries} />
      </MemoryRouter>
    );
    expect(screen.getByText(/No book series/i)).toBeInTheDocument();
  });
});
