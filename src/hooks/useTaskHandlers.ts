import { useCallback } from 'react';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from '../state/tasks-reducer';
import { useAppDispatch } from '../state/store';

export const useTaskHandlers = (todolistId: string) => {
  const dispatch = useAppDispatch();

  const handleAddTask = useCallback(
    (title: string) => {
      dispatch(addTaskAC(title, todolistId));
    },
    [dispatch, todolistId]
  );

  const handleRemoveTask = useCallback(
    (taskId: string) => {
      dispatch(removeTaskAC(taskId, todolistId));
    },
    [dispatch, todolistId]
  );

  const onTaskStatusChange = useCallback(
    (isDone: boolean, taskId: string) => {
      dispatch(changeTaskStatusAC(isDone, taskId, todolistId));
    },
    [dispatch, todolistId]
  );

  const onChangeTaskTitle = useCallback(
    (title: string, taskId: string) => {
      dispatch(changeTaskTitleAC(title, taskId, todolistId));
    },
    [dispatch, todolistId]
  );

  return {
    handleAddTask,
    handleRemoveTask,
    onTaskStatusChange,
    onChangeTaskTitle,
  };
};
