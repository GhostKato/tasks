import React from 'react';
import { Button, ActivityIndicator, View } from 'react-native';
import { useTranslation } from '../../context/LanguageContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutUser } from '../../redux/auth/operations';
import { selectLoading } from '../../redux/auth/selectors';

export default function LogoutButton() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (loading) {
    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  return <Button title={t.logOutBtn} onPress={handleLogout} />;
}
