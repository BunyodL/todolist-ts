import { ChangeEvent } from 'react';
import { AddItemInput } from '../common/AddItemInput';
import { EditableSpan } from '../common/EditableSpan';
import { Button, Checkbox, IconButton, Typography } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { TasksFilterValue } from '../../@types/todolist/todolist.types';
import { useAppDispatch, useAppSelector } from '../../state/store';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from '../../state/tasks-reducer';

type Props = {
  id: string;
  title: string;
  filter: TasksFilterValue;
  changeTodoListFilter: (filter: TasksFilterValue, todolistId: string) => void;
  deleteTodolist: (id: string) => void;
  changeTodoListTitle: (todolistId: string, title: string) => void;
};

export const TodoList = ({
  title,
  changeTodoListFilter,
  filter,
  id,
  deleteTodolist,
  changeTodoListTitle,
}: Props) => {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector((s) => s.tasks[id]);

  function handleAddTask(text: string) {
    dispatch(addTaskAC(text, id));
  }

  const allFilter = () => changeTodoListFilter('all', id);
  const activeFilter = () => changeTodoListFilter('active', id);
  const completedFilter = () => changeTodoListFilter('completed', id);

  const removeTodolist = () => deleteTodolist(id);

  const onChangeTodoListTitle = (title: string) => {
    changeTodoListTitle(id, title);
  };

  let tasksForTodolist = tasks;

  if (filter === 'active') {
    tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone);
  }

  if (filter === 'completed') {
    tasksForTodolist = tasksForTodolist.filter((t) => t.isDone);
  }

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
        {!tasksForTodolist.length ? (
          <NoTasksHere />
        ) : (
          tasksForTodolist.map((t) => {
            const removeTaskHandler = () => {
              dispatch(removeTaskAC(t.id, id));
            };
            const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
              dispatch(changeTaskStatusAC(e.currentTarget.checked, t.id, id));
            };

            const onChangeTaskTitle = (title: string) => {
              dispatch(changeTaskTitleAC(title, t.id, id));
            };

            return (
              <div
                key={t.id}
                className={t.isDone ? 'is-done' : ''}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Checkbox
                    checked={t.isDone}
                    onChange={checkboxHandler}
                    style={{ padding: 0 }}
                  />
                  <EditableSpan
                    title={t.title}
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
          })
        )}
      </div>

      <div
        style={{
          paddingBlock: '10px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          variant={filter === 'all' ? 'contained' : 'text'}
          onClick={allFilter}
          title="All tasks"
        >
          All
        </Button>
        <Button
          color="success"
          variant={filter === 'active' ? 'contained' : 'text'}
          onClick={activeFilter}
          title="Active tasks"
        >
          Active
        </Button>
        <Button
          color="error"
          variant={filter === 'completed' ? 'contained' : 'text'}
          onClick={completedFilter}
          title="Completed tasks"
        >
          Completed
        </Button>
      </div>
    </div>
  );
};

function NoTasksHere() {
  return (
    <Typography
      variant="h6"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBlock: '1rem',
        fontWeight: 400,
        opacity: 0.5,
      }}
    >
      There are no tasks here...
    </Typography>
  );
}
