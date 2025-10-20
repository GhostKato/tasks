import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import AuthHeader from '../components/AuthHeader';
import Input from '../../../components/Input';
import DefaultButton from '../../../components/buttons/DefaultButton';
import AuthLayout from '../components/AuthLayout';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { loginUser } from '../../../redux/auth/operations';
import { selectAuthLoading, selectAuthError } from '../../../redux/auth/selectors';
import { useSelector } from 'react-redux';
import { selectThemeColors } from '../../../redux/theme/selectors';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { LoginSchema } from '../validations/loginSchema';

export default function LoginPage() {
  const { t } = useTranslation('screenAuth');
  const color = useSelector(selectThemeColors);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const styles = StyleSheet.create({
    formContainer: {
      marginTop: 28,
      marginBottom: 68,
    },
    error: {
      color: color.nonary,
      marginTop: 8,      
    }
  });

  return (
    <AuthLayout>
      <AuthHeader activeBtn="login" />
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={values => {
          dispatch(loginUser({ email: values.email, password: values.password }));
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched, setFieldTouched, isValid }) => (
          <>
            <View style={styles.formContainer}>
              <Input
                onFocus={() => setFieldTouched('email', true)}
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder={t('placeholderEmail')}
                error={touched.email ? errors.email : undefined}
              />
              <Input
                onFocus={() => setFieldTouched('password', true)}
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder={t('placeholderPassword')}
                secureTextEntry
                error={touched.password ? errors.password : undefined}
              />
            </View>            

            <DefaultButton
              onPress={handleSubmit}
              disabled={!isValid || loading}
              text={loading ? 'Loading...' : t('logInBtn')}
              backgroundColor={color.secondary}
            />

            {error && <Text style={styles.error}>{error}</Text>}
          </>
        )}
      </Formik>
    </AuthLayout>
  );
}
