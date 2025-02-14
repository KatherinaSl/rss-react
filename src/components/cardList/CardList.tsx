import './cardList.css';
import { Outlet } from 'react-router';
import { BookSeries, CardListProperties } from '../../interfaces/interfaces';
import Card from '../card/Card';
import { useSelector } from 'react-redux';
import { selectCheckbox } from '../../features/picker/cardsPickerSlice';
import Flyout from '../flyout/flyout';

export default function CardList(props: CardListProperties) {
  const data = props.bookSeries;
  const pickedItemsCount = useSelector(selectCheckbox);

  return (
    <div className="books-information">
      <div className="cards">
        {data.length ? (
          data.map((bookSeries: BookSeries, index: number) => (
            <Card key={index} {...bookSeries} />
          ))
        ) : (
          <p>No book series found for the given search term.</p>
        )}
      </div>
      {pickedItemsCount > 0 && <Flyout count={pickedItemsCount} />}
      <Outlet />
    </div>
  );
}
