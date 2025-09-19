import {StyleSheet, View} from 'react-native';
import { useSelector } from 'react-redux';
import { selectThemeColors } from '../../../redux/theme/selectors';

export default function DrawerIcon() { 
  
  const color = useSelector(selectThemeColors);

  const styles = StyleSheet.create({  
      line: {
        width: '100%',
        height: 2,
        backgroundColor: color.quinary
      },
}); 
  
  return ( 
    <>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
    </>   
         );
}  
 


