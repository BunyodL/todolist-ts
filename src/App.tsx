import { useState } from "react";
import "./App.css";
import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";

export type TasksFilterValue = "all" | "active" | "completed";

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), description: "HTML&CSS", isDone: true },
    { id: v1(), description: "React", isDone: true },
    { id: v1(), description: "TypeScript", isDone: true },
    { id: v1(), description: "GraphQL", isDone: false },
    { id: v1(), description: "WebSocket", isDone: false },
  ]);
  const [filter, setFilter] = useState<TasksFilterValue>("all");

  const addTask = (text: string) => {
    const task = {
      id: v1(),
      description: text,
      isDone: false,
    };

    setTasks([task, ...tasks]);
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };


  let filteredTasks = tasks;

  if (filter === "active") {
		filteredTasks = tasks.filter((t) => !t.isDone);
  }

  if (filter === "completed") {
		filteredTasks = tasks.filter((t) => t.isDone);
  }


  return (
    <TodoList
      tasks={filteredTasks}
      title={"What to learn"}
      addTask={addTask}
      removeTask={removeTask}
			filter={filter}
			setFilter={setFilter}
    />
  );
}

export default App;
