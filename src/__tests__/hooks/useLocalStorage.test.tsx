import useLocalStorage from '../../hooks/useLocalStorage';
import { fireEvent, render, screen } from '@testing-library/react';

function TestComponent() {
  const [value, setValue] = useLocalStorage('storedKey');

  return (
    <div>
      <span>{value}</span>
      <button onClick={() => setValue('newValue')}>Set Value</button>
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
    localStorage.setItem('storedKey', 'storedValue');

    render(<TestComponent />);

    expect(localStorage.getItem).toHaveBeenCalledWith('storedKey');
  });

  it('should save item to Local Storage', () => {
    render(<TestComponent />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(localStorage.setItem).toHaveBeenCalledWith('storedKey', 'newValue');
  });
});
