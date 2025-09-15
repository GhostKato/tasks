import { Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useAuthStyles } from '../../screen/Auth/useAuthStyles';
import React, { useState } from 'react';
import { HidePassIcon, ViewPassIcon } from '../../assets/icons';
import { useSelector } from 'react-redux';
import { selectThemeColors } from '../../redux/theme/selectors';

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
  const styles = useAuthStyles();
  const color = useSelector(selectThemeColors);
  const [isPassHidden, setIsPassHidden] = useState(secureTextEntry);

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
            {isPassHidden ? <ViewPassIcon fill={color.tertiary} /> : <HidePassIcon fill={color.tertiary} />}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
}
