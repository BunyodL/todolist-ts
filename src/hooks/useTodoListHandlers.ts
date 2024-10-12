import { useCallback } from "react";
import { clearCompletedTasks } from "../state/tasks-reducer";
import { useAppDispatch } from "../state/store";

export const useTodoListHandlers = (
  todolistId: string,
  deleteTodolist: (todolistId: string) => void,
  changeTodoListTitle: (todolistId: string, title: string) => void,
) => {
  const dispatch = useAppDispatch();

  const removeTodolist = useCallback(
    () => deleteTodolist(todolistId),
    [deleteTodolist, todolistId],
  );

  const onChangeTodoListTitle = useCallback(
    (title: string) => {
      changeTodoListTitle(todolistId, title);
    },
    [changeTodoListTitle, todolistId],
  );

  const handleClearCompletedTasks = useCallback(() => {
    dispatch(clearCompletedTasks(todolistId));
  }, [todolistId, dispatch]);

  return {
    removeTodolist,
    onChangeTodoListTitle,
    handleClearCompletedTasks,
  };
};
