import {StyleSheet, Platform} from 'react-native';
import {fonts} from '../../constants/fonts';
import {useTheme} from '../../context/ThemeContext';

export const useAuthStyles = () => {
  const {color} = useTheme();

  return StyleSheet.create({
  mainWrapper: {
    margin: 20,
    flex: 1,
    justifyContent: 'center',
    },
  headerTitleCont: {
    gap: 4,
  },
  headerTitle: {
    fontSize: 24,
    color: color.quaternary,
    fontFamily: fonts.ComfortaaRegular,
  },
  headerText: {
    fontSize: 16,
    color: color.quaternary,
    fontFamily: fonts.MontserratRegular,
  },
  headerBtnCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color.secondary,
    padding: 4,
    borderRadius: 20,
    marginTop: 32,
  },
  headerBtnActive: {
    alignItems: 'center',
    backgroundColor: color.primary,
    padding: 10,
    borderRadius: 20,  
    flex: 1,
  },  
  headerBtnDisabled: {
    alignItems: 'center',    
    padding: 10,
    borderRadius: 20,
    flex: 1,    
    },
  headerBtnTextActive: {
    color: color.quinary,    
    fontSize: 14,
    fontFamily: fonts.MontserratRegular,
    },
  headerBtnTextDisabled: {    
    color: color.octonary,
    fontSize: 14,
    fontFamily: fonts.MontserratRegular,
  },    

  inputContainer: {
    borderWidth: 1,
    borderRadius: 25,
    marginVertical: 4,
    paddingHorizontal: 24,
    borderColor: color.quaternary,
    paddingVertical: Platform.select({
      android: 12,
      ios: 14,
      default: 12,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },  
  
  formContainer: {marginTop: 28, marginBottom: 68},
  input: {
    padding: 0,
    flex: 1,
    color: color.quaternary,
    fontFamily: fonts.MontserratRegular,
  },
  BtnContainer: {
    borderRadius: 25,
    backgroundColor: color.secondary,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnText: {
    color: color.octonary,
    },
  errorText: {
    color: color.quinary,
  },
});
};
