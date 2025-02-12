import { ReactNode, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

interface PropsInterface {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: PropsInterface) => {
  const [theme, setTheme] = useState('dark');
  const handleThemeChange = () => {
    const isCurrentDark = theme === 'dark';
    setTheme(isCurrentDark ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};
