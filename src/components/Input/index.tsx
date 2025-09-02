import {Text, TextInput, TouchableOpacity, View, ViewStyle} from 'react-native';
import styles from '../../screen/Auth/styles';
import React, {useState} from 'react';
import {HidePassIcon, ViewPassIcon} from '../../assets/icons';
import { useTheme } from '../../context/ThemeContext';

interface IInput {
  onBlur?: () => void;
  value: string;
  onChangeText: (text: string) => void;
  placeholderColor?: string;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  additionalContainerStyle?: ViewStyle;
  additionInputStyle?: ViewStyle;
  onFocus?: () => void;
}
export default function Input({
  onBlur,
  placeholder,
  value,
  onChangeText,  
  error,
  secureTextEntry = false,
  additionalContainerStyle,
  additionInputStyle,
  onFocus,
}: IInput) {

  const { theme } = useTheme();

  const [isPassHidden, setIsPassHidden] = useState(secureTextEntry);

  return (
    <>
      <View style={[styles.inputContainer, additionalContainerStyle]}>
        <TextInput
          placeholder={placeholder}
          style={[styles.input, additionInputStyle]}
          placeholderTextColor={theme.octonary}
          onBlur={onBlur}
          onFocus={onFocus}
          value={value}
          onChangeText={text => onChangeText(text)}
          secureTextEntry={isPassHidden}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => {
              setIsPassHidden(!isPassHidden);
            }}
            hitSlop={{top: 15, bottom: 15, right: 15, left: 15}}>
            {isPassHidden ? (
              <ViewPassIcon fill={'#000000'} />
            ) : (
              <HidePassIcon fill={'#a36161'} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {!!error && <Text>{error}</Text>}
    </>
  );
}