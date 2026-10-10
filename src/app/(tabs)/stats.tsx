import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/Card';
import { useSessions } from '../../hooks/useSessions';
import { useTasks } from '../../hooks/useTasks';
import { Colors, Spacing, Typography } from '../../constants';
import { getWeekDates, formatDate, getTodayString } from '../../utils/helpers';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - Spacing.lg * 4;
const MAX_BAR_HEIGHT = 120;

export default function StatsScreen() {
  const { sessions } = useSessions();
  const { tasks } = useTasks();

  const stats = useMemo(() => {
    const completedSessions = sessions.filter(s => s.completed);
    const completedTasks = tasks.filter(t => t.completed);
    
    const totalPomodoros = completedSessions.length;
    const totalMinutes = completedSessions.reduce((sum, s) => sum + s.duration / 60, 0);
    const totalTasks = completedTasks.length;

    // Week data
    const weekDates = getWeekDates();
    const weekData = weekDates.map(date => {
      const daySessions = sessions.filter(s => s.date === date && s.completed);
      return {
        date,
        count: daySessions.length,
        minutes: daySessions.reduce((sum, s) => sum + s.duration / 60, 0),
      };
    });

    // Streak calculation
    let currentStreak = 0;
    let bestStreak = 0;
    let tempStreak = 0;
    const today = getTodayString();
    
    for (let i = weekDates.length - 1; i >= 0; i--) {
      const dateData = weekData[i];
      if (dateData.count > 0) {
        tempStreak++;
        if (dateData.date === today || currentStreak > 0) {
          currentStreak = tempStreak;
        }
        bestStreak = Math.max(bestStreak, tempStreak);
      } else {
        if (dateData.date === today) {
          currentStreak = 0;
        }
        tempStreak = 0;
      }
    }

    return {
      totalPomodoros,
      totalMinutes: Math.round(totalMinutes),
      totalTasks,
      currentStreak,
      bestStreak,
      weekData,
    };
  }, [sessions, tasks]);

  const maxCount = Math.max(...stats.weekData.map(d => d.count), 1);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>学习统计</Text>
        </View>

        {/* Overview Stats */}
        <Card style={styles.overviewCard}>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.totalPomodoros}</Text>
              <Text style={styles.statLabel}>总番茄钟</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.totalMinutes}</Text>
              <Text style={styles.statLabel}>总分钟数</Text>
            </View>
          </View>
          <View style={[styles.statRow, styles.statRowSecond]}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.totalTasks}</Text>
              <Text style={styles.statLabel}>完成任务</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.currentStreak}</Text>
              <Text style={styles.statLabel}>连续天数</Text>
            </View>
          </View>
        </Card>

        {/* Week Chart */}
        <Card style={styles.chartCard}>
          <Text style={styles.sectionTitle}>过去7天</Text>
          <View style={styles.chart}>
            {stats.weekData.map((day, index) => {
              const barHeight = maxCount > 0 
                ? (day.count / maxCount) * MAX_BAR_HEIGHT 
                : 0;
              
              return (
                <View key={day.date} style={styles.barContainer}>
                  <View style={styles.barWrapper}>
                    {day.count > 0 && (
                      <Text style={styles.barLabel}>{day.count}</Text>
                    )}
                    <View
                      style={[
                        styles.bar,
                        {
                          height: Math.max(barHeight, day.count > 0 ? 20 : 0),
                          backgroundColor: day.date === getTodayString()
                            ? Colors.primary
                            : Colors.primaryLight,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.dateLabel}>
                    {formatDate(day.date).replace(/\d+月/, '')}
                  </Text>
                </View>
              );
            })}
          </View>
        </Card>

        {/* Achievements */}
        <Card style={styles.achievementsCard}>
          <Text style={styles.sectionTitle}>成就</Text>
          <View style={styles.achievements}>
            {stats.bestStreak > 0 && (
              <View style={styles.achievement}>
                <Text style={styles.achievementIcon}>🔥</Text>
                <View>
                  <Text style={styles.achievementTitle}>最长连续</Text>
                  <Text style={styles.achievementValue}>{stats.bestStreak} 天</Text>
                </View>
              </View>
            )}
            {stats.totalPomodoros >= 10 && (
              <View style={styles.achievement}>
                <Text style={styles.achievementIcon}>⭐</Text>
                <View>
                  <Text style={styles.achievementTitle}>番茄达人</Text>
                  <Text style={styles.achievementValue}>完成 {stats.totalPomodoros} 个番茄钟</Text>
                </View>
              </View>
            )}
            {stats.totalTasks >= 5 && (
              <View style={styles.achievement}>
                <Text style={styles.achievementIcon}>✅</Text>
                <View>
                  <Text style={styles.achievementTitle}>任务完成者</Text>
                  <Text style={styles.achievementValue}>完成 {stats.totalTasks} 个任务</Text>
                </View>
              </View>
            )}
          </View>
          {stats.totalPomodoros === 0 && (
            <Text style={styles.emptyText}>开始你的第一个番茄钟吧！</Text>
          )}
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
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  overviewCard: {
    marginBottom: Spacing.lg,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statRowSecond: {
    marginTop: Spacing.lg,
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 36,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  chartCard: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.bodyMedium,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: MAX_BAR_HEIGHT + 40,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  barLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  bar: {
    width: '70%',
    borderRadius: 4,
    minHeight: 4,
  },
  dateLabel: {
    ...Typography.caption,
    color: Colors.textTertiary,
    marginTop: Spacing.sm,
  },
  achievementsCard: {
    marginBottom: Spacing.lg,
  },
  achievements: {
    gap: Spacing.md,
  },
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  achievementIcon: {
    fontSize: 32,
  },
  achievementTitle: {
    ...Typography.bodyMedium,
    color: Colors.text,
  },
  achievementValue: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
