import './checkbox.css';
import { useState } from 'react';

export interface CheckboxProps {
  initialValue: boolean;
  onClick: (isChecked: boolean) => void;
}

export default function Checkbox(props: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(props.initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    props.onClick(event.target.checked);
  };
  return (
    <div className="checkbox-container">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={isChecked}
          className="checkbox-input"
          onChange={handleChange}
        />
        Choose!
      </label>
    </div>
  );
}
