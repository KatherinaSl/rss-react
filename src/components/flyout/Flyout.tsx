import { useDispatch, useSelector } from 'react-redux';
import './flyout.css';
import { removeAll } from '../../features/picker/cardsPickerSlice';
import { convertToCSV } from '../../utils/csvUtils';
import { RootState } from '../../app/store';
import { useRef } from 'react';

interface FlyoutProps {
  count: number;
}

export default function Flyout(props: FlyoutProps) {
  const dispatch = useDispatch();
  const unselectAllHandler = () => dispatch(removeAll());

  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);
  const pickedValues = useSelector(
    (state: RootState) => state.picker.pickedValues
  );

  const downloadHandler = () => {
    const csvFile = convertToCSV(pickedValues);
    const blob = new Blob([csvFile], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flyout-component">
      <p>{props.count} items selected</p>
      <button className="unselect-button" onClick={unselectAllHandler}>
        Unselect All
      </button>

      <a
        ref={downloadLinkRef}
        style={{ display: 'none' }}
        download={`${props.count}_booksSeries`}
      ></a>
      <button
        className="download-button"
        onClick={downloadHandler}
        value="download"
      >
        Download
      </button>
    </div>
  );
}
