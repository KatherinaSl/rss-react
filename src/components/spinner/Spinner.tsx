import { Component, ReactNode } from 'react';
import './spiner.css';

class Spinner extends Component {
  render(): ReactNode {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }
}

export default Spinner;
