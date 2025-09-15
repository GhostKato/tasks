import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fonts } from '../../constants/fonts';
import { useSelector } from 'react-redux';
import { selectThemeColors } from '../../redux/theme/selectors';

export interface ISwitchItem<T extends string | null> {
  text: string;
  icon?: JSX.Element;
  id: T;
}

interface ISwitchBtnProps<T extends string | null> {
  items: ISwitchItem<T>[];
  active: T;
  handleSwitch: (item: ISwitchItem<T>) => void;
}

export default function SwitchBtn<T extends string | null>({
  items,
  active,
  handleSwitch,
}: ISwitchBtnProps<T>) {

  const color = useSelector(selectThemeColors);

  const styles = StyleSheet.create({
    switcherWrapper: {
      flexDirection: 'row',
      padding: 5,
      borderRadius: 50,
      backgroundColor: color.secondary,
      height: 50,
      alignItems: 'center',
    },
    activeBtn: {
      flexDirection: 'row',
      flex: 0.5,
      alignItems: 'center',
      borderRadius: 50,
      backgroundColor: color.primary,
      height: 40,      
      gap: 20,
    },  
    nonActiveBtn: {
      gap: 20,
      flex: 0.5,      
      alignItems: 'center',
      flexDirection: 'row',      
      height: 40,
      borderRadius: 50,    
    },
    ActiveTextBtn: {
      fontFamily: fonts.MontserratRegular,
      color: color.secondary,
    },
    nonActiveTextBtn: {
      fontFamily: fonts.MontserratRegular,
      color: color.octonary,
    },
    iconContainer: { flex: 0.05 },
    textContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  });

  return (
    <View style={styles.switcherWrapper}>
      {items.map((e) => (
        <TouchableOpacity
          key={String(e.id)} 
          onPress={() => handleSwitch(e)}
          style={active === e.id ? styles.activeBtn : styles.nonActiveBtn}
        >
          {!!e.icon && <View style={styles.iconContainer}>{e.icon}</View>}
          <View style={[styles.textContainer, !!e.icon && { flex: 0.8 }]}>
            <Text style={active === e.id ? styles.ActiveTextBtn : styles.nonActiveTextBtn}>
              {e.text}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
