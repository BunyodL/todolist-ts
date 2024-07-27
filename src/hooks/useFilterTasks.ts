import { useMemo } from "react";
import { TaskType, TasksFilterValue } from "../@types/todolist";

export const useFilterTasks = (tasks: Array<TaskType>, filter: TasksFilterValue) => {
	const filteredTasks = useMemo(() => {
		let tasksForTodolist = tasks;
		if (filter === 'active') {
			tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone);
		}
		if (filter === 'completed') {
			tasksForTodolist = tasksForTodolist.filter((t) => t.isDone);
		}
		return tasksForTodolist;
	}, [filter, tasks]);

	return filteredTasks;
}