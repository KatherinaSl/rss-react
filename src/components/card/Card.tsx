import './card.css';
import {
  BookSeries,
  BookSeriesDetailes as BookSeriesDetails,
} from '../../interfaces/interfaces';

export default function Card(props: BookSeries) {
  const { title, publishedYearFrom, publishedYearTo, numberOfBooks } = props;

  return (
    <div className="card">
      <h4>{title}</h4>
      <BooksDetails label="Published Year From" value={publishedYearFrom} />
      <BooksDetails label="Published Year To" value={publishedYearTo} />
      <BooksDetails label="Number of Books" value={numberOfBooks} />
    </div>
  );
}

function BooksDetails({ label, value }: BookSeriesDetails) {
  if (!value) return null;
  return (
    <p>
      <strong>{label}:</strong> {value}
    </p>
  );
}
