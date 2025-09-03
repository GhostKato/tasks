import React from 'react';
import { Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useTranslation } from '../../context/LanguageContext';

export default function LogoutButton() {

    const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await auth().signOut();
      
    } catch (e) {
      console.log('Logout error', e);
    }
  };

    return <Button title={t.logOutBtn} onPress={handleLogout} />;
}
