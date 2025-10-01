import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {ScreenNames} from '../../../../constants/screenNames';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoggedOutStackType} from '../../../../navigation/types';
import { useSelector } from 'react-redux';
import { fonts } from '../../../../constants/fonts';
import { selectThemeColors } from '../../../../redux/theme/selectors';
import { useTranslation } from 'react-i18next';

interface IAuthHeader {
  activeBtn: 'login' | 'registration';
}

export default function AuthHeader({ activeBtn }: IAuthHeader) {
  
  const { t } = useTranslation();
  const color = useSelector(selectThemeColors);

  const navigation = useNavigation<StackNavigationProp<LoggedOutStackType>>();
  const navigateToLogin = () => {
    navigation.navigate(ScreenNames.LOGIN_PAGE);
  };
  const navigateToRegistration = () => {
    navigation.navigate(ScreenNames.REGISTRATION_PAGE);
  };

const styles = StyleSheet.create({  
  headerTitleCont: {
    gap: 4,
  },
  headerTitle: {
    fontSize: 24,
    color: color.quaternary,
    fontFamily: fonts.ComfortaaRegular,
  },
  headerText: {
    fontSize: 16,
    color: color.quaternary,
    fontFamily: fonts.MontserratRegular,
  },
  headerBtnCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color.secondary,
    padding: 4,
    borderRadius: 20,
    marginTop: 32,
  },
  headerBtnActive: {
    alignItems: 'center',
    backgroundColor: color.primary,
    padding: 10,
    borderRadius: 20,  
    flex: 1,
  },  
  headerBtnDisabled: {
    alignItems: 'center',    
    padding: 10,
    borderRadius: 20,
    flex: 1,    
    },
  headerBtnTextActive: {
    color: color.secondary,    
    fontSize: 14,
    fontFamily: fonts.MontserratRegular,
    },
  headerBtnTextDisabled: {    
    color: color.senary,
    fontSize: 14,
    fontFamily: fonts.MontserratRegular,
  },   
});

  return (
    <>
      <View style={[styles.headerTitleCont]}>
        <Text style={styles.headerTitle}>{t('screenAuth.title')}</Text>
        <Text style={styles.headerText}>
          {t('screenAuth.text')}
        </Text>
      </View>
      <View style={styles.headerBtnCont}>
        <TouchableOpacity
          onPress={navigateToLogin}
          style={activeBtn === 'login' ? styles.headerBtnActive : styles.headerBtnDisabled}>
          <Text style={activeBtn === 'login' ? styles.headerBtnTextActive : styles.headerBtnTextDisabled}>{t('screenAuth.loginizationBtn')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToRegistration}
          style={activeBtn === 'registration' ? styles.headerBtnActive : styles.headerBtnDisabled
          }>
          <Text style={activeBtn === 'registration' ? styles.headerBtnTextActive : styles.headerBtnTextDisabled}>{t('screenAuth.registrationBtn')}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}