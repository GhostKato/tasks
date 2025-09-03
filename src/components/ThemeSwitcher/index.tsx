import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from '../../context/LanguageContext';

export default function ThemeSwitcher() {
  const { isDark, toggleTheme, color } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { backgroundColor: color.tertiary }]}>
      <Text style={[styles.label, { color: color.quaternary }]}>
        {isDark ? `🌙 ${t.screenTheme.darkModeEnabled}` : `☀️ ${t.screenTheme.darkModeDisabled}`}
      </Text>
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
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