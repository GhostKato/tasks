import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTranslation } from '../../context/LanguageContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutUser } from '../../redux/auth/operations';
import { selectLoading } from '../../redux/auth/selectors';
import DefaultButton from '../../components/DefaultButton';

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

  return <DefaultButton text={t.logOutBtn} onPress={handleLogout} />;
}
