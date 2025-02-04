import { useCallback } from 'react';

export default function ThrowErrorButton() {
  const handleClick = useCallback(() => {
    throw new Error('This is a test error!');
  }, []);

  return (
    <button onClick={handleClick} className="error-button">
      Click to Throw Error
    </button>
  );
}
