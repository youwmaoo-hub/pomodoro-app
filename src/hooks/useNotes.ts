import { useState, useEffect, useCallback } from 'react';
import { Note } from '../types';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../constants';
import { generateId } from '../utils/helpers';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const savedNotes = await storage.getItem<Note[]>(STORAGE_KEYS.NOTES);
    if (savedNotes) {
      setNotes(savedNotes);
    }
    setLoading(false);
  };

  const saveNotes = async (updatedNotes: Note[]) => {
    await storage.setItem(STORAGE_KEYS.NOTES, updatedNotes);
    setNotes(updatedNotes);
  };

  const addNote = useCallback(async (title: string, content: string) => {
    const newNote: Note = {
      id: generateId(),
      title,
      content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const updatedNotes = [newNote, ...notes];
    await saveNotes(updatedNotes);
  }, [notes]);

  const updateNote = useCallback(async (noteId: string, title: string, content: string) => {
    const updatedNotes = notes.map(note => {
      if (note.id === noteId) {
        return { ...note, title, content, updatedAt: Date.now() };
      }
      return note;
    });
    await saveNotes(updatedNotes);
  }, [notes]);

  const deleteNote = useCallback(async (noteId: string) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    await saveNotes(updatedNotes);
  }, [notes]);

  return {
    notes,
    loading,
    addNote,
    updateNote,
    deleteNote,
  };
};
