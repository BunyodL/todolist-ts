import { Done } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

type Props = {
  title: string;
  onChangeItemTitle: (title: string) => void;
};

export function EditableSpan(props: Props) {
  const [title, setTitle] = useState('');
  const [editMode, setEditMode] = useState(false);

  const activateEditMode = () => {
    setTitle(props.title);
    setEditMode(true);
  };

  const activateViewMode = () => {
    props.onChangeItemTitle(title);
    setEditMode(false);
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      activateViewMode();
    }
  };

  return editMode ? (
    <FormControl
      sx={{ m: 1, width: '15rem' }}
      variant="outlined"
      size="small"
    >
      <OutlinedInput
        id="outlined-adornment-span"
        onBlur={activateViewMode}
        value={title}
        autoFocus
        onChange={onChangeTitle}
        onKeyDown={onKeyDownHandler}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="confirm changes"
              onClick={activateViewMode}
              edge="end"
              size="small"
            >
              <Done />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
}
