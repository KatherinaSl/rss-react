import { useDispatch } from 'react-redux';
import './flyout.css';
import { removeAll } from '../../features/picker/cardsPickerSlice';

interface FlyoutProps {
  count: number;
}

export default function Flyout(props: FlyoutProps) {
  const dispatch = useDispatch();

  const unselectAllHandler = () => dispatch(removeAll());

  return (
    <div className="flyout-component">
      <p>{props.count} items selected</p>
      <button className="unselect-button" onClick={unselectAllHandler}>
        Unselect All
      </button>
      <button className="download-button">Download</button>
    </div>
  );
}
