import React from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/theme/slice';
import { selectIsDark, selectThemeColors } from '../../redux/theme/selectors';

export default function ThemeSwitch() {
  const dispatch = useDispatch();
  const isDark = useSelector(selectIsDark);
  const color = useSelector(selectThemeColors);

  const styles = StyleSheet.create({  
  switchContainer: {
    width: 85,
    height: 50,
    borderRadius: 30,
    padding: 2,
    justifyContent: 'center',
    backgroundColor: color.tertiary,
  },
  thumb: {
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 16,
  },
});

  return (          
      <TouchableOpacity style={styles.switchContainer}
        onPress={() => dispatch(toggleTheme())}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              backgroundColor: isDark ? color.undecimary : color.duodenary,
              transform: [{ translateX: isDark ? 40 : 5 }],
            },
          ]}
        >
          <Animated.Text style={styles.icon}>{isDark ? '🌙' : '☀️'}</Animated.Text>
        </Animated.View>
      </TouchableOpacity>    
  );
}


