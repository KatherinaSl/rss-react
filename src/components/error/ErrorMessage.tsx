import './error.css';
import { ErrorMessageProps } from '../../interfaces/interfaces';

export default function ErrorMessage(props: ErrorMessageProps) {
  return (
    <div role="alert" className="error">
      <h3>Something went wrong...</h3>
      <p>{props.message}</p>
      {props.resetError && (
        <button className="reset-button" onClick={props.resetError}>
          Reset error
        </button>
      )}
    </div>
  );
}
