import { StyleSheet, View } from "react-native";
import ThemeSwitch from "../../../components/ThemeSwitch";
import { useSelector } from "react-redux";
import LanguageSwitch from "../../../components/LanguageSwitch";
import { selectThemeColors } from "../../../redux/theme/selectors";

export default function MainSettings() {
  const color = useSelector(selectThemeColors);

  const styles = StyleSheet.create({    
    contentWrapper: {
      padding: 20,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: color.secondary,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderTopRightRadius: 20,
      minHeight: 200,
    },    
  });

  return (    
      <View style={styles.contentWrapper}>
        <ThemeSwitch />
        <LanguageSwitch />
      </View>    
  );
}






