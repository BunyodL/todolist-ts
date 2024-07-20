import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { ControlPoint } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';

type Props = {
  addItem: (title: string) => void;
  type?: 'task' | 'todolist';
};

export const AddItemInput = React.memo(({ addItem, type }: Props) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) {
      setError('Title is required');
      setNewTaskTitle('');
      return;
    }

    addItem(newTaskTitle.trim());
    setNewTaskTitle('');
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
      }}
    >
      <TextField
        value={newTaskTitle}
        onChange={handleNewTaskTitle}
        onKeyDown={onKeyDownHandler}
        helperText={error}
        error={!!error}
        label="Create"
      />
      <IconButton
        onClick={handleAddTask}
        size="large"
        color="info"
        style={{ padding: '8px' }}
        title={type === 'task' ? 'Add task' : 'Add todolist'}
      >
        <ControlPoint />
      </IconButton>
    </div>
  );
});
