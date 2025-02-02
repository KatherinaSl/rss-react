import React, { Component } from 'react';
import './error.css';
import { ErrorMessageProps } from '../../interfaces/interfaces';

class ErrorMessage extends Component<ErrorMessageProps> {
  render(): React.ReactNode {
    return (
      <div role="alert" className="error">
        <h3>Something went wrong...</h3>
        <p>{this.props.message}</p>
        {this.props.resetError && (
          <button className="reset-button" onClick={this.props.resetError}>
            Reset error
          </button>
        )}
      </div>
    );
  }
}

export default ErrorMessage;
