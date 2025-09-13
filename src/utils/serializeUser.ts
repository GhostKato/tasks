import { User } from 'firebase/auth';

// Тип для Redux
export interface SerializedUser {
  uid: string;
  email: string | null;  
}

// Хелпер для серіалізації користувача
export const serializeUser = (user: User | null): SerializedUser | null => {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,    
  };
};
