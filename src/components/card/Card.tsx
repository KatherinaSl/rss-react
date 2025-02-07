import './card.css';
import { BookSeries } from '../../interfaces/interfaces';
import { Link, useParams } from 'react-router';
import BooksDetails from '../booksDetails/BooksDetails';

export default function Card(props: BookSeries) {
  const { uid, title, publishedYearFrom, publishedYearTo, numberOfBooks } =
    props;

  const { pid } = useParams();

  return (
    <Link to={`/page/${pid ? pid : 1}/card/${uid}`}>
      <div className="card">
        <h4>{title}</h4>
        <BooksDetails label="Published Year From" value={publishedYearFrom} />
        <BooksDetails label="Published Year To" value={publishedYearTo} />
        <BooksDetails label="Number of Books" value={numberOfBooks} />
      </div>
    </Link>
  );
}
