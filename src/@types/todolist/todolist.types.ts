export type TodoListType = {
  id: string;
  title: string;
  filter: TasksFilterValue;
};

export type TodoListsTasksType = {
  [key: string]: Array<TaskType>;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksFilterValue = 'all' | 'active' | 'completed';