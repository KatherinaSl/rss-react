import './error.css';
import { ErrorMessageProps } from '../../interfaces/interfaces';

export default function ErrorMessage(props: ErrorMessageProps) {
  return (
    <div role="alert" className="error">
      <h3>Something went wrong... Please contact System Administrator</h3>
      <p>{props.message}</p>
    </div>
  );
}
