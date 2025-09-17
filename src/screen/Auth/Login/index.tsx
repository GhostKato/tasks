import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import AuthHeader from '../components/AuthHeader';
import Input from '../../../components/Input';
import DefaultButton from '../../../components/DefaultButton';
import AuthLayout from '../components/AuthLayout';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { loginUser } from '../../../redux/auth/operations';
import { selectLoading, selectError } from '../../../redux/auth/selectors';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../../../redux/language/selector';
import { selectThemeColors } from '../../../redux/theme/selectors';

type InputValueType = {
  email: string;
  password: string;
  errorEmail?: string;
  errorPassword?: string;
};

export default function LoginPage() {  
  const t = useSelector(selectTranslations);
  const color = useSelector(selectThemeColors);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  const [inputValues, setInputValues] = useState<InputValueType>({
    email: '',
    password: '',
    errorEmail: undefined,
    errorPassword: undefined,
  });

  const handleChangeInput = (key: keyof InputValueType, value: string | undefined) => {
    setInputValues(prev => ({ ...prev, [key]: value }));
  };

  const checkEmail = () => {
    const emailValidator = /^[a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,6}$/;
    if (!emailValidator.test(inputValues.email)) {
      handleChangeInput('errorEmail', 'Not valid email');
    } else {
      handleChangeInput('errorEmail', undefined);
    }
  };

  const checkPassword = (text: string) => {
    if (text.length < 8) {
      handleChangeInput('errorPassword', 'Password must be more than 8 symbols');
    } else {
      handleChangeInput('errorPassword', undefined);
    }
  };

  const onLogin = () => {
    dispatch(loginUser({ email: inputValues.email, password: inputValues.password }));
  };

  const isDisabledLoginBtn = Boolean(
    inputValues.errorEmail ||
      inputValues.errorPassword ||
      !inputValues.email ||
      !inputValues.password ||
      loading
  );

  const styles = StyleSheet.create({    
    formContainer: {marginTop: 28, marginBottom: 68},  
  });

  return (
    <AuthLayout>
      <AuthHeader activeBtn="login" />
      <View style={styles.formContainer}>
        <Input
          onBlur={checkEmail}
          value={inputValues.email}
          onChangeText={text => handleChangeInput('email', text)}
          error={inputValues.errorEmail}
          placeholder={t.screenAuth.placeholderEmail}
        />
        <Input
          placeholder={t.screenAuth.placeholderPassword}
          value={inputValues.password}
          onChangeText={text => {
            handleChangeInput('password', text);
            checkPassword(text);
          }}
          error={inputValues.errorPassword}
          secureTextEntry
        />
      </View>
      <DefaultButton
        onPress={onLogin}
        disabled={isDisabledLoginBtn}
        text={loading ? 'Loading...' : t.screenAuth.logInBtn}
        backgroundColor={color.secondary}
      />
      {error && <Text style={{ color: color.nonary }}>{error}</Text>}
    </AuthLayout>
  );
}
