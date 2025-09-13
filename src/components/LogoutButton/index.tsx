import React from 'react';
import { Button } from 'react-native';
import { useTranslation } from '../../context/LanguageContext';
import { useAppDispatch } from '../../redux/hooks';
import { logoutUser } from '../../redux/auth/operations';


export default function LogoutButton() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();  

  const handleLogout = async () => {    

    dispatch(logoutUser()); 
    
  };

  return <Button title={t.logOutBtn} onPress={handleLogout} />;
}
