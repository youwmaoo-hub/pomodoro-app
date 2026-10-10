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
import { useNotes } from '../../hooks/useNotes';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants';
import { formatDateTime } from '../../utils/helpers';

export default function NotesScreen() {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    if (title.trim() || content.trim()) {
      if (editingId) {
        await updateNote(editingId, title.trim(), content.trim());
        setEditingId(null);
      } else {
        await addNote(title.trim() || '无标题', content.trim());
      }
      setTitle('');
      setContent('');
      setIsAdding(false);
    }
  };

  const handleEdit = (id: string, noteTitle: string, noteContent: string) => {
    setEditingId(id);
    setTitle(noteTitle);
    setContent(noteContent);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setTitle('');
    setContent('');
  };

  const handleDelete = (id: string, noteTitle: string) => {
    Alert.alert('删除备忘', `确定要删除"${noteTitle}"吗？`, [
      { text: '取消', style: 'cancel' },
      { text: '删除', onPress: () => deleteNote(id), style: 'destructive' },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>备忘录</Text>
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
        {/* Add/Edit Note */}
        {isAdding && (
          <Card style={styles.editCard}>
            <TextInput
              style={styles.titleInput}
              placeholder="标题"
              placeholderTextColor={Colors.textTertiary}
              value={title}
              onChangeText={setTitle}
              autoFocus={!editingId}
            />
            <TextInput
              style={styles.contentInput}
              placeholder="内容..."
              placeholderTextColor={Colors.textTertiary}
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
            />
            <View style={styles.editActions}>
              <Button
                title="取消"
                onPress={handleCancel}
                variant="ghost"
                size="small"
              />
              <Button
                title={editingId ? '保存' : '添加'}
                onPress={handleSave}
                size="small"
              />
            </View>
          </Card>
        )}

        {/* Notes List */}
        {notes.length > 0 ? (
          <View style={styles.notesList}>
            {notes.map(note => (
              <TouchableOpacity
                key={note.id}
                onPress={() => handleEdit(note.id, note.title, note.content)}
                onLongPress={() => handleDelete(note.id, note.title)}
                delayLongPress={500}
              >
                <Card style={styles.noteCard}>
                  <Text style={styles.noteTitle} numberOfLines={1}>
                    {note.title}
                  </Text>
                  {note.content && (
                    <Text style={styles.noteContent} numberOfLines={3}>
                      {note.content}
                    </Text>
                  )}
                  <Text style={styles.noteTime}>
                    {formatDateTime(note.updatedAt)}
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>暂无备忘</Text>
            <Text style={styles.emptyHint}>点击右上角"+"添加备忘</Text>
          </Card>
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
  editCard: {
    marginBottom: Spacing.lg,
  },
  titleInput: {
    ...Typography.h3,
    color: Colors.text,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  contentInput: {
    ...Typography.body,
    color: Colors.text,
    minHeight: 120,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.md,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.sm,
  },
  notesList: {
    gap: Spacing.md,
  },
  noteCard: {
    marginBottom: 0,
  },
  noteTitle: {
    ...Typography.bodyMedium,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  noteContent: {
    ...Typography.small,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  noteTime: {
    ...Typography.caption,
    color: Colors.textTertiary,
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
