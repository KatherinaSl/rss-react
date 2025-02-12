import { createContext } from 'react';

export interface Context {
  theme: string;
  handleThemeChange?: () => void;
}

export const ThemeContext = createContext<Context>({ theme: 'dark' });
