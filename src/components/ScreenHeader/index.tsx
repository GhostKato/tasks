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

export default function ScreenHeader({ title, showBack, backPath }: ScreenHeaderProps) {
  const navigation = useNavigation();
  const route = useRoute();
  const color = useSelector(selectThemeColors);
  const t = useSelector(selectTranslations);
  
  const screenTitle = title ?? t.screenNames?.[route.name as keyof typeof t.screenNames] ?? route.name;  
  const displayBack = showBack !== undefined ? showBack : navigation.canGoBack();

  return (
    <View style={[styles.container, { backgroundColor: color.tertiary }]}>
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
          <ArrowIcon width={20} height={20} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} />
      )}

      <Text style={[styles.title, { color: color.quaternary }]}>
        {screenTitle}
      </Text>

      <View style={{ width: 24 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  backBtn: {
    transform: [{ rotate: '180deg' }],
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.MontserratSemiBold,
  },
});
