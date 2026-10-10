import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Animated,
} from 'react-native';
import { Task } from '../types';
import { Colors, Spacing, Typography, BorderRadius } from '../constants';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onPress?: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <Pressable
        style={styles.content}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <TouchableOpacity
          style={[styles.checkbox, task.completed && styles.checkboxCompleted]}
          onPress={onToggle}
          activeOpacity={0.7}
        >
          {task.completed && <View style={styles.checkmark} />}
        </TouchableOpacity>
        
        <View style={styles.textContainer}>
          <Text
            style={[styles.title, task.completed && styles.titleCompleted]}
            numberOfLines={2}
          >
            {task.title}
          </Text>
          {task.pomodoroCount > 0 && (
            <View style={styles.pomodoroContainer}>
              <Text style={styles.pomodoroText}>
                🍅 {task.pomodoroCount}
                {task.estimatedPomodoros && ` / ${task.estimatedPomodoros}`}
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    marginRight: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.surface,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...Typography.body,
    color: Colors.text,
  },
  titleCompleted: {
    color: Colors.textTertiary,
    textDecorationLine: 'line-through',
  },
  pomodoroContainer: {
    marginTop: Spacing.xs,
  },
  pomodoroText: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
});
