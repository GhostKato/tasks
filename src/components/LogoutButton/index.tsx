import React from 'react';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { useTranslation } from '../../context/LanguageContext';
import DefaultButton from '../DefaultButton';

export default function LogoutButton() {
  const { t } = useTranslation();  

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (e) {
      console.log('Logout error', e);
    }
  };

  return <DefaultButton text={t.logOutBtn} onPress={handleLogout} />;
}
