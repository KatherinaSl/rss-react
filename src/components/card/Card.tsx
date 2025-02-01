import { Component } from 'react';
import './card.css';
import { BookSeries } from '../../interfaces/interfaces';

class Card extends Component<BookSeries> {
  render() {
    const { title, publishedYearFrom, publishedYearTo, numberOfBooks } =
      this.props;

    return (
      <div className="card">
        <h4>{title}</h4>
        {publishedYearFrom && (
          <p>
            <strong>Published Year From:</strong> {publishedYearFrom}
          </p>
        )}
        {publishedYearTo && (
          <p>
            <strong>Published Year To:</strong> {publishedYearTo}
          </p>
        )}
        {numberOfBooks && (
          <p>
            <strong>Number of Books:</strong> {numberOfBooks}
          </p>
        )}
      </div>
    );
  }
}

export default Card;
