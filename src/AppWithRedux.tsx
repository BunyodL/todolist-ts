import './App.css';
import { TodoList } from './components/todolist/TodoList';
import { AddItemInput } from './components/common/AddItemInput';
import {
	AppBar,
	Box,
	Button,
	Container,
	Grid,
	IconButton,
	Paper,
	Toolbar,
	Typography,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { TasksFilterValue } from './@types/todolist';
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	deleteTodolistAC,
} from './state/todolists-reducer';
import { useAppDispatch, useAppSelector } from './state/store';

export function AppWithRedux() {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector((s) => s.todolists);

  function addTodolist(title: string) {
    dispatch(addTodolistAC(title));
  }

  function deleteTodolist(todolistId: string) {
    dispatch(deleteTodolistAC(todolistId));
  }

  function changeTodoListFilter(filter: TasksFilterValue, todolistId: string) {
    dispatch(changeTodolistFilterAC(todolistId, filter));
  }

  function changeTodoListTitle(todolistId: string, title: string) {
    dispatch(changeTodolistTitleAC(todolistId, title));
  }

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Todo Lists
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

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
                <Paper
                  elevation={4}
                  sx={{
                    padding: '5px 20px',
                  }}
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
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}
