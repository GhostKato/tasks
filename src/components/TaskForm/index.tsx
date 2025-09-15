import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Input from '../../components/Input';
import SwitchBtn from '../../components/SwitchButton';
import DefaultButton from '../../components/DefaultButton';
import { ITask } from '../../types/task';
import { useSelector } from 'react-redux';
import { selectThemeColors } from '../../redux/theme/selectors';
import { selectTranslations } from '../../redux/language/selector';
import DateTimePicker from '@react-native-community/datetimepicker';

interface TaskFormProps {
  initialTask?: ITask;
  onSubmit: (task: ITask) => void;
}

export default function TaskForm({ initialTask, onSubmit }: TaskFormProps) {
  const color = useSelector(selectThemeColors);
  const t = useSelector(selectTranslations);

  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [status, setStatus] = useState<'new' | 'done' | 'undone' | 'inProgress'>(
    initialTask?.status || 'new'
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
      status: initialTask ? status : 'new', 
      priority,
      category,
      deadline: deadline.toISOString(),
      isMarked: initialTask?.isMarked || false,
      ownerId: initialTask?.ownerId || 'test',
    };
    onSubmit(task);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: color.tertiary }]}>
      <Input placeholder="Заголовок" value={title} onChangeText={setTitle} />
      <Input placeholder="Опис" value={description} onChangeText={setDescription} multiline={true} textAlignVertical='top'/>
      
      {initialTask && (
        <>
          <Text style={[styles.label, { color: color.quaternary }]}>Статус</Text>
          <SwitchBtn<'done' | 'undone' | 'inProgress'>
            items={[
              { text: 'Виконано', id: 'done' as const },
              { text: 'Не виконано', id: 'undone' as const },
              { text: 'В процесі', id: 'inProgress' as const },
            ]}
            active={status as 'done' | 'undone' | 'inProgress'} 
            handleSwitch={(item) => setStatus(item.id)}
          />
        </>
      )}

      <Text style={[styles.label, { color: color.quaternary }]}>Пріоритет</Text>
      <SwitchBtn<'high' | 'medium' | 'low'>
        items={[
          { text: 'Високий', id: 'high' as const },
          { text: 'Середній', id: 'medium' as const },
          { text: 'Низький', id: 'low' as const },
        ]}
        active={priority}
        handleSwitch={(item) => setPriority(item.id)}
      />

      <Text style={[styles.label, { color: color.quaternary }]}>Категорія</Text>
      <SwitchBtn<'work' | 'personal' | 'study'>
        items={[
          { text: 'Робота', id: 'work' as const },
          { text: 'Особисте', id: 'personal' as const },
          { text: 'Навчання', id: 'study' as const },
        ]}
        active={category}
        handleSwitch={(item) => setCategory(item.id)}
      />

      <Text style={[styles.label, { color: color.quaternary }]}>Дата</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: color.quaternary,
          borderRadius: 8,
        }}
      >
        <Text>{deadline.toLocaleDateString()}</Text>
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

      <Text style={[styles.label, { color: color.quaternary }]}>Час</Text>
      <TouchableOpacity
        onPress={() => setShowTimePicker(true)}
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: color.quaternary,
          borderRadius: 8,
        }}
      >
        <Text>
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

      <DefaultButton
        text={initialTask ? 'Оновити' : 'Додати'}
        onPress={handleSave}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
});
