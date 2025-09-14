import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectThemeColors } from '../../redux/theme/selectors';

interface IDefaultButton {
  disabled?: boolean;
  onPress: () => void;
  text: string;
}
export default function DefaultButton({
  disabled = false,
  onPress,
  text,
}: IDefaultButton) { 
  
  const color = useSelector(selectThemeColors);

  const styles = StyleSheet.create({
  
  BtnContainer: {
    borderRadius: 25,
    backgroundColor: color.secondary,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnText: {
    color: color.octonary,
    },  
});

  return (
    <TouchableOpacity
      style={styles.BtnContainer}
      disabled={disabled}
      onPress={onPress}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
}


