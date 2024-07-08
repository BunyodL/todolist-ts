import { v1 } from 'uuid';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  deleteTodolistAC,
  todolistsReducer,
} from './todolists-reducer';
import {
  TasksFilterValue,
  TodoListType,
  TodoListsTasksType,
} from '../@types/todolist/todolist.types';

let todolistId1 = v1();
let todolistId2 = v1();

interface InitialState {
  todolists: Array<TodoListType>;
  tasks: TodoListsTasksType;
}

const todolists: Array<TodoListType> = [
  { id: todolistId1, title: 'What to learn', filter: 'all' },
  { id: todolistId2, title: 'What to buy', filter: 'all' },
];

describe('the todolist', () => {
  test('should be added', () => {
    const todoTitle = 'new Todo';

    const action = addTodolistAC(todoTitle);
    const endState = todolistsReducer(todolists, action);

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(todoTitle);
    expect(endState[0].filter).toBe('all');
    expect(endState[0].id).toBeDefined();
  });

  test('should be deleted', () => {
    const action = deleteTodolistAC(todolistId1);
    const endState = todolistsReducer(todolists, action);

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
  });

  test('must change the title', () => {
    const newTitle = 'Title changed';

    const action = changeTodolistTitleAC(todolistId1, newTitle);
    const endState = todolistsReducer(todolists, action);

    expect(endState[0].title).toBe(newTitle);
    expect(endState[1].title).toBe('What to buy');
    expect(endState.length).toBe(2);
  });

  test('must change the filter', () => {
    const newFilter: TasksFilterValue = 'completed';

    const action = changeTodolistFilterAC(todolistId2, newFilter);
    const endState = todolistsReducer(todolists, action);

    expect(endState[1].filter).toBe(newFilter);
    expect(endState[0].filter).toBe('all');
    expect(endState.length).toBe(2);
  });
});
