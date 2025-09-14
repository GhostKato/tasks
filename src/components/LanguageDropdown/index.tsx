import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../redux/language/slice';
import { selectLanguage } from '../../redux/language/selector';

export default function LanguageDropdown() {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={language}
        onValueChange={(value) => dispatch(setLanguage(value))}
        style={styles.picker}
      >
        <Picker.Item label="Українська" value="ua" />
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Polski" value="pl" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    margin: 10,
  },
  picker: {
    height: 50,
    width: 200,
  },
});
