import { BookSeriesDetails } from '../../interfaces/interfaces';

export default function BooksDetails({ label, value }: BookSeriesDetails) {
  if (!value) return null;
  return (
    <p>
      <strong>{label}:</strong> {value}
    </p>
  );
}
