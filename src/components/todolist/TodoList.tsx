import React, { useCallback, useMemo } from 'react';
import { AddItemInput } from '../common/AddItemInput';
import { EditableSpan } from '../common/EditableSpan';
import { IconButton, Typography } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { TasksFilterValue } from '../../@types/todolist/todolist.types';
import { useAppDispatch, useAppSelector } from '../../state/store';
import {
	addTaskAC
} from '../../state/tasks-reducer';
import { EmptyTasks } from './EmptyTasks';
import { Task } from './Task';
import { FilterButtons } from './FilterButtons';

type Props = {
  id: string;
  title: string;
  filter: TasksFilterValue;
  changeTodoListFilter: (filter: TasksFilterValue, todolistId: string) => void;
  deleteTodolist: (id: string) => void;
  changeTodoListTitle: (todolistId: string, title: string) => void;
};

export const TodoList = React.memo(
  ({ title, changeTodoListFilter, filter, id, deleteTodolist, changeTodoListTitle }: Props) => {
    const dispatch = useAppDispatch();

    const tasks = useAppSelector((s) => s.tasks[id]);

    const handleAddTask = useCallback(
      (title: string) => {
        dispatch(addTaskAC(title, id));
      },
      [dispatch, id]
    );

    const allFilter = useCallback(
      () => changeTodoListFilter('all', id),
      [changeTodoListFilter, id]
    );

    const activeFilter = useCallback(
      () => changeTodoListFilter('active', id),
      [changeTodoListFilter, id]
    );

    const completedFilter = useCallback(
      () => changeTodoListFilter('completed', id),
      [changeTodoListFilter, id]
    );

    const removeTodolist = useCallback(() => deleteTodolist(id), [deleteTodolist, id]);

    const onChangeTodoListTitle = useCallback(
      (title: string) => {
        changeTodoListTitle(id, title);
      },
      [changeTodoListTitle, id]
    );

    const filteredTasks = useMemo(() => {
      let tasksForTodolist = tasks;
      if (filter === 'active') {
        return (tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone));
      }
      if (filter === 'completed') {
        return (tasksForTodolist = tasksForTodolist.filter((t) => t.isDone));
      }
      return tasksForTodolist;
    }, [filter, tasks]);

    return (
      <div className="todoList">
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
          <IconButton
            onClick={removeTodolist}
            color="error"
            title={'Delete todolist'}
          >
            <DeleteOutline />
          </IconButton>
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
                todolistId={id}
                key={t.id}
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
      </div>
    );
  }
);
