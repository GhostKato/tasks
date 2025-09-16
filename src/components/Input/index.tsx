import { Platform, StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import { HidePassIcon, ViewPassIcon } from '../../assets/icons';
import { useSelector } from 'react-redux';
import { selectThemeColors } from '../../redux/theme/selectors';
import { fonts } from '../../constants/fonts';

interface IInput {
  onBlur?: () => void;
  onFocus?: () => void;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  placeholderColor?: string;
  error?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  textAlignVertical?: 'auto' | 'top' | 'center' | 'bottom';
  additionalContainerStyle?: ViewStyle;
  additionInputStyle?: TextStyle;       
}

export default function Input({
  onBlur,
  onFocus,
  value,
  onChangeText,
  placeholder,
  placeholderColor,
  error,
  secureTextEntry = false,
  multiline = false,
  textAlignVertical = 'auto',
  additionalContainerStyle,
  additionInputStyle,
}: IInput) {
  
  const color = useSelector(selectThemeColors);
  const [isPassHidden, setIsPassHidden] = useState(secureTextEntry);

  const styles = StyleSheet.create({  
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
    input: {
      padding: 0,
      flex: 1,
      color: color.quaternary,
      fontFamily: fonts.MontserratRegular,
      },  
    
    errorText: {
      color: color.nonary,
    },
  });

  return (
    <>
      <View style={[styles.inputContainer, additionalContainerStyle]}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderColor || color.quaternary}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          onFocus={onFocus}
          secureTextEntry={isPassHidden}
          multiline={multiline}
          textAlignVertical={textAlignVertical}
          style={[styles.input, additionInputStyle, multiline && { minHeight: 100 }]} 
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPassHidden(!isPassHidden)}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            {isPassHidden ? <ViewPassIcon fill={color.quinary} /> : <HidePassIcon fill={color.quinary} />}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
}
      
      