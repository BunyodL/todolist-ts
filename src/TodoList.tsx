import React, { ChangeEvent, useState } from "react";
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
};

const TodoList = ({ tasks, title, addTask, removeTask, setFilter, filter }: Props) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) {
      setNewTaskTitle("");
      return;
    }

    addTask(newTaskTitle.trim());
    setNewTaskTitle("");
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
          onKeyUp={(e) => e.key === "Enter" && handleAddTask()}
        />
        <button onClick={handleAddTask}>+</button>
      </div>

      <ul>
        {tasks.map((t) => {
          const removeTaskHandler = () => removeTask(t.id);

          return (
            <li key={t.id}>
              <input
                type="checkbox"
                checked={t.isDone}
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
