import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Pressable, 
  ScrollView, 
  Alert,
  Platform 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { useTodoStore } from '../store/todoStore';
import { Todo } from '../db/database';

interface TodoFormProps {
  editingTodo?: Todo;
}

export default function TodoForm({ editingTodo }: TodoFormProps) {
  const { addTodo, updateTodo, formData, setFormData, resetFormData } = useTodoStore();
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title,
        description: editingTodo.description || '',
        due_date: editingTodo.due_date || '',
        status: editingTodo.status,
      });
    } else {
      resetFormData();
    }
  }, [editingTodo]);

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    setIsSubmitting(true);
    try {
      const todoData = {
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        due_date: formData.due_date || undefined,
        status: formData.status,
      };

      if (editingTodo) {
        await updateTodo(editingTodo.id, todoData);
      } else {
        await addTodo(todoData);
      }

      resetFormData();
      router.back();
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to save task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setFormData({ due_date: selectedDate.toISOString().split('T')[0] });
    }
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return 'Select due date';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            value={formData.title}
            onChangeText={(text) => setFormData({ title: text })}
            placeholder="Enter task title"
            placeholderTextColor="#999999"
            maxLength={100}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => setFormData({ description: text })}
            placeholder="Enter task description (optional)"
            placeholderTextColor="#999999"
            multiline
            numberOfLines={4}
            maxLength={500}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Due Date</Text>
          <Pressable 
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={[
              styles.dateButtonText,
              !formData.due_date && styles.placeholderText
            ]}>
              {formatDisplayDate(formData.due_date)}
            </Text>
          </Pressable>
          
          {formData.due_date && (
            <Pressable 
              style={styles.clearDateButton}
              onPress={() => setFormData({ due_date: '' })}
            >
              <Text style={styles.clearDateText}>Clear date</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusContainer}>
            <Pressable
              style={[
                styles.statusButton,
                formData.status === 'pending' && styles.activeStatusButton
              ]}
              onPress={() => setFormData({ status: 'pending' })}
            >
              <Text style={[
                styles.statusButtonText,
                formData.status === 'pending' && styles.activeStatusButtonText
              ]}>
                Pending
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.statusButton,
                formData.status === 'completed' && styles.activeStatusButton
              ]}
              onPress={() => setFormData({ status: 'completed' })}
            >
              <Text style={[
                styles.statusButtonText,
                formData.status === 'completed' && styles.activeStatusButtonText
              ]}>
                Completed
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable 
            style={styles.cancelButton}
            onPress={() => router.back()}
            disabled={isSubmitting}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
          
          <Pressable 
            style={[styles.saveButton, isSubmitting && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.saveButtonText}>
              {isSubmitting ? 'Saving...' : editingTodo ? 'Update' : 'Add Task'}
            </Text>
          </Pressable>
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={formData.due_date ? new Date(formData.due_date) : new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flexGrow: 1,
  },
  form: {
    padding: 16,
    gap: 20,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E7',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E7',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333333',
  },
  placeholderText: {
    color: '#999999',
  },
  clearDateButton: {
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  clearDateText: {
    fontSize: 14,
    color: '#007AFF',
  },
  statusContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E7',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  activeStatusButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  statusButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
  },
  activeStatusButtonText: {
    color: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E7',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#999999',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});