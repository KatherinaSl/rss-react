import './card.css';
import { BookSeries } from '../../interfaces/interfaces';
import { Link, useParams } from 'react-router';
import BooksDetails from '../booksDetails/BooksDetails';
import Checkbox from '../checkbox/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { remove, save } from '../../features/picker/cardsPickerSlice';

export default function Card(props: BookSeries) {
  const { uid, title, publishedYearFrom, publishedYearTo, numberOfBooks } =
    props;

  const { pid } = useParams();
  const dispatch = useDispatch();

  const isSelected =
    useSelector((state: RootState) => state.picker.pickedValues).filter(
      (bookSeries) => bookSeries.uid === uid
    ).length > 0;

  const onCheckboxClick = (isSelected: boolean) => {
    if (isSelected) {
      dispatch(save(props));
    } else {
      dispatch(remove(props));
    }
  };

  return (
    <div className="card">
      <Checkbox initialValue={isSelected} onClick={onCheckboxClick} />
      <Link to={`/page/${pid ? pid : 1}/card/${uid}`}>
        <h4>{title}</h4>
        <BooksDetails label="Published Year From" value={publishedYearFrom} />
        <BooksDetails label="Published Year To" value={publishedYearTo} />
        <BooksDetails label="Number of Books" value={numberOfBooks} />
      </Link>
    </div>
  );
}
