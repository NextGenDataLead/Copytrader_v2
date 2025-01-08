// Theme type definition for type safety across the application
export type Theme = 'dark' | 'light';

// Theme context type
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}