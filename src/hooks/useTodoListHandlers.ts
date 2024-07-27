import { useCallback } from 'react';

export const useTodoListHandlers = (
  todolistId: string,
  deleteTodolist: (todolistId: string) => void,
  changeTodoListTitle: (todolistId: string, title: string) => void
) => {
  const removeTodolist = useCallback(
    () => deleteTodolist(todolistId),
    [deleteTodolist, todolistId]
  );

  const onChangeTodoListTitle = useCallback(
    (title: string) => {
      changeTodoListTitle(todolistId, title);
    },
    [changeTodoListTitle, todolistId]
  );

  return {
    removeTodolist,
    onChangeTodoListTitle,
  };
};
