import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeSwitcher() {
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.text }]}>
        {isDark ? '🌙 Темна тема' : '☀️ Світла тема'}
      </Text>
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        thumbColor={isDark ? theme.primary : '#f4f3f4'}
        trackColor={{ false: '#767577', true: theme.secondary }}
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