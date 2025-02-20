import useLocalStorage from '../../hooks/useLocalStorage';
import { fireEvent, render, screen } from '@testing-library/react';

const STORED_KEY = 'storedKey';
const NEW_VALUE = 'newValue';
const STORED_VALUE = 'storedValue';

function TestComponent() {
  const [value, setValue] = useLocalStorage(STORED_KEY);

  return (
    <div>
      <span>{value}</span>
      <button onClick={() => setValue(NEW_VALUE)}>Set Value</button>
    </div>
  );
}

describe('useLocaleStorage', () => {
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

  afterEach(() => {
    localStorage.clear();
    getItemSpy.mockClear();
    setItemSpy.mockClear();
  });

  it('should get item from Local Storage', () => {
    localStorage.setItem(STORED_KEY, STORED_VALUE);

    render(<TestComponent />);

    expect(localStorage.getItem).toHaveBeenCalledWith(STORED_KEY);
  });

  it('should save item to Local Storage', () => {
    render(<TestComponent />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(localStorage.setItem).toHaveBeenCalledWith(STORED_KEY, NEW_VALUE);
  });
});
