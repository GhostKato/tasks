import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Input from '../../components/Input';
import FilterSwitch from '../FilterSwitch';
import DefaultButton from '../../components/DefaultButton';
import { ITask } from '../../types/task';
import { useSelector } from 'react-redux';
import { selectThemeColors } from '../../redux/theme/selectors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';

interface TaskFormProps {
  initialTask?: ITask;
  onSubmit: (task: ITask) => void;
}

export default function TaskForm({ initialTask, onSubmit }: TaskFormProps) {
  const color = useSelector(selectThemeColors);
   const { t } = useTranslation(['taskForm', 'filterSettings']);

  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  
  const [status, setStatus] = useState<'done' | 'undone' | 'inProgress'>(
    initialTask?.status || 'undone'
  );

  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>(
    initialTask?.priority || 'medium'
  );
  const [category, setCategory] = useState<'work' | 'personal' | 'study'>(
    initialTask?.category || 'work'
  );
  const [deadline, setDeadline] = useState<Date>(
    initialTask?.deadline ? new Date(initialTask.deadline) : new Date()
  );

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSave = () => {
    const task: ITask = {
      ...(initialTask?.id ? { id: initialTask.id } : {}),
      title,
      description,      
      status: initialTask ? status : 'undone',
      priority,
      category,
      deadline: deadline.toISOString(),
      isMarked: initialTask?.isMarked || false,
      ownerId: initialTask?.ownerId || 'test',
    };
    onSubmit(task);
  };

  const styles = StyleSheet.create({
  container: {
    padding: 16,    
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
    color: color.quaternary
  },
  btnContainer: {    
    marginVertical: 12,
  },
  dateTimeText: {    
    color: color.quaternary
    },
  touchableOpacityStyle: {    
    padding: 12,
     borderWidth: 1,
     borderColor: color.quaternary,
     borderRadius: 25,     
  },  
});

  return (
    <ScrollView style={styles.container}>
      <Input placeholder={t('taskForm.placeholderTitle')} value={title} onChangeText={setTitle} />
      <Input
        placeholder={t('taskForm.placeholderTitle')}
        value={description}
        onChangeText={setDescription}
        multiline={true}
        textAlignVertical="top"
      />

      {initialTask && (
        <>
          <Text style={styles.label}>{t('filterSettings.byStatusTitle')}</Text>
          <FilterSwitch<'done' | 'undone' | 'inProgress'>
            items={[
              { text: t('filterSettings.byStatus.undone'), id: 'undone' as const },                           
              { text: t('filterSettings.byStatus.inProgress'), id: 'inProgress' as const },
              { text: t('filterSettings.byStatus.done'), id: 'done' as const }, 
            ]}
            active={status}
            handleSwitch={(item) => setStatus(item.id)}
          />
        </>
      )}

      <Text style={styles.label}>{t('filterSettings.byPriorityTitle')}</Text>
      <FilterSwitch<'high' | 'medium' | 'low'>
        items={[
        { text: t('filterSettings.byPriority.low'), id: 'low' as const },
        { text: t('filterSettings.byPriority.medium'), id: 'medium' as const },
        { text: t('filterSettings.byPriority.high'), id: 'high' as const },         
              ]}
        active={priority}
        handleSwitch={(item) => setPriority(item.id)}
      />

      <Text style={styles.label}>{t('filterSettings.byCategoriesTitle')}</Text>
      <FilterSwitch<'work' | 'personal' | 'study'>
        items={[
          { text: t('filterSettings.byCategories.work'), id: 'work' as const },
          { text: t('filterSettings.byCategories.personal'), id: 'personal' as const },
          { text: t('filterSettings.byCategories.study'), id: 'study' as const },
        ]}
        active={category}
        handleSwitch={(item) => setCategory(item.id)}
      />

      <Text style={styles.label}>{t('taskForm.selectionDate')}</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.touchableOpacityStyle}
      >
        <Text style={styles.dateTimeText}>{deadline.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={deadline}
          mode="date"
          display="calendar"          
          onChange={(_, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              const newDeadline = new Date(deadline);
              newDeadline.setFullYear(selectedDate.getFullYear());
              newDeadline.setMonth(selectedDate.getMonth());
              newDeadline.setDate(selectedDate.getDate());
              setDeadline(newDeadline);
            }
          }}
        />
      )}

      <Text style={styles.label}>{t('taskForm.selectionTime')}</Text>
      <TouchableOpacity
        onPress={() => setShowTimePicker(true)}
        style={styles.touchableOpacityStyle}
      >
        <Text style={styles.dateTimeText}>
          {deadline.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={deadline}
          mode="time"
          is24Hour={true}
          display="spinner"          
          onChange={(_, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              const newDeadline = new Date(deadline);
              newDeadline.setHours(selectedTime.getHours());
              newDeadline.setMinutes(selectedTime.getMinutes());
              setDeadline(newDeadline);
            }
          }}
        />
      )}

      <View style={styles.btnContainer}>
        <DefaultButton
          text={initialTask ? t('taskForm.updateTaskBtn') : t('taskForm.addTaskBtn')}
          onPress={handleSave}
          backgroundColor={color.secondary}
        />
      </View>
    </ScrollView>
  );
}


