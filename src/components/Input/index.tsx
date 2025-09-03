import {Text, TextInput, TouchableOpacity, View, ViewStyle} from 'react-native';
import {useAuthStyles} from '../../screen/Auth/useAuthStyles';
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

  const styles = useAuthStyles();

  const { color } = useTheme();

  const [isPassHidden, setIsPassHidden] = useState(secureTextEntry);

  return (
    <>
      <View style={[styles.inputContainer, additionalContainerStyle]}>
        <TextInput
          placeholder={placeholder}
          style={[styles.input, additionInputStyle]}
          placeholderTextColor={color.quaternary}
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
              <ViewPassIcon fill={color.senary} />
            ) : (
              <HidePassIcon fill={color.quinary} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
}