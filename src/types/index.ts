export interface PomodoroSession {
  id: string;
  startTime: number;
  endTime?: number;
  duration: number; // in seconds
  completed: boolean;
  taskId?: string;
  date: string; // YYYY-MM-DD
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
  pomodoroCount: number;
  estimatedPomodoros?: number;
}

export interface DailyPlan {
  id: string;
  date: string; // YYYY-MM-DD
  tasks: string[]; // task IDs
  notes?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  tags?: string[];
}

export interface StudyStats {
  totalPomodoros: number;
  totalMinutes: number;
  completedTasks: number;
  currentStreak: number;
  bestStreak: number;
}

export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed';

export interface TimerState {
  status: TimerStatus;
  remainingSeconds: number;
  sessionDuration: number;
  currentSessionId?: string;
}
