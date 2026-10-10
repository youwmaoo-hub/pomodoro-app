import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { TaskItem } from '../../components/TaskItem';
import { useTasks } from '../../hooks/useTasks';
import { useSessions } from '../../hooks/useSessions';
import { Colors, Spacing, Typography } from '../../constants';
import { getTodayString, formatDate } from '../../utils/helpers';

export default function HomeScreen() {
  const { tasks, toggleTask } = useTasks();
  const { getTodaySessions } = useSessions();

  const todayTasks = tasks.filter(t => !t.completed).slice(0, 5);
  const completedToday = tasks.filter(t => 
    t.completed && 
    t.completedAt && 
    new Date(t.completedAt).toISOString().split('T')[0] === getTodayString()
  ).length;
  const todaySessions = getTodaySessions();
  const todayPomodoros = todaySessions.length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>你好</Text>
            <Text style={styles.date}>{formatDate(getTodayString())}</Text>
          </View>
        </View>

        {/* Today Stats */}
        <Card style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{todayPomodoros}</Text>
              <Text style={styles.statLabel}>番茄钟</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{completedToday}</Text>
              <Text style={styles.statLabel}>已完成</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{todayTasks.length}</Text>
              <Text style={styles.statLabel}>待办</Text>
            </View>
          </View>
        </Card>

        {/* Quick Start */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>开始专注</Text>
          <Button
            title="开始番茄钟"
            onPress={() => router.push('/pomodoro')}
            size="large"
          />
        </View>

        {/* Today Tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>今日任务</Text>
            <TouchableOpacity onPress={() => router.push('/plan')}>
              <Text style={styles.seeAll}>查看全部</Text>
            </TouchableOpacity>
          </View>
          
          {todayTasks.length > 0 ? (
            <View style={styles.taskList}>
              {todayTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={() => toggleTask(task.id)}
                />
              ))}
            </View>
          ) : (
            <Card style={styles.emptyCard}>
              <Text style={styles.emptyText}>暂无待办任务</Text>
              <Text style={styles.emptyHint}>点击"计划"添加新任务</Text>
            </Card>
          )}
        </View>
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
    marginBottom: Spacing.lg,
  },
  greeting: {
    ...Typography.h1,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  date: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  statsCard: {
    marginBottom: Spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.borderLight,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
  },
  seeAll: {
    ...Typography.small,
    color: Colors.primary,
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
