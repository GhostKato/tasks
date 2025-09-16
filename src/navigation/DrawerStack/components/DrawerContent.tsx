import {StyleSheet, View} from 'react-native';
import MainHeader from '../../../components/MainHeader';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerStackType} from '../../../navigation/types';
import LogoutButton from '../../../components/LogoutButton';
import MainSettings from "./MainSettings";
import WidgetSettings from "./WidgetSettings";
import Tabs from "./Tabs";

interface Props {
  navigation: DrawerNavigationProp<DrawerStackType>;
}

export default function DrawerContent({ navigation }: Props) {
    

  const styles = StyleSheet.create({
    mainWrapper: {
      flex: 1,     
    },
    contentWrapper: {
      paddingHorizontal: 10,
      marginTop: 10,
      flex: 1,
    },
    buttonWrapper: {
      padding: 60,      
    },
  });
  
  return (
    <View style={styles.mainWrapper}>
      <MainHeader isOpenDrawer={true} navigation={navigation} />
      <View style={styles.contentWrapper}>
        <Tabs
          tabs={[
            { key: "main", title: "Main settings", content: <MainSettings /> },
            { key: "hero", title: "Hero settings", content: <WidgetSettings /> },
          ]}
        />        
      </View >
      <View style={styles.buttonWrapper}>
        <LogoutButton />
      </View>
    </View>
  );
}   
        
     

