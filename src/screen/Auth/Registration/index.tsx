import AuthLayout from '../components/AuthLayout';
import AuthHeader from '../components/AuthHeader';
import { View, Text, StyleSheet } from 'react-native';
import Input from '../../../components/Input';
import { Formik } from 'formik';
import { RegistrationSchema } from '../validations/registrationSchema';
import DefaultButton from '../../../components/buttons/DefaultButton';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { registerUser } from '../../../redux/auth/operations';
import { selectAuthLoading, selectAuthError } from '../../../redux/auth/selectors';
import { useSelector } from 'react-redux';
import { selectThemeColors } from '../../../redux/theme/selectors';
import { useTranslation } from 'react-i18next';

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

  const styles = StyleSheet.create({
    formContainer: {
      marginTop: 28,
      marginBottom: 68
    },
    error: {
      color: color.nonary,
      marginTop: 8
    }
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
        validationSchema={RegistrationSchema()}
        onSubmit={values => {
          dispatch(registerUser({ email: values.email, password: values.password }));
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
                secureTextEntry
                placeholder={t('placeholderPassword')}
                error={touched.password ? errors.password : undefined}
              />
              <Input
                onFocus={() => setFieldTouched('confirmPassword', true)}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                secureTextEntry
                placeholder={t('placeholderConfirmPassword')}
                error={touched.confirmPassword ? errors.confirmPassword : undefined}
              />
            </View>

            <DefaultButton
              onPress={handleSubmit}
              disabled={!isValid || loading}
              text={loading ? 'Loading...' : t('registerBtn')}
              backgroundColor={color.secondary}
            />

            {error && <Text style={styles.error}>{error}</Text>}
          </>
        )}
      </Formik>
    </AuthLayout>
  );
}
