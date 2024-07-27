import { combineReducers, legacy_createStore } from 'redux';
import { Provider } from 'react-redux';
import { todolistsReducer } from '../../state/todolists-reducer';
import { tasksReducer } from '../../state/tasks-reducer';
import { v1 } from 'uuid';

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
});

const initialGlobalState = {
  todolists: [
    { id: 'todolistId1', title: 'What to learn', filter: 'all' },
    { id: 'todolistId2', title: 'What to buy', filter: 'all' },
  ],
  tasks: {
    todolistId1: [
      { id: v1(), title: 'React', isDone: true },
      { id: v1(), title: 'TypeScript', isDone: true },
      { id: v1(), title: 'WebSocket', isDone: false },
    ],
    todolistId2: [],
  },
};

export const storybookStore = legacy_createStore(rootReducer, initialGlobalState as any);

export const withProviderDecorator = (component: any) => {
  return <Provider store={storybookStore}>{component()}</Provider>;
};
