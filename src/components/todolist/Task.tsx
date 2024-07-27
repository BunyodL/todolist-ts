import React, { ChangeEvent } from 'react';
import { Checkbox } from '@mui/material';
import { EditableSpan } from '../common/EditableSpan/EditableSpan';
import { TaskType } from '../../@types/todolist';
import { DeleteButton } from '../common/DeleteButton';

type Props = {
  task: TaskType;
  removeTask: (taskId: string) => void;
  onTaskStatusChange: (isDone: boolean, taskId: string) => void;
  onChangeTaskTitle: (title: string, taskId: string) => void;
};

export const Task = React.memo(
  ({ task, onTaskStatusChange, removeTask, onChangeTaskTitle }: Props) => {
    const removeTaskHandler = () => {
      removeTask(task.id);
    };

    const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onTaskStatusChange(e.currentTarget.checked, task.id);
    };

    const taskTitleHandler = (title: string) => {
      onChangeTaskTitle(title, task.id);
    };

    return (
      <div
        data-testid="task"
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
            onChangeItemTitle={taskTitleHandler}
          />
        </div>
        <DeleteButton
          onClick={removeTaskHandler}
          type="task"
        />
      </div>
    );
  }
);
