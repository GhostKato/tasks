import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ReactNode } from 'react';

type MyWrapperProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: MyWrapperProps) { 
    
  const styles = StyleSheet.create({
    mainWrapper: {
      margin: 20,
      flex: 1,
      justifyContent: 'center',
      },
    
  });
  
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>      
      <View style={[styles.mainWrapper]}>       
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.select({android: 20, ios: 90})}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {children}
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}