import React from 'react';
import { getAuth, signOut } from '@react-native-firebase/auth';
import DefaultButton from '../DefaultButton';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../../redux/language/selector';
import { selectThemeColors } from '../../redux/theme/selectors';

export default function LogoutButton() {
  const t = useSelector(selectTranslations);
  const color = useSelector(selectThemeColors);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (e) {
      console.log('Logout error', e);
    }
  };

  return <DefaultButton text={t.drawer.logOutBtn} onPress={handleLogout} backgroundColor={color.nonary} />;
}
