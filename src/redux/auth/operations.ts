import { AppDispatch } from '../store';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { setUser, setLoading, setError, logout} from './slice';
import { serializeUser } from '../../utils/serializeUser';

// Логін
export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
  const auth = getAuth();
  try {
    dispatch(setLoading(true));
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = serializeUser(result.user);
    console.log('SERIALIZED USER:', user);
    console.log('USER:', result.user);
    dispatch(setUser(user));
  } catch (e: any) {
    dispatch(setError(e.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Реєстрація
export const registerUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
  const auth = getAuth();
  try {
    dispatch(setLoading(true));
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = serializeUser(result.user);
    console.log('SERIALIZED USER:', user);
    console.log('USER:', result.user);
    dispatch(setUser(user));
  } catch (e: any) {
    dispatch(setError(e.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Вихід
export const logoutUser = () => async (dispatch: AppDispatch) => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (e: any) {
    console.warn('SignOut failed:', e.message);
  } finally {
    dispatch(logout()); // очистка Redux завжди
  }
};

