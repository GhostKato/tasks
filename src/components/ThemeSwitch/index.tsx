import React from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/theme/slice';
import { selectIsDark, selectThemeColors } from '../../redux/theme/selectors';

export default function ThemeSwitch() {
  const dispatch = useDispatch();
  const isDark = useSelector(selectIsDark);
  const color = useSelector(selectThemeColors);

  return (          
      <TouchableOpacity
        style={[
          styles.switchContainer,
          { backgroundColor: isDark ? color.septenary : color.octonary },
        ]}
        onPress={() => dispatch(toggleTheme())}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              backgroundColor: isDark ? color.senary : color.quinary,
              transform: [{ translateX: isDark ? 28 : 0 }],
            },
          ]}
        >
          <Animated.Text style={styles.icon}>{isDark ? '🌙' : '☀️'}</Animated.Text>
        </Animated.View>
      </TouchableOpacity>    
  );
}

const styles = StyleSheet.create({  
  switchContainer: {
    width: 60,
    height: 30,
    borderRadius: 30,
    padding: 2,
    justifyContent: 'center',    
  },
  thumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 16,
  },
});
