import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeSwitcher() {
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
      <Text style={[styles.label, { color: theme.septenary }]}>
        {isDark ? '🌙 Dark Theme Enabled' : '☀️ Dark Theme Disabled'}
      </Text>
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        thumbColor={isDark ? theme.quinary : theme.quaternary}
        trackColor={{ false: theme.octonary, true: theme.septenary }}
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