import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface SerializedUser {
  uid: string;
  email: string | null;  
}

export const serializeUser = (user: FirebaseAuthTypes.User | null): SerializedUser | null => {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
  };
};
