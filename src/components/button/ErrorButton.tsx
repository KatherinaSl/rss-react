import React, { Component } from 'react';
import './errorbutton.css';

class ThrowButton extends Component {
  handleClick = () => {
    throw new Error('This is a test error!');
  };

  render(): React.ReactNode {
    return (
      <button onClick={this.handleClick} className="error-button">
        Click to Throw Error
      </button>
    );
  }
}

export default ThrowButton;
