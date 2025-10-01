import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ITask } from '../../types/task';
import { fonts } from '../../constants/fonts';
import { useSelector, useDispatch } from 'react-redux';
import { selectThemeColors } from '../../redux/theme/selectors';
import { toggleMarked } from '../../redux/tasks/operations';
import {
  UndoneIcon,
  InProgressIcon,
  DoneIcon,
  WorkIcon,
  PersonalIcon,
  StudyIcon,
  MarkedTrueIcon,
  MarkedFalseIcon,
  DeadlineIcon,
} from '../../assets/icons';
import { AppDispatch } from '../../redux/store';
import { selectTasksLoading } from '../../redux/tasks/selectors';
import LoaderRunningDots from '../LoaderRunningDots';
import { useTranslation } from 'react-i18next';

interface ITasksListProps {
  tasks: ITask[];
  onTaskPress?: (task: ITask) => void;
}

export default function TasksList({ tasks, onTaskPress }: ITasksListProps) {
  const color = useSelector(selectThemeColors);
  const { t } = useTranslation('global');
  const dispatch = useDispatch<AppDispatch>();
   const loading = useSelector(selectTasksLoading);
  const priorityColors = {
    high: color.nonary,
    medium: color.denary,
    low: color.octonary,
  };

  const styles = StyleSheet.create({
    flex: {
      flex: 1
    },
    mainContainer: {
      paddingHorizontal: 10
    },
    item: {
      borderWidth: 1,
      borderRadius: 15,
      padding: 12,      
      marginVertical: 8,
      borderColor: color.quaternary,
      position: 'relative',
    },
    title: {
      fontFamily: fonts.MontserratSemiBold,
      fontSize: 16,
      color: color.quaternary,
      marginBottom: 3,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap:'10',
      marginBottom: 4
    },
    infoText: {
      fontFamily: fonts.MontserratRegular,
      fontSize: 14,
      color: color.quaternary,      
    },
    emptyText: {
      fontFamily: fonts.MontserratRegular,
      fontSize: 16,
      color: color.quaternary,
      textAlign: 'center',
      marginTop: 20,
    },
    markedButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      padding: 6,
      zIndex: 10,
    },
    infoIconContainer: {      
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent:'space-between'
    },
    deadlineRow: {    
      alignItems: 'flex-end',      
      flexDirection: 'row',
      gap: 5,
      paddingBottom: 4
    },
    priorityIcon: {    
      width: 16,
      height: 16,
      borderRadius: 12,    
    },    
  });

  const renderTask = ({ item }: { item: ITask }) => {
    const deadlineDate = new Date(item.deadline);
    const formattedDeadline = `${deadlineDate.toLocaleDateString()} ${deadlineDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    const backgroundColor = priorityColors[item.priority];

    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.7}
        onPress={() => onTaskPress && onTaskPress(item)}
      >
        
        <TouchableOpacity
  style={styles.markedButton}
  onPress={() => item.id && dispatch(toggleMarked({ taskId: item.id }))} 
>
  {item.isMarked ? <MarkedTrueIcon color={color.quaternary}/> : <MarkedFalseIcon color={color.quaternary}/>}
</TouchableOpacity>
       <View style={styles.infoRow}>
          <View style={[styles.priorityIcon, { backgroundColor }]} />
          <Text style={styles.title}>{item.title}</Text>  
       </View>      

       <View style={styles.infoContainer}>
          <View style={styles.infoIconContainer}>
            {/* Status */}
            <View style={styles.infoRow}>
              {item.status === 'undone' && <UndoneIcon color={color.quaternary}/>}
              {item.status === 'inProgress' && <InProgressIcon color={color.quaternary}/>}
              {item.status === 'done' && <DoneIcon color={color.quaternary}/>}
              <Text style={styles.infoText}>{item.status}</Text>
            </View>    
            {/* Category */}
            <View style={styles.infoRow}>
              {item.category === 'work' && <WorkIcon color={color.quaternary} />}
              {item.category === 'personal' && <PersonalIcon color={color.quaternary}/>}
              {item.category === 'study' && <StudyIcon color={color.quaternary} />}
              <Text style={styles.infoText}>{item.category}</Text>
            </View>
          </View>  
          {/* Deadline */}
         <View style={styles.deadlineRow}>
            <DeadlineIcon width={16} height={16} color={color.quaternary} />
            <View>
              <Text style={styles.infoText}>{formattedDeadline}</Text>
            </View>
         </View>
       </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.flex}>
      {loading ? (
              <LoaderRunningDots />
            ) : (
      <FlatList
        data={tasks}
        style={styles.mainContainer}
        numColumns={1}
        keyExtractor={(item, index) => item.id ?? index.toString()}
        renderItem={renderTask}
        ListEmptyComponent={() => <Text style={styles.emptyText}>{t('taskListEmpty')}</Text>}
        />
          )}
    </View>
  );
}


