import './card.css';
import { BookSeries } from '../../interfaces/models';
import { Link, useParams } from 'react-router';
import BooksDetails from '../booksDetails/BooksDetails';
import Checkbox from '../checkbox/Checkbox';
import { useDispatch } from 'react-redux';
import { remove, save } from '../../features/picker/cardsPickerSlice';

export default function Card(props: BookSeries) {
  const { uid, title, publishedYearFrom, publishedYearTo, numberOfBooks } =
    props;

  const { pid } = useParams();
  const dispatch = useDispatch();

  const onCheckboxClick = (isSelected: boolean) => {
    if (isSelected) {
      dispatch(save(props));
    } else {
      dispatch(remove(props));
    }
  };

  return (
    <div className="card">
      <Checkbox onClick={onCheckboxClick} id={uid} />
      <Link to={`/page/${pid ? pid : 1}/card/${uid}`}>
        <div className="card-info-container">
          <h4>{title}</h4>
          <BooksDetails label="Published Year From" value={publishedYearFrom} />
          <BooksDetails label="Published Year To" value={publishedYearTo} />
          <BooksDetails label="Number of Books" value={numberOfBooks} />
        </div>
      </Link>
    </div>
  );
}
