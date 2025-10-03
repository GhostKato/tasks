import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { toggleMarked } from '../../../redux/tasks/operations';
import { MarkedTrueIcon, MarkedFalseIcon } from '../../../assets/icons';
import { selectThemeColors } from '../../../redux/theme/selectors';

interface IMarkedButtonProps {
  taskId: string;
  isMarked?: boolean; 
}

export default function MarkedButton({ taskId, isMarked }: IMarkedButtonProps) {
  const dispatch = useDispatch<AppDispatch>();
  const color = useSelector(selectThemeColors);
  
  const taskFromStore = useSelector((state: RootState) =>
    state.tasks.allTasks.find(t => t.id === taskId)
  );
    const marked = isMarked ?? taskFromStore?.isMarked ?? false;
    
    const styles = StyleSheet.create({
        
        markedButton: {
          position: 'absolute',
          top: 10,
          right: 10,
          padding: 6,
          zIndex: 10,
        },
      });

  return (
    <TouchableOpacity
      onPress={() => dispatch(toggleMarked({ taskId }))}
      style={styles.markedButton}
    >
      {marked ? <MarkedTrueIcon color={color.quaternary}/> : <MarkedFalseIcon color={color.quaternary}/>}
    </TouchableOpacity>
  );
}
