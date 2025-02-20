import { useSelector } from 'react-redux';
import './checkbox.css';
import { selectIsBookInStore } from '../../features/picker/cardsPickerSlice';
import { RootState } from '../../app/store';

interface CheckboxProps {
  id: string;
  onClick: (isChecked: boolean) => void;
}

export default function Checkbox(props: CheckboxProps) {
  const isSelected = useSelector((state: RootState) =>
    selectIsBookInStore(state, props.id)
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onClick(event.target.checked);
  };

  return (
    <div className="checkbox-container">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={isSelected}
          className="checkbox-input"
          onChange={handleChange}
        />
        Choose!
      </label>
    </div>
  );
}
