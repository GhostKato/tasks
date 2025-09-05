import { View } from 'react-native';
import React, { useState } from 'react';
import { useAuthStyles } from '../useAuthStyles';
import AuthHeader from '../components/AuthHeader/index';
import Input from '../../../components/Input/index';
import DefaultButton from '../../../components/DefaultButton/index';
import AuthLayout from '../components/AuthLayout/index';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { useTranslation } from '../../../context/LanguageContext';

type InputValueType = {
  email: string;
  password: string;
  errorEmail?: string;      
  errorPassword?: string;  
}

export default function LoginPage() {
  const styles = useAuthStyles();
  const { t } = useTranslation();

  const [inputValues, setInputValues] = useState<InputValueType>({
    email: '',
    password: '',
    errorEmail: undefined,
    errorPassword: undefined,
  });

  const handleChangeInput = (
    key: keyof InputValueType,
    value: string | undefined,
  ) => {
    setInputValues(prevState => ({ ...prevState, [key]: value }));
  };

  const checkEmail = () => {
    const emailValidator = new RegExp(
      '^([a-z0-9._%-]+@[a-z0-9.-]+\\.[a-z]{2,6})*$',
    );
    if (!emailValidator.test(inputValues.email)) {
      handleChangeInput('errorEmail', 'Not valid email');
    } else {
      handleChangeInput('errorEmail', undefined);
    }
  };

  const checkPassword = (text: string) => {
    if (text.length < 8) {
      handleChangeInput(
        'errorPassword',
        'Password must be more than 8 symbols',
      );
    } else {
      handleChangeInput('errorPassword', undefined);
    }
  };

  const onLogin = async (email: string, password: string) => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      console.log('Login error', e);
      if (e.code === 'auth/user-not-found') {
        handleChangeInput('errorEmail', 'User not found');
      }
      if (e.code === 'auth/wrong-password') {
        handleChangeInput('errorPassword', 'Wrong password');
      }
    }
  };

  const isDisabledLoginBtn = Boolean(
    inputValues.errorEmail ||
      inputValues.errorPassword ||
      !inputValues.email ||
      !inputValues.password,
  );

  return (
    <AuthLayout>
      <AuthHeader activeTab={'login'} />
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
          secureTextEntry={true}
        />
      </View>
      <DefaultButton
        onPress={() => {
          void onLogin(inputValues.email, inputValues.password);
        }}
        disabled={isDisabledLoginBtn}
        text={t.screenAuth.logInBtn}
      />
    </AuthLayout>
  );
}
