import {StyleSheet, View} from 'react-native';
import MainHeader from '../../../components/MainHeader';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerStackType} from '../../../navigation/types';
import LogoutButton from '../../../components/LogoutButton';
import MainSettings from './MainSettings';
import WidgetSettings from './WidgetSettings';
import Tabs from './Tabs';
import { selectThemeColors } from '../../../redux/theme/selectors';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

interface Props {
  navigation: DrawerNavigationProp<DrawerStackType>;
}

export default function DrawerContent({ navigation }: Props) {

  const color = useSelector(selectThemeColors);
  const { t } = useTranslation('drawer');

  const styles = StyleSheet.create({
    mainWrapper: {
      flex: 1,
      backgroundColor: color.tertiary
    },
    contentWrapper: {
      paddingHorizontal: 10,
      marginTop: 10,
      flex: 1,
    },
    buttonWrapper: {
      paddingBottom: 60,
      paddingHorizontal: 100,
    },
  });
  
  return (
    <View style={styles.mainWrapper}>
      <MainHeader isOpenDrawer={true} navigation={navigation} />
      <View style={styles.contentWrapper}>
        <Tabs
          tabs={[
            { key: 'main', title: t('main.titleTab'), content: <MainSettings /> },
            { key: 'widget', title: t('widget.titleTab'), content: <WidgetSettings /> },
          ]}
        />        
      </View >
      <View style={styles.buttonWrapper}>
        <LogoutButton />
      </View>
    </View>
  );
}   
        
     

