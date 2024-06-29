import { v1 } from 'uuid';
import { TodoListsTasksType } from '../components/todolist/todolist.types';
import {
  addTask,
  changeTaskStatus,
  changeTaskTitle,
  removeTask,
  tasksReducer,
} from './tasks-reducer';
import { addTodolist, deleteTodolist } from './todolists-reducer';

const todolistId1 = v1();
const todolistId2 = v1();
const task1Id1 = v1();
const task1Id2 = v1();
const task1Id3 = v1();
const task1Id4 = v1();
const task1Id5 = v1();
const task2Id1 = v1();
const task2Id2 = v1();
const task2Id3 = v1();
const task2Id4 = v1();

const allTasks: TodoListsTasksType = {
  [todolistId1]: [
    { id: task1Id1, title: 'HTML&CSS', isDone: true },
    { id: task1Id2, title: 'React', isDone: true },
    { id: task1Id3, title: 'TypeScript', isDone: true },
    { id: task1Id4, title: 'GraphQL', isDone: false },
    { id: task1Id5, title: 'WebSocket', isDone: false },
  ],
  [todolistId2]: [
    { id: task2Id1, title: 'Book', isDone: true },
    { id: task2Id2, title: 'Groceries', isDone: true },
    { id: task2Id3, title: 'Phone', isDone: false },
    { id: task2Id4, title: 'Job', isDone: false },
  ],
};

describe('the task', () => {
  test('should be added', () => {
    const taskTitle = 'new task';

    const action = addTask(taskTitle, todolistId2);
    const endState = tasksReducer(allTasks, action);

    expect(endState[todolistId2].length).toBe(5);
    expect(endState[todolistId2][0].title).toBe(taskTitle);
    expect(endState[todolistId2][0].id).toBeDefined();
    expect(endState[todolistId2][0].isDone).toBeFalsy();
    expect(endState[todolistId1].length).toBe(5);
  });

  test('should be removed', () => {
    const action = removeTask(task1Id3, todolistId1);
    const endState = tasksReducer(allTasks, action);

    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId2].length).toBe(4);
    expect(endState[todolistId1].every((t) => t.id !== task1Id3)).toBeTruthy();
  });

  test('should change the title', () => {
    const newTitle = 'Title changed';

    const action = changeTaskTitle(newTitle, task2Id2, todolistId2);
    const endState = tasksReducer(allTasks, action);

    expect(endState[todolistId2][1].title).toBe(newTitle);
    expect(endState[todolistId2][0].title).toBe('Book');
    expect(endState[todolistId1][3].title).toBe('GraphQL');
    expect(endState[todolistId2].length).toBe(4);
  });

  test('must change the status', () => {
    const action = changeTaskStatus(true, task1Id4, todolistId1);
    const endState = tasksReducer(allTasks, action);

    expect(endState[todolistId1][3].isDone).toBeTruthy();
    expect(endState[todolistId2][3].isDone).toBeFalsy();
    expect(endState[todolistId1][0].isDone).toBeTruthy();
    expect(endState[todolistId1][4].isDone).toBeFalsy();
    expect(endState[todolistId2][1].isDone).toBeTruthy();
    expect(endState[todolistId2][2].isDone).toBeFalsy();
    expect(endState[todolistId1].length).toBe(5);
  });

  test('new array should be added when new todolist is added', () => {
    const todoTitle = 'new Todo';

    const action = addTodolist(todoTitle);
    const endState = tasksReducer(allTasks, action);

    const keys = Object.keys(endState);
    const newKey = keys.find((k) => k !== todolistId1 && k !== todolistId2);

    if (!newKey) {
      throw new Error('new key is not defined');
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toStrictEqual([]);
  });

  test('the tasks array should be removed when the todolist is deleted', () => {
    const action = deleteTodolist(todolistId1);
    const endState = tasksReducer(allTasks, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(keys[0]).toBe(todolistId2);
    expect(endState[todolistId1]).toBeUndefined();
  });
});
