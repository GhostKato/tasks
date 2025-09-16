import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../redux/language/slice';
import { selectLanguage } from '../../redux/language/selector';
import { selectThemeColors } from '../../redux/theme/selectors';

const languageToISO: Record<string, string> = {  
  en: 'US', 
  ua: 'UA',
  pl: 'PL',
};

export default function LanguageSwitch() {
  const dispatch = useDispatch();

  const language = useSelector(selectLanguage);
  const color = useSelector(selectThemeColors);

  const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',    
  },
  flagWrapper: {    
    padding: 10,    
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeFlag: {
    borderColor: color.secondary,
  },
});

  return (
    <View style={styles.container}>      
      {Object.keys(languageToISO).map((lang) => {
  const isActive = language === lang;
  return (
    <View key={lang}>
      <TouchableOpacity
        onPress={() => dispatch(setLanguage(lang as 'ua' | 'en' | 'pl'))}
        style={[styles.flagWrapper, isActive && styles.activeFlag]}
      >
        <CountryFlag isoCode={languageToISO[lang]} size={40} />
      </TouchableOpacity>
    </View>
  );
})}

    </View>
  );
}


