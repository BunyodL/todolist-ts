import { DeleteOutline } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';

type Props = {
  type?: 'task' | 'todolist';
	onClick: () => void
};

export function DeleteButton({ type, onClick }: Props) {
  return (
    <IconButton
      onClick={onClick}
      data-testid={type === 'task' ? 'delete-task' : 'delete-todolist'}
      color="error"
      title={type === 'task' ? 'Delete task' : 'Delete todolist'}
    >
      <DeleteOutline />
    </IconButton>
  );
}
