import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Book, BookSeries } from '../../interfaces/interfaces';
import './cardDetails.css';
import { getBookSeries } from '../../services/booksSeriesService';
import { Link, useNavigate, useParams } from 'react-router';
import Spinner from '../spinner/Spinner';
import BooksDetails from '../booksDetails/BooksDetails';

export default function CardDetails() {
  const [loading, setLoading] = useState(false);
  const { cardId, pid } = useParams();
  const [details, setDetails] = useState<BookSeries>();
  const cardDetailsRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const handleOutside = (e: MouseEvent<HTMLDivElement>) => {
    if (
      cardDetailsRef.current &&
      !cardDetailsRef.current.contains(e.target as Node)
    ) {
      navigate(`/page/${pid}`);
    }
  };

  const handleInside = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation();

  useEffect(() => {
    setLoading(true);
    if (cardId) {
      getBookSeries(cardId)
        .then((response) => {
          setDetails(response.bookSeries);
        })
        .finally(() => setLoading(false));
    }
  }, [cardId]);

  const renderBooksInfo = () => {
    return (
      <div className="book-information">
        {details?.books?.length !== 0 ? (
          details?.books?.map((book: Book, index: number) => (
            <div key={index} className="infoItem">
              <BooksDetails label="Title" value={book.title} />
              <BooksDetails label="Published Year" value={book.publishedYear} />
            </div>
          ))
        ) : (
          <p>There is no additional information about this book series</p>
        )}
      </div>
    );
  };

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar" ref={cardDetailsRef} onClick={handleInside}>
        <Link to={`/page/${pid}`} className="hide-button">
          Hide details
        </Link>
        {loading && <Spinner />}
        {!loading && (
          <h2 className="title">
            Information about <p>{details?.title}</p>
          </h2>
        )}
        {!loading && renderBooksInfo()}
      </div>

      <div onClick={handleOutside} className="overlay"></div>
    </div>
  );
}
