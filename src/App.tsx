import { useState } from 'react';
import './App.css';
import { TodoList, TaskType } from './TodoList';
import { v1 } from 'uuid';
import { AddItemInput } from './AddItemInput';
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

export type TasksFilterValue = 'all' | 'active' | 'completed';

export type TodoListType = {
  id: string;
  title: string;
  filter: TasksFilterValue;
};

export type TodoListsTasksType = {
  [key: string]: Array<TaskType>;
};

export function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const [todolists, setTodolists] = useState<Array<TodoListType>>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]);

  const [tasksObj, setTasks] = useState<TodoListsTasksType>({
    [todolistId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'React', isDone: true },
      { id: v1(), title: 'TypeScript', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
      { id: v1(), title: 'WebSocket', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Book', isDone: true },
      { id: v1(), title: 'Groceries', isDone: true },
      { id: v1(), title: 'Phone', isDone: false },
    ],
  });

  function addTask(text: string, todolistId: string) {
    const task: TaskType = {
      id: v1(),
      title: text,
      isDone: false,
    };
    const tasks = tasksObj[todolistId];

    tasksObj[todolistId] = [task, ...tasks];
    setTasks({ ...tasksObj });
  }

  function removeTask(taskId: string, todolistId: string) {
    const tasks = tasksObj[todolistId];
    const newTasks = tasks.filter((t) => t.id !== taskId);
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    const tasks = tasksObj[todolistId];
    const task = tasks.find((t) => t.id === taskId);

    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  }

  function changeTaskTitle(title: string, taskId: string, todolistId: string) {
    const tasks = tasksObj[todolistId];
    const task = tasks.find((t) => t.id === taskId);

    if (task) {
      task.title = title;
      setTasks({ ...tasksObj });
    }
  }

  function addTodolistHandler(title: string) {
    const newTodolist: TodoListType = {
      id: v1(),
      filter: 'all',
      title,
    };

    setTodolists([newTodolist, ...todolists]);
    setTasks({ ...tasksObj, [newTodolist.id]: [] });
  }

  function deleteTodolist(todolistId: string) {
    const updatedTodolists = todolists.filter((t) => t.id !== todolistId);
    setTodolists(updatedTodolists);

    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  }

  function changeFilter(filter: TasksFilterValue, todolistId: string) {
    const todolist = todolists.find((tl) => tl.id === todolistId);

    if (todolist) {
      todolist.filter = filter;
      setTodolists([...todolists]);
    }
  }

  function changeTodoListTitle(title: string, todolistId: string) {
    const todoList = todolists.find((tl) => tl.id === todolistId);

    if (todoList) {
      todoList.title = title;
      setTodolists([...todolists]);
    }
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
          <AddItemInput addItem={addTodolistHandler} />
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
            let tasksForTodolist = tasksObj[tl.id];

            if (tl.filter === 'active') {
              tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone);
            }

            if (tl.filter === 'completed') {
              tasksForTodolist = tasksForTodolist.filter((t) => t.isDone);
            }

            return (
              <Grid item>
                <Paper
                  elevation={4}
                  sx={{
                    padding: '5px 20px',
                  }}
                >
                  <TodoList
                    key={tl.id}
                    id={tl.id}
                    tasks={tasksForTodolist}
                    title={tl.title}
                    addTask={addTask}
                    removeTask={removeTask}
                    filter={tl.filter}
                    changeFilter={changeFilter}
                    changeStatus={changeStatus}
                    deleteTodolist={deleteTodolist}
                    changeTaskTitle={changeTaskTitle}
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
