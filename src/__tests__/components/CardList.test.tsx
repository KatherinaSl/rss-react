import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
// import { MemoryRouter, Route, Routes } from 'react-router';
import CardList from '../../components/cardList/CardList';
import { MemoryRouter } from 'react-router';
import { BookSeries } from '../../interfaces/interfaces';

const bookSeries = [
  { uid: '123', title: 'TestSeries1' },
  { uid: '345', title: 'TestSeries2' },
];

const emptyBookSeries: BookSeries[] = [];

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
