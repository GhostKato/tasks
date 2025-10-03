import React from 'react';
import { getAuth, signOut } from '@react-native-firebase/auth';
import DefaultButton from '../DefaultButton';
import { useSelector } from 'react-redux';
import { selectThemeColors } from '../../../redux/theme/selectors';
import { useTranslation } from 'react-i18next';

export default function LogoutButton() {
  const { t } = useTranslation('drawer');
  const color = useSelector(selectThemeColors);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (e) {
      console.log('Logout error', e);
    }
  };

  return <DefaultButton text={t('logOutBtn')} onPress={handleLogout} backgroundColor={color.nonary} />;
}
