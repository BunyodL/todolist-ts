import React, { ChangeEvent, useCallback } from 'react';
import { Checkbox, IconButton } from '@mui/material';
import { EditableSpan } from '../common/EditableSpan';
import { DeleteOutline } from '@mui/icons-material';
import { TaskType } from '../../@types/todolist';
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../../state/tasks-reducer';
import { useAppDispatch } from '../../state/store';

type Props = {
  todolistId: string;
  task: TaskType;
};

export const Task = React.memo(({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch();

  const removeTaskHandler = useCallback(() => {
    dispatch(removeTaskAC(task.id, todolistId));
  }, [dispatch, task.id, todolistId]);

  const checkboxHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(changeTaskStatusAC(e.currentTarget.checked, task.id, todolistId));
    },
    [dispatch, task.id, todolistId]
  );

  const onChangeTaskTitle = useCallback(
    (title: string) => {
      dispatch(changeTaskTitleAC(title, task.id, todolistId));
    },
    [dispatch, task.id, todolistId]
  );

  return (
    <div
      className={task.isDone ? 'is-done' : ''}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Checkbox
          checked={task.isDone}
          onChange={checkboxHandler}
          style={{ padding: 0 }}
        />
        <EditableSpan
          title={task.title}
          onChangeItemTitle={onChangeTaskTitle}
        />
      </div>
      <IconButton
        onClick={removeTaskHandler}
        color="error"
        title={'Delete task'}
      >
        <DeleteOutline />
      </IconButton>
    </div>
  );
});
