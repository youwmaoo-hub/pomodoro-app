import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { TaskItem } from '../../components/TaskItem';
import { useTasks } from '../../hooks/useTasks';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants';

export default function PlanScreen() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  const handleAddTask = async () => {
    if (newTaskTitle.trim()) {
      await addTask(newTaskTitle.trim());
      setNewTaskTitle('');
      setIsAdding(false);
    }
  };

  const handleDeleteTask = (taskId: string, taskTitle: string) => {
    Alert.alert('删除任务', `确定要删除"${taskTitle}"吗？`, [
      { text: '取消', style: 'cancel' },
      { text: '删除', onPress: () => deleteTask(taskId), style: 'destructive' },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>每日计划</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAdding(!isAdding)}
        >
          <Text style={styles.addButtonText}>{isAdding ? '✕' : '+'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Add Task Input */}
        {isAdding && (
          <Card style={styles.addCard}>
            <TextInput
              style={styles.input}
              placeholder="添加新任务..."
              placeholderTextColor={Colors.textTertiary}
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
              autoFocus
              onSubmitEditing={handleAddTask}
              returnKeyType="done"
            />
            <View style={styles.addActions}>
              <Button
                title="取消"
                onPress={() => {
                  setIsAdding(false);
                  setNewTaskTitle('');
                }}
                variant="ghost"
                size="small"
              />
              <Button
                title="添加"
                onPress={handleAddTask}
                size="small"
                disabled={!newTaskTitle.trim()}
              />
            </View>
          </Card>
        )}

        {/* Active Tasks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            待办 ({activeTasks.length})
          </Text>
          {activeTasks.length > 0 ? (
            <View style={styles.taskList}>
              {activeTasks.map(task => (
                <TouchableOpacity
                  key={task.id}
                  onLongPress={() => handleDeleteTask(task.id, task.title)}
                  delayLongPress={500}
                >
                  <TaskItem
                    task={task}
                    onToggle={() => toggleTask(task.id)}
                  />
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Card style={styles.emptyCard}>
              <Text style={styles.emptyText}>暂无待办任务</Text>
              <Text style={styles.emptyHint}>点击右上角"+"添加任务</Text>
            </Card>
          )}
        </View>

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              已完成 ({completedTasks.length})
            </Text>
            <View style={styles.taskList}>
              {completedTasks.map(task => (
                <TouchableOpacity
                  key={task.id}
                  onLongPress={() => handleDeleteTask(task.id, task.title)}
                  delayLongPress={500}
                >
                  <TaskItem
                    task={task}
                    onToggle={() => toggleTask(task.id)}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '300',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
  },
  addCard: {
    marginBottom: Spacing.lg,
  },
  input: {
    ...Typography.body,
    color: Colors.text,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  addActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.sm,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  taskList: {
    gap: Spacing.sm,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  emptyHint: {
    ...Typography.small,
    color: Colors.textTertiary,
  },
});
