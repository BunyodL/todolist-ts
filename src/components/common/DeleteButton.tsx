import { DeleteOutline } from '@mui/icons-material';
import { IconButton } from '@mui/material';

type Props = {
  type?: 'task' | 'todolist';
	onClick: () => void
};

export function DeleteButton({ type, onClick }: Props) {
  return (
    <IconButton
      onClick={onClick}
      color="error"
      title={type === 'task' ? 'Delete task' : 'Delete todolist'}
    >
      <DeleteOutline />
    </IconButton>
  );
}
