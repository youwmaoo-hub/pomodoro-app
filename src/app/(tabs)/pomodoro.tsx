import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TimerCircle } from '../../components/TimerCircle';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { useTimer } from '../../hooks/useTimer';
import { useSessions } from '../../hooks/useSessions';
import { useTasks } from '../../hooks/useTasks';
import { Colors, Spacing, Typography, POMODORO_DURATION } from '../../constants';

export default function PomodoroScreen() {
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>();
  const { startSession, completeSession } = useSessions();
  const { tasks, incrementPomodoroCount } = useTasks();
  const activeTasks = tasks.filter(t => !t.completed);

  const handleComplete = useCallback(async () => {
    if (timerState.currentSessionId) {
      await completeSession(timerState.currentSessionId);
      if (selectedTaskId) {
        await incrementPomodoroCount(selectedTaskId);
      }
      Alert.alert('完成', '番茄钟完成！休息一下吧 🎉', [
        { text: '确定', onPress: () => resetTimer() },
      ]);
    }
  }, [selectedTaskId]);

  const { timerState, startTimer, pauseTimer, resumeTimer, resetTimer } = useTimer(
    POMODORO_DURATION,
    handleComplete
  );

  const handleStart = async () => {
    const sessionId = await startSession(POMODORO_DURATION, selectedTaskId);
    startTimer(sessionId);
  };

  const handleReset = () => {
    Alert.alert('重置计时器', '确定要重置番茄钟吗？', [
      { text: '取消', style: 'cancel' },
      { text: '重置', onPress: () => resetTimer(), style: 'destructive' },
    ]);
  };

  const isIdle = timerState.status === 'idle';
  const isRunning = timerState.status === 'running';
  const isPaused = timerState.status === 'paused';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>番茄钟</Text>
        </View>

        {/* Timer */}
        <View style={styles.timerContainer}>
          <TimerCircle
            remainingSeconds={timerState.remainingSeconds}
            totalSeconds={timerState.sessionDuration}
          />
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          {isIdle && (
            <View style={styles.buttonRow}>
              <Button
                title="开始"
                onPress={handleStart}
                size="large"
                style={styles.mainButton}
              />
            </View>
          )}

          {isRunning && (
            <View style={styles.buttonRow}>
              <Button
                title="暂停"
                onPress={pauseTimer}
                variant="secondary"
                size="large"
                style={styles.mainButton}
              />
              <Button
                title="重置"
                onPress={handleReset}
                variant="ghost"
                size="medium"
              />
            </View>
          )}

          {isPaused && (
            <View style={styles.buttonRow}>
              <Button
                title="继续"
                onPress={resumeTimer}
                size="large"
                style={styles.mainButton}
              />
              <Button
                title="重置"
                onPress={handleReset}
                variant="ghost"
                size="medium"
              />
            </View>
          )}
        </View>

        {/* Task Selection */}
        {isIdle && activeTasks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>关联任务（可选）</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.taskChips}>
                {activeTasks.slice(0, 5).map(task => (
                  <TouchableOpacity
                    key={task.id}
                    style={[
                      styles.taskChip,
                      selectedTaskId === task.id && styles.taskChipSelected,
                    ]}
                    onPress={() => setSelectedTaskId(
                      selectedTaskId === task.id ? undefined : task.id
                    )}
                  >
                    <Text
                      style={[
                        styles.taskChipText,
                        selectedTaskId === task.id && styles.taskChipTextSelected,
                      ]}
                      numberOfLines={1}
                    >
                      {task.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {/* Tips */}
        <Card style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 番茄工作法</Text>
          <Text style={styles.tipsText}>
            1. 选择一个任务{'\n'}
            2. 设置25分钟专注时间{'\n'}
            3. 全神贯注工作{'\n'}
            4. 休息5分钟
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
  },
  header: {
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  controls: {
    marginBottom: Spacing.xl,
  },
  buttonRow: {
    gap: Spacing.md,
  },
  mainButton: {
    marginBottom: Spacing.sm,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  taskChips: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  taskChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    maxWidth: 200,
  },
  taskChipSelected: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  taskChipText: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  taskChipTextSelected: {
    color: Colors.primaryDark,
    fontWeight: '500',
  },
  tipsCard: {
    backgroundColor: Colors.surfaceSecondary,
  },
  tipsTitle: {
    ...Typography.bodyMedium,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  tipsText: {
    ...Typography.small,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
