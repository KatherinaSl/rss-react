import { useState } from 'react';

export default function useLocalStorage(
  lsKey: string
): [string, (newValue: string, saveToLs?: boolean) => void] {
  const prevLsValue = localStorage.getItem(lsKey);
  const [value, setValue] = useState(prevLsValue ? prevLsValue : '');

  const setLsValue = (newValue: string, saveToLs: boolean = true) => {
    if (saveToLs) {
      localStorage.setItem(lsKey, newValue);
    }
    setValue(newValue);
  };

  return [value, setLsValue];
}
