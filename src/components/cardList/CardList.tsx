import './cardList.css';
import { Outlet } from 'react-router';
import { BookSeries, CardListProperties } from '../../interfaces/interfaces';
import Card from '../card/Card';

export default function CardList(props: CardListProperties) {
  const data = props.data.bookSeries;
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
      <Outlet />
    </div>
  );
}
