import { ControlPoint } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

type Props = {
  addItem: (text: string) => void;
  type?: string;
};

export function AddItemInput({ addItem, type }: Props) {
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
    setError(null);
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div
		style={{
			display: "flex",
			alignItems: "center",
			gap: 5
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
        style={{padding: "8px"}}
      >
        <ControlPoint />
      </IconButton>
    </div>
  );
}
