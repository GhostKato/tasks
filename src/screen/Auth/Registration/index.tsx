import AuthLayout from '../components/AuthLayout/index';
import AuthHeader from '../components/AuthHeader/index';
import { useAuthStyles } from '../useAuthStyles';
import { View } from 'react-native';
import Input from '../../../components/Input';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import { RegistrationSchema } from '../utils/validations';
import DefaultButton from '../../../components/DefaultButton/index';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import { CommonActions, useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackNavigation } from '../../../navigation/types';
import { ScreenNames } from '../../../constants/screenNames';
import { useTranslation } from '../../../context/LanguageContext';

type InputValueType = {
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
};

export default function Registration() {
  const styles = useAuthStyles();
  const { t } = useTranslation();

  const [touched, setTouched] = useState<InputValueType>({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();

  const registrateUser = async (
    email: string,
    password: string,
    formikHelpers: FormikHelpers<FormikValues>,
  ) => {
    try {
      const auth = getAuth();
      const result = await createUserWithEmailAndPassword(auth, email, password);

      console.log('result', result);

      if (result.user) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: ScreenNames.LOGGED_IN_STACK }],
          }),
        );
      }
    } catch (e: any) {
      console.log('e', e);
      if (e.code === 'auth/email-already-in-use') {
        formikHelpers.setErrors({ email: 'email-already-in-use' });
      }
    }
  };

  return (
    <AuthLayout>
      <AuthHeader activeTab={'registration'} />
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(value, formikHelpers) => {
          void registrateUser(value.email, value.password, formikHelpers);
        }}
        validationSchema={RegistrationSchema()}
      >
        {({
          values,
          setFieldValue,
          handleSubmit,
          isValid,
          errors,
        }: FormikValues) => (
          <>
            <View style={styles.formContainer}>
              <Input
                onFocus={() =>
                  setTouched(prevState => ({ ...prevState, email: true }))
                }
                value={values.email}
                onChangeText={value => {
                  setFieldValue('email', value);
                }}
                placeholder={t.screenAuth.placeholderEmail}
                error={touched.email && errors.email}
              />
              <Input
                onFocus={() =>
                  setTouched(prevState => ({ ...prevState, password: true }))
                }
                value={values.password}
                onChangeText={value => {
                  setFieldValue('password', value);
                }}
                secureTextEntry={true}
                placeholder={t.screenAuth.placeholderPassword}
                error={touched.password && errors.password}
              />
              <Input
                onFocus={() =>
                  setTouched(prevState => ({
                    ...prevState,
                    confirmPassword: true,
                  }))
                }
                value={values.confirmPassword}
                onChangeText={value => {
                  setFieldValue('confirmPassword', value);
                }}
                secureTextEntry={true}
                placeholder={t.screenAuth.placeholderConfirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
              />
            </View>
            <DefaultButton
              disabled={
                !isValid ||
                !values.email ||
                !values.password ||
                !values.confirmPassword
              }
              onPress={handleSubmit}
              text={t.screenAuth.registerBtn}
            />
          </>
        )}
      </Formik>
    </AuthLayout>
  );
}
