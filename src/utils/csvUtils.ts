import { BookSeries } from '../interfaces/models';

export const convertToCSV = (booksSeries: BookSeries[]) => {
  if (!booksSeries || booksSeries.length === 0) return '';

  const headers = Object.keys(booksSeries[0]) as (keyof BookSeries)[];
  const rows = booksSeries.map((row) =>
    headers.map((header) => `"${row[header]}"`).join(',')
  );

  return [headers.join(','), ...rows].join('\n');
};
