import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';
import { serializeUser, SerializedUser } from '../../utils/serializeUser';

export const loginUser = createAsyncThunk<
  SerializedUser,
  { email: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const auth = getAuth();
    const result = await signInWithEmailAndPassword(auth, email, password);

    const user = serializeUser(result.user);
    if (!user) {
      return rejectWithValue('User data is null after login');
    }
    return user;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const registerUser = createAsyncThunk<
  SerializedUser,
  { email: string; password: string },
  { rejectValue: string }
>('auth/registerUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const auth = getAuth();
    const result = await createUserWithEmailAndPassword(auth, email, password);

    const user = serializeUser(result.user);
    if (!user) {
      return rejectWithValue('User data is null after registration');
    }
    return user;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      await signOut(auth);
      return true;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);
