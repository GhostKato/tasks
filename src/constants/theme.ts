export type ThemeColors = {
  backgroundPrimary: string;
  backgroundSecondary: string;
  backgroundTertiary: string,
  backgroundQuaternary: string,  
  textPrimary: string;
  textSecondary: string,
  textTertiary: string,  
  accentPrimary: string,
  accentSecondary: string,  
};

export const lightTheme: ThemeColors = {
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#8f968eff',
  backgroundTertiary: '#852630ff',
  backgroundQuaternary: '#000000',
  
  textPrimary: '#000000',
  textSecondary: '#838383',
  textTertiary: '#ff4b5c',
  
  accentPrimary: '#8d3333',
  accentSecondary: '#44e70eff',
};

export const darkTheme: ThemeColors = {
  backgroundPrimary: '#2a2d32',
  backgroundSecondary: '#1e2023',
  backgroundTertiary: '#ff4b5c',
  backgroundQuaternary: '#000000',
  
  textPrimary: '#FFFFFF',
  textSecondary: '#838383',
  textTertiary: '#8d3333',
  
  accentPrimary: '#8d3333',  
  accentSecondary: '#44e70eff',
};
