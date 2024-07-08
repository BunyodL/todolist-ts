import { addTodolistAC, todolistsReducer } from './todolists-reducer';
import { tasksReducer } from './tasks-reducer';
import { TodoListType, TodoListsTasksType } from '../@types/todolist/todolist.types';

test('ids in tasks and todolists should be equal', () => {
  const todolists: Array<TodoListType> = [];
  const tasks: TodoListsTasksType = {};

  const action = addTodolistAC('new Todo');
  const tasksEndState = tasksReducer(tasks, action);
  const todolistsEndState = todolistsReducer(todolists, action);

  const keys = Object.keys(tasksEndState);
  const idFromTasks = keys[0];
  const idFromTodolists = todolistsEndState[0].id;

  expect(idFromTasks).toStrictEqual(action.todolistId);
  expect(idFromTodolists).toStrictEqual(action.todolistId);
});
