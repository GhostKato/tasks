import AuthLayout from '../components/AuthLayout/index';
import AuthHeader from '../components/AuthHeader/index';
import { View, Text, StyleSheet } from 'react-native';
import Input from '../../../components/Input';
import { Formik } from 'formik';
import { RegistrationSchema } from '../utils/validations';
import DefaultButton from '../../../components/DefaultButton/index';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { registerUser } from '../../../redux/auth/operations';
import { selectAuthLoading, selectAuthError } from '../../../redux/auth/selectors';
import { useSelector } from 'react-redux';
import { selectThemeColors } from '../../../redux/theme/selectors';
import { useTranslation } from 'react-i18next';

type InputTouchedType = {
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
};

type RegistrationValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Registration() {  
  const { t } = useTranslation('screenAuth');
  const color = useSelector(selectThemeColors);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const [touched, setTouched] = useState<InputTouchedType>({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const styles = StyleSheet.create({    
      formContainer: {marginTop: 28, marginBottom: 68},  
    });

  return (
    <AuthLayout>
      <AuthHeader activeBtn="registration" />
      <Formik<RegistrationValues>
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={values => {
          dispatch(registerUser({ email: values.email, password: values.password }));
        }}
        validationSchema={RegistrationSchema()}
      >
        {({ values, setFieldValue, handleSubmit, isValid, errors }) => (
          <>
            <View style={styles.formContainer}>
              <Input
                onFocus={() => setTouched(prev => ({ ...prev, email: true }))}
                value={values.email}
                onChangeText={value => setFieldValue('email', value)}
                placeholder={t('placeholderEmail')}
                error={touched.email ? errors.email : undefined}
              />
              <Input
                onFocus={() => setTouched(prev => ({ ...prev, password: true }))}
                value={values.password}
                onChangeText={value => setFieldValue('password', value)}
                secureTextEntry
                placeholder={t('placeholderPassword')}
                error={touched.password ? errors.password : undefined}
              />
              <Input
                onFocus={() => setTouched(prev => ({ ...prev, confirmPassword: true }))}
                value={values.confirmPassword}
                onChangeText={value => setFieldValue('confirmPassword', value)}
                secureTextEntry
                placeholder={t('placeholderConfirmPassword')}
                error={touched.confirmPassword ? errors.confirmPassword : undefined}
              />
            </View>
            <DefaultButton
              onPress={handleSubmit}
              disabled={
                !isValid ||
                !values.email ||
                !values.password ||
                !values.confirmPassword ||
                loading
              }
              text={loading ? 'Loading...' : t('registerBtn')}
              backgroundColor={color.secondary}
            />
            {error && <Text style={{ color: color.nonary }}>{error}</Text>}
          </>
        )}
      </Formik>
    </AuthLayout>
  );
}
