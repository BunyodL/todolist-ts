import { useReducer } from 'react';
import './App.css';
import { TodoList } from './components/todolist/TodoList';
import { v1 } from 'uuid';
import { AddItemInput } from './components/common/AddItemInput/AddItemInput';
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
  todolistsReducer,
} from './state/todolists-reducer';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from './state/tasks-reducer';

export function AppWithReducers() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]);

  const [allTasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
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

  function addTask(title: string, todolistId: string) {
    const action = addTaskAC(title, todolistId);
    dispatchToTasksReducer(action);
  }

  function removeTask(taskId: string, todolistId: string) {
    const action = removeTaskAC(taskId, todolistId);
    dispatchToTasksReducer(action);
  }

  function changeTaskTitle(title: string, taskId: string, todolistId: string) {
    const action = changeTaskTitleAC(title, taskId, todolistId);
    dispatchToTasksReducer(action);
  }

  function changeTaskStatus(isDone: boolean, taskId: string, todolistId: string) {
    const action = changeTaskStatusAC(isDone, taskId, todolistId);
    dispatchToTasksReducer(action);
  }

  function addTodolist(title: string) {
    const action = addTodolistAC(title);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action);
  }

  function deleteTodolist(todolistId: string) {
    const action = deleteTodolistAC(todolistId);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action);
  }

  function changeTodoListFilter(filter: TasksFilterValue, todolistId: string) {
    const action = changeTodolistFilterAC(todolistId, filter);
    dispatchToTodolistsReducer(action);
  }

  function changeTodoListTitle(todolistId: string, title: string) {
    const action = changeTodolistTitleAC(todolistId, title);
    dispatchToTodolistsReducer(action);
  }

  return null;
  // return (
  //   <div className="App">
  //     <Box sx={{ flexGrow: 1 }}>
  //       <AppBar position="static">
  //         <Toolbar>
  //           <IconButton
  //             size="large"
  //             edge="start"
  //             color="inherit"
  //             aria-label="menu"
  //             sx={{ mr: 2 }}
  //           >
  //             <Menu />
  //           </IconButton>
  //           <Typography
  //             variant="h6"
  //             component="div"
  //             sx={{ flexGrow: 1 }}
  //           >
  //             Todo Lists
  //           </Typography>
  //           <Button color="inherit">Login</Button>
  //         </Toolbar>
  //       </AppBar>
  //     </Box>

  //     <Container
  //       sx={{
  //         paddingBottom: 10,
  //       }}
  //     >
  //       <Box
  //         sx={{
  //           paddingBlock: '20px',
  //         }}
  //       >
  //         <Typography
  //           variant="h4"
  //           sx={{
  //             paddingBottom: 2,
  //           }}
  //         >
  //           Create todolist
  //         </Typography>
  //         <AddItemInput addItem={addTodolist} />
  //       </Box>
  //       <hr style={{ opacity: 0.5, marginBottom: '15px' }} />
  //       <Typography
  //         variant="h4"
  //         sx={{
  //           paddingBottom: 2,
  //         }}
  //       >
  //         Todolists
  //       </Typography>
  //       <Grid
  //         container
  //         spacing={4}
  //       >
  //         {todolists.map((tl) => {
  //           let tasksForTodolist = allTasks[tl.id];

  //           if (tl.filter === 'active') {
  //             tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone);
  //           }

  //           if (tl.filter === 'completed') {
  //             tasksForTodolist = tasksForTodolist.filter((t) => t.isDone);
  //           }

  //           return (
  //             <Grid item>
  //               <Paper
  //                 elevation={4}
  //                 sx={{
  //                   padding: '5px 20px',
  //                 }}
  //               >
  //                 <TodoList
  //                   key={tl.id}
  //                   id={tl.id}
  //                   // @ts-ignore
  //                   tasks={tasksForTodolist}
  //                   title={tl.title}
  //                   addTask={addTask}
  //                   removeTask={removeTask}
  //                   filter={tl.filter}
  //                   changeTodoListFilter={changeTodoListFilter}
  //                   changeTaskStatus={changeTaskStatus}
  //                   deleteTodolist={deleteTodolist}
  //                   changeTaskTitle={changeTaskTitle}
  //                   changeTodoListTitle={changeTodoListTitle}
  //                 />
  //               </Paper>
  //             </Grid>
  //           );
  //         })}
  //       </Grid>
  //     </Container>
  //   </div>
  // );
}
