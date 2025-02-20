import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import './error.css';
import { SerializedError } from '@reduxjs/toolkit/react';

interface ErrorMessageProps {
  error?: FetchBaseQueryError | SerializedError;
  message?: string;
}

export default function ErrorMessage(props: ErrorMessageProps) {
  return (
    <div role="alert" className="error">
      <h3>Something went wrong... Please contact System Administrator</h3>
      <p>{props.message}</p>
    </div>
  );
}
