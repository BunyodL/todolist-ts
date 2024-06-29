import { v1 } from 'uuid';
import { TasksFilterValue, TodoListType } from '../components/todolist/todolist.types';

let todolistId1 = v1();
let todolistId2 = v1();

const initialState: Array<TodoListType> = [
  { id: todolistId1, title: 'What to learn', filter: 'all' },
  { id: todolistId2, title: 'What to buy', filter: 'all' },
];

export const ADD_TODOLIST = 'ADD_TODOLIST';
export const DELETE_TODOLIST = 'DELETE_TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER';

export const todolistsReducer = (
  state: Array<TodoListType> = initialState,
  action: ActionsType
): Array<TodoListType> => {
  switch (action.type) {
    case ADD_TODOLIST: {
      return [
        ...state,
        {
          filter: 'all',
          id: action.todolistId,
          title: action.title,
        },
      ];
    }

    case DELETE_TODOLIST: {
      return state.filter((t) => t.id !== action.todolistId);
    }

    case CHANGE_TODOLIST_TITLE: {
      return state.map((todolist) => {
        if (todolist.id === action.todolistId) {
          return {
            ...todolist,
            title: action.title,
          };
        } else return todolist;
      });
    }

    case CHANGE_TODOLIST_FILTER: {
      return state.map((todolist) => {
        if (todolist.id === action.todolistId) {
          return {
            ...todolist,
            filter: action.filter,
          };
        } else return todolist;
      });
    }

    default:
      throw new Error("I don't know this action type");
  }
};

export type AddTodolistType = {
  type: typeof ADD_TODOLIST;
  title: string;
  todolistId: string;
};

export type DeleteTodolistType = {
  type: typeof DELETE_TODOLIST;
  todolistId: string;
};

type ChangeTodolistTitleType = {
  type: typeof CHANGE_TODOLIST_TITLE;
  todolistId: string;
  title: string;
};

type ChangeTodolistFilterType = {
  type: typeof CHANGE_TODOLIST_FILTER;
  todolistId: string;
  filter: TasksFilterValue;
};

type ActionsType =
  | AddTodolistType
  | DeleteTodolistType
  | ChangeTodolistTitleType
  | ChangeTodolistFilterType;

export const addTodolist = (title: string): AddTodolistType => ({
  type: ADD_TODOLIST,
  title,
  todolistId: v1(),
});

export const deleteTodolist = (todolistId: string): DeleteTodolistType => ({
  type: DELETE_TODOLIST,
  todolistId,
});

export const changeTodolistTitle = (
  todolistId: string,
  title: string
): ChangeTodolistTitleType => ({
  type: CHANGE_TODOLIST_TITLE,
  todolistId,
  title,
});

export const changeTodolistFilter = (
  todolistId: string,
  filter: TasksFilterValue
): ChangeTodolistFilterType => ({
  type: CHANGE_TODOLIST_FILTER,
  todolistId,
  filter,
});
