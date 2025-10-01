import { StyleSheet, View, Text } from 'react-native';
import ThemeSwitch from '../../../components/ThemeSwitch';
import { useSelector } from 'react-redux';
import LanguageSwitch from '../../../components/LanguageSwitch';
import { selectThemeColors } from '../../../redux/theme/selectors';
import { fonts } from '../../../constants/fonts';
import { useTranslation } from 'react-i18next';

export default function MainSettings() {
  const color = useSelector(selectThemeColors);
  const { t } = useTranslation();

  const styles = StyleSheet.create({    
    contentWrapper: {
      padding: 20,
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
      borderWidth: 2,
      borderColor: color.secondary,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderTopRightRadius: 20,
      minHeight: 200,
    },
    title: {
      color: color.senary,
      fontFamily:fonts.MontserratExtraBold,
    },    
  });

  return (    
    <View style={styles.contentWrapper}>
      <Text style={styles.title}>{t('drawer.main.theme')}</Text>
      <ThemeSwitch />
      <Text style={styles.title}>{t('drawer.main.language')}</Text>
        <LanguageSwitch />
      </View>    
  );
}






