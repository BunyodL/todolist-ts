import { v1 } from 'uuid';
import { TaskType, TodoListsTasksType } from '../@types/todolist/todolist.types';
import {
  ADD_TODOLIST,
  AddTodolistType,
  DELETE_TODOLIST,
  DeleteTodolistType,
  todolistId1,
  todolistId2,
} from './todolists-reducer';

const task1Id2 = v1();
const task1Id3 = v1();
const task1Id5 = v1();
const task2Id1 = v1();

const initialState: TodoListsTasksType = {
  [todolistId1]: [
    { id: task1Id2, title: 'React', isDone: true },
    { id: task1Id3, title: 'TypeScript', isDone: true },
    { id: task1Id5, title: 'WebSocket', isDone: false },
  ],
  [todolistId2]: [{ id: task2Id1, title: 'Book', isDone: true }],
};

const ADD_TASK = 'ADD_TASK';
const REMOVE_TASK = 'REMOVE_TASK';
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE';
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS';

export const tasksReducer = (
  state: TodoListsTasksType = initialState,
  action: ActionsType
): TodoListsTasksType => {
  switch (action.type) {
    case ADD_TASK: {
      const task: TaskType = {
        id: v1(),
        title: action.title,
        isDone: false,
      };

      return {
        ...state,
        [action.todolistId]: [task, ...state[action.todolistId]],
      };
    }

    case REMOVE_TASK: {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.taskId),
      };
    }

    case CHANGE_TASK_TITLE: {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) => {
          if (task.id === action.taskId) {
            return {
              ...task,
              title: action.title,
            };
          } else return task;
        }),
      };
    }

    case CHANGE_TASK_STATUS: {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) => {
          if (task.id === action.taskId) {
            return {
              ...task,
              isDone: action.isDone,
            };
          } else return task;
        }),
      };
    }

    case ADD_TODOLIST: {
      return {
        ...state,
        [action.todolistId]: [],
      };
    }

    case DELETE_TODOLIST: {
      const stateCopy = { ...state };
      delete stateCopy[action.todolistId];
      return stateCopy;
    }

    default:
      return state;
  }
};

type AddTaskType = {
  type: typeof ADD_TASK;
  title: string;
  todolistId: string;
};

type RemoveTaskType = {
  type: typeof REMOVE_TASK;
  taskId: string;
  todolistId: string;
};

type ChangeTaskTitleType = {
  type: typeof CHANGE_TASK_TITLE;
  taskId: string;
  todolistId: string;
  title: string;
};

type ChangeTaskStatusType = {
  type: typeof CHANGE_TASK_STATUS;
  taskId: string;
  todolistId: string;
  isDone: boolean;
};

type ActionsType =
  | AddTaskType
  | RemoveTaskType
  | ChangeTaskTitleType
  | ChangeTaskStatusType
  | AddTodolistType
  | DeleteTodolistType;

export const addTaskAC = (title: string, todolistId: string): AddTaskType => ({
  type: ADD_TASK,
  title,
  todolistId,
});

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskType => ({
  type: REMOVE_TASK,
  todolistId,
  taskId,
});

export const changeTaskTitleAC = (
  title: string,
  taskId: string,
  todolistId: string
): ChangeTaskTitleType => ({
  type: CHANGE_TASK_TITLE,
  todolistId,
  title,
  taskId,
});

export const changeTaskStatusAC = (
  isDone: boolean,
  taskId: string,
  todolistId: string
): ChangeTaskStatusType => ({
  type: CHANGE_TASK_STATUS,
  todolistId,
  taskId,
  isDone,
});
