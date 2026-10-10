import { useState, useEffect, useRef, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { TimerState, TimerStatus } from '../types';
import { POMODORO_DURATION } from '../constants';

export const useTimer = (
  initialDuration: number = POMODORO_DURATION,
  onComplete?: () => void
) => {
  const [timerState, setTimerState] = useState<TimerState>({
    status: 'idle',
    remainingSeconds: initialDuration,
    sessionDuration: initialDuration,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const backgroundTimeRef = useRef<number | null>(null);
  const appState = useRef(AppState.currentState);

  // Handle app state changes (background/foreground)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, [timerState.status]);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // App has come to foreground
      if (timerState.status === 'running' && backgroundTimeRef.current) {
        const timeElapsed = Math.floor((Date.now() - backgroundTimeRef.current) / 1000);
        const newRemaining = Math.max(0, timerState.remainingSeconds - timeElapsed);
        
        if (newRemaining === 0) {
          completeTimer();
        } else {
          setTimerState(prev => ({ ...prev, remainingSeconds: newRemaining }));
        }
        backgroundTimeRef.current = null;
      }
    } else if (nextAppState.match(/inactive|background/)) {
      // App has gone to background
      if (timerState.status === 'running') {
        backgroundTimeRef.current = Date.now();
      }
    }
    appState.current = nextAppState;
  };

  // Timer tick
  useEffect(() => {
    if (timerState.status === 'running') {
      intervalRef.current = setInterval(() => {
        setTimerState(prev => {
          const newRemaining = prev.remainingSeconds - 1;
          if (newRemaining <= 0) {
            completeTimer();
            return { ...prev, remainingSeconds: 0, status: 'completed' };
          }
          return { ...prev, remainingSeconds: newRemaining };
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState.status]);

  const completeTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    onComplete?.();
  }, [onComplete]);

  const startTimer = useCallback((sessionId?: string) => {
    setTimerState(prev => ({
      ...prev,
      status: 'running',
      currentSessionId: sessionId,
    }));
  }, []);

  const pauseTimer = useCallback(() => {
    setTimerState(prev => ({ ...prev, status: 'paused' }));
  }, []);

  const resumeTimer = useCallback(() => {
    setTimerState(prev => ({ ...prev, status: 'running' }));
  }, []);

  const resetTimer = useCallback((duration?: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    const newDuration = duration || initialDuration;
    setTimerState({
      status: 'idle',
      remainingSeconds: newDuration,
      sessionDuration: newDuration,
    });
    backgroundTimeRef.current = null;
  }, [initialDuration]);

  return {
    timerState,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
  };
};
