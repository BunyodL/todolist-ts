import './App.css';
import { TodoList } from './components/todolist/TodoList';
import { AddItemInput } from './components/common/AddItemInput/AddItemInput';
import { Box, Container, Grid, Typography } from '@mui/material';
import { TasksFilterValue } from './@types/todolist';
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	deleteTodolistAC,
} from './state/todolists-reducer';
import { useAppDispatch, useAppSelector } from './state/store';
import { useCallback } from 'react';
import { Header } from './components/header/Header';

export function AppWithRedux() {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector((s) => s.todolists);

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistAC(title));
    },
    [dispatch]
  );

  const deleteTodolist = useCallback(
    (todolistId: string) => {
      dispatch(deleteTodolistAC(todolistId));
    },
    [dispatch]
  );

  const changeTodoListFilter = useCallback(
    (filter: TasksFilterValue, todolistId: string) => {
      dispatch(changeTodolistFilterAC(todolistId, filter));
    },
    [dispatch]
  );

  const changeTodoListTitle = useCallback(
    (todolistId: string, title: string) => {
      dispatch(changeTodolistTitleAC(todolistId, title));
    },
    [dispatch]
  );

  return (
    <div className="App">
      <Header />

      <Container
        sx={{
          paddingBottom: 10,
        }}
      >
        <Box
          sx={{
            paddingBlock: '20px',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              paddingBottom: 2,
            }}
          >
            Create todolist
          </Typography>
          <AddItemInput addItem={addTodolist} />
        </Box>
        <hr style={{ opacity: 0.5, marginBottom: '15px' }} />
        <Typography
          variant="h4"
          sx={{
            paddingBottom: 2,
          }}
        >
          Todolists
        </Typography>

        <Grid
          container
          spacing={4}
        >
          {todolists.map((tl) => {
            return (
              <Grid
                item
                key={tl.id}
              >
                <TodoList
                  key={tl.id}
                  id={tl.id}
                  title={tl.title}
                  filter={tl.filter}
                  changeTodoListFilter={changeTodoListFilter}
                  deleteTodolist={deleteTodolist}
                  changeTodoListTitle={changeTodoListTitle}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}
