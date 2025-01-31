import React from 'react';
import './error.css';

interface ErrorMessageProps {
  message: string | undefined;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div role="alert" className="error">
      <h3>Something went wrong...</h3>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
