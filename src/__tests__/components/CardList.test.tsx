import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import CardList from '../../components/cardList/CardList';
import { MemoryRouter } from 'react-router';
import { bookSeries } from '../utils/mockData';
import { BookSeries } from '../../interfaces/interfaces';

export const emptyBookSeries: BookSeries[] = [];

describe('CardList', () => {
  it('should render correct number of cards on page', () => {
    render(
      <MemoryRouter>
        <CardList bookSeries={bookSeries} />
      </MemoryRouter>
    );
    const titles = screen.getAllByRole('heading');
    expect(titles.length).toBe(bookSeries.length);
  });

  it('should render correct page with 0 book series', () => {
    render(
      <MemoryRouter>
        <CardList bookSeries={emptyBookSeries} />
      </MemoryRouter>
    );
    expect(screen.getByText(/No book series/i)).toBeInTheDocument();
  });
});
