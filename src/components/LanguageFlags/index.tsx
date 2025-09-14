import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../redux/language/slice';
import { selectLanguage } from '../../redux/language/selector';

const languageToISO: Record<string, string> = {
  
  en: 'US', 
  ua: 'UA',
  pl: 'PL',
};

export default function LanguageFlags() {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);

  return (
    <View style={styles.container}>
      {Object.keys(languageToISO).map((lang) => {
        const isActive = language === lang;
        return (
          <TouchableOpacity
            key={lang}
            onPress={() => dispatch(setLanguage(lang as 'ua' | 'en' | 'pl'))}
            style={[styles.flagWrapper, isActive && styles.activeFlag]}
          >
            <CountryFlag isoCode={languageToISO[lang]} size={30} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'  
  },
  flagWrapper: {
      marginHorizontal: 10,
      padding: 10,
    
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeFlag: {
    borderColor: 'red',
  },
});
