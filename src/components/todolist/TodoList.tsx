import React from 'react';
import { AddItemInput } from '../common/AddItemInput/AddItemInput';
import { EditableSpan } from '../common/EditableSpan/EditableSpan';
import { Paper, Typography } from '@mui/material';
import { TasksFilterValue } from '../../@types/todolist/todolist.types';
import { useAppSelector } from '../../state/store';
import { EmptyTasks } from './EmptyTasks';
import { Task } from './Task';
import { FilterButtons } from './FilterButtons';
import {
  useFilterTasks,
  useFilterButtonsHandlers,
  useTaskHandlers,
  useTodoListHandlers,
} from '../../hooks';
import { DeleteButton } from '../common/DeleteButton';

type Props = {
  id: string;
  title: string;
  filter: TasksFilterValue;
  changeTodoListFilter: (filter: TasksFilterValue, todolistId: string) => void;
  deleteTodolist: (id: string) => void;
  changeTodoListTitle: (todolistId: string, title: string) => void;
};

export const TodoList = React.memo(
  ({
    title,
    changeTodoListFilter,
    filter,
    id,
    deleteTodolist,
    changeTodoListTitle,
  }: Props) => {
    const tasks = useAppSelector((s) => s.tasks[id]);

    const {
      handleAddTask,
      handleRemoveTask,
      onChangeTaskTitle,
      onTaskStatusChange,
    } = useTaskHandlers(id);

    const { activeFilter, allFilter, completedFilter } =
      useFilterButtonsHandlers(id, changeTodoListFilter);

    const { onChangeTodoListTitle, removeTodolist } = useTodoListHandlers(
      id,
      deleteTodolist,
      changeTodoListTitle
    );

    const filteredTasks = useFilterTasks(tasks, filter);

    return (
      <Paper
        elevation={4}
        sx={{
          padding: '5px 20px',
        }}
      >
        <Typography
          variant="h5"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBlock: '1rem',
            fontWeight: 600,
          }}
        >
          <EditableSpan
            onChangeItemTitle={onChangeTodoListTitle}
            title={title}
          />
          <DeleteButton onClick={removeTodolist} />
        </Typography>

        <AddItemInput
          addItem={handleAddTask}
          type={'task'}
        />
        <div
          style={{
            paddingBlock: '10px',
          }}
        >
          {!filteredTasks.length ? (
            <EmptyTasks />
          ) : (
            filteredTasks.map((t) => (
              <Task
                task={t}
                key={t.id}
                removeTask={handleRemoveTask}
                onTaskStatusChange={onTaskStatusChange}
                onChangeTaskTitle={onChangeTaskTitle}
              />
            ))
          )}
        </div>

        <FilterButtons
          activeFilter={activeFilter}
          allFilter={allFilter}
          completedFilter={completedFilter}
          filter={filter}
        />
      </Paper>
    );
  }
);
