import { createDrawerNavigator } from '@react-navigation/drawer';
import { ScreenNames } from '../../constants/screenNames';
import TabBarStack from '../TabBarStack';
import { DrawerStackType } from '../types';
import Header from '../../components/Header';
import { Dimensions } from 'react-native';
import DrawerContent from '../../components/DrawerContent';
import { useTheme } from '../../context/ThemeContext';

const Drawer = createDrawerNavigator<DrawerStackType>();

export default function DrawerStack() {

  const { theme } = useTheme();

  return (
    <Drawer.Navigator
  initialRouteName={ScreenNames.TAB_BAR_STACK}
  drawerContent={(props) => <DrawerContent {...props} />}
  screenOptions={{
    drawerPosition: 'right',
    drawerStyle: {
      width: Dimensions.get('window').width,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: theme.backgroundPrimary, 
    },    
  }}
>
  <Drawer.Screen
    name={ScreenNames.TAB_BAR_STACK}
    component={TabBarStack}
    options={{
      header: ({ navigation }) => <Header navigation={navigation} />,
    }}
  />
</Drawer.Navigator>

  );
}
