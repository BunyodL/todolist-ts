import { Done } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';

type Props = {
  title: string;
  onChangeItemTitle: (title: string) => void;
};

export const EditableSpan = React.memo(({ title, onChangeItemTitle }: Props) => {
  const [spanTitle, setSpanTitle] = useState('');
  const [editMode, setEditMode] = useState(false);

  const activateEditMode = useCallback(() => {
    setSpanTitle(title);
    setEditMode(true);
  }, [title]);

  const activateViewMode = useCallback(() => {
    onChangeItemTitle(spanTitle);
    setEditMode(false);
  }, [onChangeItemTitle, spanTitle]);

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setSpanTitle(e.currentTarget.value);
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
        value={spanTitle}
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
    <span onDoubleClick={activateEditMode}>{title}</span>
  );
});
