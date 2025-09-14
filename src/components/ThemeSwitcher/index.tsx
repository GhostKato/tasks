import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/theme/slice';
import { selectThemeColors, selectIsDark } from '../../redux/theme/selectors';
import { selectTranslations } from '../../redux/language/selector';

export default function ThemeSwitcher() {
  const dispatch = useDispatch();
  const color = useSelector(selectThemeColors);
  const isDark = useSelector(selectIsDark);
  const t = useSelector(selectTranslations);

  return (
    <View style={[styles.container, { backgroundColor: color.tertiary }]}>
      <Text style={[styles.label, { color: color.quaternary }]}>
        {isDark ? `🌙 ${t.screenTheme.darkModeEnabled}` : `☀️ ${t.screenTheme.darkModeDisabled}`}
      </Text>
     <Switch
  value={isDark}
  onValueChange={(_value) => { dispatch(toggleTheme()); }}
  thumbColor={isDark ? color.senary : color.quinary}
  trackColor={{ false: color.octonary, true: color.septenary }}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
  },
});
