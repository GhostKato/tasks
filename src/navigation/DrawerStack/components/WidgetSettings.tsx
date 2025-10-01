import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeColors } from '../../../redux/theme/selectors';
import DefaultSwitch from '../../../components/DefaultSwitch';
import { selectTasksByWidget, selectWidgets } from '../../../redux/widgets/selectors';
import { resetWidget, toggleWidget } from '../../../redux/widgets/slice';
import DefaultButton from '../../../components/DefaultButton';
import { fonts } from '../../../constants/fonts';
import { getSwitchBlocks } from '../../../constants/widgetConfig';
import { useTranslation } from 'react-i18next';

export default function WidgetSettings() {
  const color = useSelector(selectThemeColors);
  const widgets = useSelector(selectWidgets);
  const tasksByWidget = useSelector(selectTasksByWidget);
  const { t } = useTranslation('drawer');
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    contentWrapper: {
      padding: 20,
      gap: 20,
      borderWidth: 2,
      borderColor: color.secondary,
      borderRadius: 20,
      minHeight: 200,
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent:'space-around'
    },
    switchItem: {
      gap: 10,
      alignItems: 'center',
      width: 90,
    },
    titleCategory: {
      textAlign: 'center',
      color: color.senary,
      paddingBottom: 10,
      fontWeight: 'bold',
      fontFamily: fonts.MontserratExtraBold,
      fontSize: 16,
    },
    nameSwitch: {
      color: color.senary,
      fontFamily: fonts.MontserratMedium,
    },
    btnContainer: {
      paddingHorizontal: 120, 
    },
  });

  const syncedWidgets = Object.keys(widgets).reduce((acc, key) => {  
  const listKeyRaw = key.replace(/^is/, '');  
  const listKey = (listKeyRaw.charAt(0).toLowerCase() + listKeyRaw.slice(1)) as keyof typeof tasksByWidget;  
  acc[key as keyof typeof widgets] = tasksByWidget[listKey]?.length
    ? widgets[key as keyof typeof widgets]
    : false;

  return acc;
}, {} as typeof widgets);


  const switchBlocks = getSwitchBlocks(t);

  return (
    <View style={styles.contentWrapper}>
      {switchBlocks.map((block, i) => (
        <View key={i}>
          <Text style={styles.titleCategory}>{block.title}</Text>
          <View style={styles.switchContainer}>
            {block.items.map((item) => {
              const listKey = item.listKey as keyof typeof tasksByWidget;
              const tasks = tasksByWidget[listKey];
              const disabled = tasks.length === 0;

              return (
                <View style={styles.switchItem} key={item.key}>
                  <Text style={styles.nameSwitch}>{item.label}</Text>
                  <DefaultSwitch 
                    isActive={syncedWidgets[item.key as keyof typeof syncedWidgets]} 
                    action={toggleWidget} 
                    payload={item.key} 
                    disabled={disabled}
                  />
                </View>
              );
            })}
          </View>
        </View>
      ))}
      <View style={styles.btnContainer}>
        <DefaultButton 
          text={t('widget.resetBtn')} 
          onPress={() => dispatch(resetWidget())}
          backgroundColor={color.nonary}
        />
      </View>
    </View>
  );
}
