import { useCallback } from 'react';
import { TasksFilterValue } from '../@types/todolist';

export const useFilterButtonsHandlers = (
  todolistId: string,
  changeTodoListFilter: (filter: TasksFilterValue, todolistId: string) => void
) => {
  const allFilter = useCallback(
    () => changeTodoListFilter('all', todolistId),
    [changeTodoListFilter, todolistId]
  );

  const activeFilter = useCallback(
    () => changeTodoListFilter('active', todolistId),
    [changeTodoListFilter, todolistId]
  );

  const completedFilter = useCallback(
    () => changeTodoListFilter('completed', todolistId),
    [changeTodoListFilter, todolistId]
  );

  return {
    allFilter,
    activeFilter,
    completedFilter,
  };
};
