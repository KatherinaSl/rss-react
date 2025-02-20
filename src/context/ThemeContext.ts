import { createContext } from 'react';

interface ThemeContextProps {
  theme: string;
  handleThemeChange?: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({ theme: 'dark' });
