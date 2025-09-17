import React from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeColors } from '../../redux/theme/selectors';

interface SwitchButtonProps {
  isActive: boolean;  
  payload: any;
  action: (payload: any) => any;         
}

export default function DefaultSwitch({ isActive, action, payload}: SwitchButtonProps) {
  const dispatch = useDispatch();
  const color = useSelector(selectThemeColors);

  const styles = StyleSheet.create({
  switchContainer: {
    width: 60,
    height: 30,
    borderRadius: 30,
    padding: 2,
    justifyContent: 'center',
    backgroundColor: color.primary
  },
  thumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});

  return (
    <TouchableOpacity
      style={ styles.switchContainer }
      onPress={() => dispatch(action(payload))}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            backgroundColor: isActive ? color.octonary : color.nonary,
            transform: [{ translateX: isActive ? 28 : 0 }],
          },
        ]}
      />
    </TouchableOpacity>
  );
}


