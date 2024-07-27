import { v1 } from 'uuid';
import { TasksFilterValue, TodoListType } from '../@types/todolist/todolist.types';

export const todolistId1 = v1();
export const todolistId2 = v1();

// const initialState: Array<TodoListType> = [
//   { id: todolistId1, title: 'What to learn', filter: 'all' },
//   { id: todolistId2, title: 'What to buy', filter: 'all' },
// ];

const initialState: Array<TodoListType> = [];

export const ADD_TODOLIST = 'ADD_TODOLIST';
export const DELETE_TODOLIST = 'DELETE_TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER';

export const todolistsReducer = (
  state = initialState,
  action: ActionsType
): Array<TodoListType> => {
  switch (action.type) {
    case ADD_TODOLIST: {
      return [
        {
          filter: 'all',
          id: action.todolistId,
          title: action.title,
        },
        ...state,
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
      return state;
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

export const addTodolistAC = (title: string): AddTodolistType => ({
  type: ADD_TODOLIST,
  title,
  todolistId: v1(),
});

export const deleteTodolistAC = (todolistId: string): DeleteTodolistType => ({
  type: DELETE_TODOLIST,
  todolistId,
});

export const changeTodolistTitleAC = (
  todolistId: string,
  title: string
): ChangeTodolistTitleType => ({
  type: CHANGE_TODOLIST_TITLE,
  todolistId,
  title,
});

export const changeTodolistFilterAC = (
  todolistId: string,
  filter: TasksFilterValue
): ChangeTodolistFilterType => ({
  type: CHANGE_TODOLIST_FILTER,
  todolistId,
  filter,
});
