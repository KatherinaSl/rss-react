import { BookSeries, BookSeriesResponse } from '../../interfaces/interfaces';
import Card from '../card/Card';

interface CardListProperties {
  data: BookSeriesResponse;
}

export default function CardList(props: CardListProperties) {
  const data = props.data.bookSeries;
  return (
    <div className="cards">
      {data.length ? (
        data.map((bookSeries: BookSeries, index: number) => (
          <Card key={index} {...bookSeries} />
        ))
      ) : (
        <p>No book series found for the given search term.</p>
      )}
    </div>
  );
}
