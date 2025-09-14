export type ThemeColors = {
  primary: string;
  secondary: string;
  tertiary: string,
  quaternary: string,  
  quinary: string;
  senary: string,
  septenary: string,  
  octonary: string,
  nonary: string
    
};

const baseColors = {
  quinary: '#8d3333',
  senary: '#44e70eff',
  septenary: '#000000',
  octonary: '#FFFFFF',
  nonary: '#8f968eff',
};

export const lightTheme: ThemeColors = {  
  primary: '#e6e6e5ff', 
  secondary: '#93242fff',
  tertiary: '#6e6e6dff',
  quaternary: '#000000',
  ...baseColors,  
  
};

export const darkTheme: ThemeColors = {
  primary: '#2a2d32',
  secondary: '#ff4b5c',
  tertiary: '#1e2023',
  quaternary: '#FFFFFF',
  ...baseColors, 
};





