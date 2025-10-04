import { createDrawerNavigator } from '@react-navigation/drawer';
import { ScreenNames } from '../../constants/screenNames';
import TaskTabBarStack from '../TabBarStack';
import { DrawerStackType } from '../types';
import MainHeader from '../../components/headers/MainHeader';
import { Dimensions } from 'react-native';
import DrawerContent from './components/DrawerContent';
import { useSelector } from 'react-redux';
import { selectThemeColors } from '../../redux/theme/selectors';

const Drawer = createDrawerNavigator<DrawerStackType>();

export default function DrawerStack() {

  const color = useSelector(selectThemeColors);

  return (
    <Drawer.Navigator
  initialRouteName={ScreenNames.TASK_TAB_BAR_STACK}
  drawerContent={(props) => <DrawerContent {...props} />}
  screenOptions={{
    drawerPosition: 'right',
    drawerStyle: {
      width: Dimensions.get('window').width,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: color.primary, 
    },    
  }}
>
  <Drawer.Screen
    name={ScreenNames.TASK_TAB_BAR_STACK}
    component={TaskTabBarStack}
    options={{
      header: ({ navigation }) => <MainHeader navigation={navigation} />,
    }}
      />      
</Drawer.Navigator>

  );
}
