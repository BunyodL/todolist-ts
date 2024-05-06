import { ChangeEvent, KeyboardEvent, useState } from "react";
import { TasksFilterValue } from "./App";

export type TaskType = {
  id: string;
  description: string;
  isDone: boolean;
};

type Props = {
  tasks: Array<TaskType>;
  title: string;
  addTask: (text: string) => void;
  removeTask: (id: string) => void;
  filter: TasksFilterValue;
  setFilter: (filter: TasksFilterValue) => void;
  changeStatus: (id: string, b: boolean) => void;
};

const TodoList = ({
  tasks,
  title,
  addTask,
  removeTask,
  setFilter,
  filter,
  changeStatus,
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

    addTask(newTaskTitle.trim());
    setNewTaskTitle("");
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const allFilter = () => setFilter("all");
  const activeFilter = () => setFilter("active");
  const completedFilter = () => setFilter("completed");

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
          const removeTaskHandler = () => removeTask(t.id);
          const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeStatus(t.id, e.currentTarget.checked);
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
              <span>{t.description}</span>
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
