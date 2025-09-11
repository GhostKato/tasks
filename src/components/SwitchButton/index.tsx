import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fonts } from '../../constants/fonts';

interface ISwitchItem<T extends string> {
  text: string;
  icon?: JSX.Element;
  id: T;
}

interface ISwitchBtnProps<T extends string> {
  items: ISwitchItem<T>[];
  active: T | null;
  handleSwitch: (item: ISwitchItem<T>) => void;
}

export default function SwitchBtn<T extends string>({
  items,
  active,
  handleSwitch,
}: ISwitchBtnProps<T>) {
  return (
    <View style={styles.switcherWrapper}>
      {items.map((e, index) => (
        <TouchableOpacity
          key={e.id}
          onPress={() => handleSwitch(e)}
          style={
            active === e.id || (active === null && index === 0)
              ? styles.activeBtn
              : styles.nonActiveBtn
          }
        >
          {!!e.icon && <View style={styles.iconContainer}>{e.icon}</View>}
          <View style={[styles.textContainer, !!e.icon && { flex: 0.8 }]}>
            <Text style={styles.btnText}>{e.text}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  switcherWrapper: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#EAE9FB',
    height: 50,
    alignItems: 'center',
  },
  activeBtn: {
    flexDirection: 'row',
    flex: 0.5,
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'white',
    height: 40,
    paddingHorizontal: 10,
    gap: 20,
  },
  btnText: {
    fontFamily: fonts.MontserratRegular,
    color: '#0B0B0B',
  },
  nonActiveBtn: {
    gap: 20,
    flex: 0.5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 50,
  },
  iconContainer: { flex: 0.05 },
  textContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
