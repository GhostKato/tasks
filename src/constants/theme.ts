export type ThemeColors = {
  primary: string;
  secondary: string;
  tertiary: string,
  quaternary: string,  
  quinary: string;
  senary: string,
  septenary: string,  
  octonary: string,
  nonary: string,
  denary: string,
  undecimary: string,
  duodenary: string
};

const baseColors = { 
  quinary: '#000000',
  senary: '#FFFFFF',
  septenary: '#8f968eff',
  octonary: '#40ff00ff',
  nonary: '#ff0000ff',
  denary: '#f6e607ff',
  undecimary: '#0c0643ff',
  duodenary: '#0e85e7ff'
};

export const lightTheme: ThemeColors = {  
  primary: '#ffffffff', 
  secondary: '#008577',
  tertiary: '#6e6e6dff',
  quaternary: '#000000',
  ...baseColors,  
  
};

export const darkTheme: ThemeColors = {
  primary: '#2a2d32',
  secondary: '#008577',
  tertiary: '#1e2023',
  quaternary: '#FFFFFF',
  ...baseColors, 
};





