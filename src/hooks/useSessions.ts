import { useState, useEffect, useCallback } from 'react';
import { PomodoroSession } from '../types';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../constants';
import { generateId, getTodayString } from '../utils/helpers';

export const useSessions = () => {
  const [sessions, setSessions] = useState<PomodoroSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    const savedSessions = await storage.getItem<PomodoroSession[]>(STORAGE_KEYS.SESSIONS);
    if (savedSessions) {
      setSessions(savedSessions);
    }
    setLoading(false);
  };

  const saveSessions = async (updatedSessions: PomodoroSession[]) => {
    await storage.setItem(STORAGE_KEYS.SESSIONS, updatedSessions);
    setSessions(updatedSessions);
  };

  const startSession = useCallback(async (duration: number, taskId?: string) => {
    const newSession: PomodoroSession = {
      id: generateId(),
      startTime: Date.now(),
      duration,
      completed: false,
      taskId,
      date: getTodayString(),
    };
    const updatedSessions = [newSession, ...sessions];
    await saveSessions(updatedSessions);
    return newSession.id;
  }, [sessions]);

  const completeSession = useCallback(async (sessionId: string) => {
    const updatedSessions = sessions.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          endTime: Date.now(),
          completed: true,
        };
      }
      return session;
    });
    await saveSessions(updatedSessions);
  }, [sessions]);

  const getTodaySessions = useCallback(() => {
    const today = getTodayString();
    return sessions.filter(s => s.date === today && s.completed);
  }, [sessions]);

  const getSessionsByDate = useCallback((date: string) => {
    return sessions.filter(s => s.date === date && s.completed);
  }, [sessions]);

  return {
    sessions,
    loading,
    startSession,
    completeSession,
    getTodaySessions,
    getSessionsByDate,
  };
};
