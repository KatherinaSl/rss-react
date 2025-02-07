import './card.css';
import { BookSeries, BookSeriesDetails } from '../../interfaces/interfaces';
import { Link, useParams } from 'react-router';

export default function Card(props: BookSeries) {
  const { uid, title, publishedYearFrom, publishedYearTo, numberOfBooks } =
    props;

  let { pid } = useParams();

  if (!pid) {
    pid = '1';
  }

  return (
    <div className="card">
      <Link to={`/page/${pid}/card/${uid}`}>
        <h4>{title}</h4>
        <BooksDetails label="Published Year From" value={publishedYearFrom} />
        <BooksDetails label="Published Year To" value={publishedYearTo} />
        <BooksDetails label="Number of Books" value={numberOfBooks} />
      </Link>
    </div>
  );
}

//todo refactor
function BooksDetails({ label, value }: BookSeriesDetails) {
  if (!value) return null;
  return (
    <p>
      <strong>{label}:</strong> {value}
    </p>
  );
}
