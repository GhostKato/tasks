import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowIcon } from '../../assets/icons';
import { useSelector } from 'react-redux';
import { selectThemeColors } from '../../redux/theme/selectors';
import { selectTranslations } from '../../redux/language/selector';
import { fonts } from '../../constants/fonts';

type ScreenHeaderProps = {
  title?: string;
  showBack?: boolean;
  backPath?: string;
};

export default function ScreenHeader({ title, showBack=true, backPath }: ScreenHeaderProps) {
  const navigation = useNavigation();
  const route = useRoute();
  const color = useSelector(selectThemeColors);
  const t = useSelector(selectTranslations);

  const screenTitle = title ?? t.namesScreenForHeader?.[route.name as keyof typeof t.namesScreenForHeader] ?? route.name;
  const displayBack = showBack !== undefined ? showBack : navigation.canGoBack();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: color.tertiary
    },
    backBtn: { transform: [{ rotate: '180deg' }] },
    title: {
      fontSize: 18,
      fontFamily: fonts.MontserratSemiBold,
      color: color.senary,
    },
    view: { width: 24 },
  });

  return (
    <View style={styles.container}>
      {displayBack ? (
        <TouchableOpacity
   onPress={() => {
    if (backPath) {
      navigation.navigate(backPath as never);
    } else {
      navigation.goBack();
    }
  }}
  style={styles.backBtn}
>
  <ArrowIcon />
</TouchableOpacity>
      ) : (
        <View />
      )}
      <Text style={styles.title}>{screenTitle}</Text>
      <View style={styles.view} />
    </View>
  );
}
