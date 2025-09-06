import {Text, TouchableOpacity, View} from 'react-native';
import {useAuthStyles} from '../../useAuthStyles';
import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {ScreenNames} from '../../../../constants/screenNames';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoggedOutStackType} from '../../../../navigation/types';
import { useTranslation } from '../../../../context/LanguageContext';

interface IAuthHeader {
  activeBtn: 'login' | 'registration';
}

export default function AuthHeader({ activeBtn }: IAuthHeader) {

  const styles = useAuthStyles();
  const { t } = useTranslation();

  const navigation = useNavigation<StackNavigationProp<LoggedOutStackType>>();
  const navigateToLogin = () => {
    navigation.navigate(ScreenNames.LOGIN_PAGE);
  };
  const navigateToRegistration = () => {
    navigation.navigate(ScreenNames.REGISTRATION_PAGE);
  };
  return (
    <>
      <View style={[styles.headerTitleCont]}>
        <Text style={styles.headerTitle}>{t.screenAuth.title}</Text>
        <Text style={styles.headerText}>
          {t.screenAuth.text}
        </Text>
      </View>
      <View style={styles.headerBtnCont}>
        <TouchableOpacity
          onPress={navigateToLogin}
          style={activeBtn === 'login' ? styles.headerBtnActive : styles.headerBtnDisabled}>
          <Text style={activeBtn === 'login' ? styles.headerBtnTextActive : styles.headerBtnTextDisabled}>{t.screenAuth.loginizationBtn}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToRegistration}
          style={activeBtn === 'registration' ? styles.headerBtnActive : styles.headerBtnDisabled
          }>
          <Text style={activeBtn === 'registration' ? styles.headerBtnTextActive : styles.headerBtnTextDisabled}>{t.screenAuth.registrationBtn}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}