import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { selectThemeColors } from "../../../redux/theme/selectors";

export default function WidgetSettings() {
  const color = useSelector(selectThemeColors);

  const styles = StyleSheet.create({    
    contentWrapper: {
      padding: 20,
      gap: 40,      
      borderWidth: 2,
      borderColor: color.secondary,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      minHeight: 200,
    },    
  });

  return (    
      <View style={styles.contentWrapper}>              
      </View>    
  );
}
