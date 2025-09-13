import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { serializeUser, SerializedUser } from '../../utils/serializeUser';

// Логін
export const loginUser = createAsyncThunk<
  SerializedUser,
  { email: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  const auth = getAuth();
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = serializeUser(result.user);

    console.log('LOGIN: serialized user ->', user);
    if (!user) {
      return rejectWithValue('User data is null after login');
    }

    return user;
  } catch (e: any) {
    console.log('LOGIN ERROR:', e.message);
    return rejectWithValue(e.message);
  }
});

// Реєстрація
export const registerUser = createAsyncThunk<
  SerializedUser,
  { email: string; password: string },
  { rejectValue: string }
>('auth/registerUser', async ({ email, password }, { rejectWithValue }) => {
  const auth = getAuth();
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = serializeUser(result.user);

    console.log('REGISTER: serialized user ->', user);
    if (!user) {
      return rejectWithValue('User data is null after registration');
    }

    return user;
  } catch (e: any) {
    console.log('REGISTER ERROR:', e.message);
    return rejectWithValue(e.message);
  }
});

// Вихід
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  const auth = getAuth();
  try {
    await signOut(auth);
    console.log('LOGOUT: success');
    return true;
  } catch (e: any) {
    console.log('LOGOUT ERROR:', e.message);
    return rejectWithValue(e.message);
  }
});
