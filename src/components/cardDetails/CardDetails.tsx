import { useEffect, useState } from 'react';
import {
  Book,
  BookSeries,
  BookSeriesDetails,
} from '../../interfaces/interfaces';
import './cardDetails.css';
import { getBookSeries } from '../../services/booksSeriesService';
import { Link, useParams } from 'react-router';

export default function CardDetails() {
  const { cardId } = useParams();
  const [details, setDetails] = useState<BookSeries>();

  useEffect(() => {
    if (cardId) {
      getBookSeries(cardId).then((response) => {
        setDetails(response.bookSeries);
      });
    }
  }, [cardId]);

  const { pid } = useParams();

  return (
    <div className="sidebar">
      <Link to={`/page/${pid}`}>Hide detailes</Link>
      <h2 className="title">Information about &quot;{details?.title}&quot;</h2>
      <div className="bookInformation">
        {details?.books?.length !== 0 &&
          details?.books?.map((book: Book, index: number) => (
            <div key={index} className="infoItem">
              <BooksDetails label="Title" value={book.title} />
              <BooksDetails label="Published Year" value={book.publishedYear} />
            </div>
          ))}
      </div>
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
