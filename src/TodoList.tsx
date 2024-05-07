import { ChangeEvent, KeyboardEvent, useState } from "react";
import { TasksFilterValue } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type Props = {
  tasks: Array<TaskType>;
  title: string;
  addTask: (text: string, todolistId: string) => void;
  removeTask: (id: string, todolistId: string) => void;
  filter: TasksFilterValue;
  changeFilter: (filter: TasksFilterValue, todolistId: string) => void;
  changeStatus: (id: string, b: boolean, todolistId: string) => void;
  id: string;
};

const TodoList = ({
  tasks,
  title,
  addTask,
  removeTask,
  changeFilter,
  filter,
  changeStatus,
  id,
}: Props) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) {
      setError("Title is required");
      setNewTaskTitle("");
      return;
    }

    addTask(newTaskTitle.trim(), id);
    setNewTaskTitle("");
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const allFilter = () => changeFilter("all", id);
  const activeFilter = () => changeFilter("active", id);
  const completedFilter = () => changeFilter("completed", id);

  return (
    <div className="todoList">
      <h3>{title}</h3>

      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={handleNewTaskTitle}
          onKeyDown={onKeyDownHandler}
          className={error ? "error" : ""}
        />
        <button onClick={handleAddTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>

      <ul>
        {tasks.map((t) => {
          const removeTaskHandler = () => removeTask(t.id, id);
          const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeStatus(t.id, e.currentTarget.checked, id);
          };

          return (
            <li
              key={t.id}
              className={t.isDone ? "is-done" : ""}
            >
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={checkboxHandler}
              />
              <span>{t.title}</span>
              <button onClick={removeTaskHandler}>x</button>
            </li>
          );
        })}
      </ul>

      <div>
        <button
          className={filter === "all" ? "active" : undefined}
          onClick={allFilter}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active" : undefined}
          onClick={activeFilter}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active" : undefined}
          onClick={completedFilter}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;
