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

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const changeStatus = (taskId: string, isDone: boolean) => {
    let task = tasks.find((t) => t.id === taskId);

    if (task) {
      task.isDone = isDone;
    }

    setTasks([...tasks]);
  };

  let filteredTasks = tasks;

  if (filter === "active") {
    filteredTasks = tasks.filter((t) => !t.isDone);
  }

  if (filter === "completed") {
    filteredTasks = tasks.filter((t) => t.isDone);
  }

  return (
    <div className="App">
      <TodoList
        tasks={filteredTasks}
        title={"What to learn"}
        addTask={addTask}
        removeTask={removeTask}
        filter={filter}
        setFilter={setFilter}
        changeStatus={changeStatus}
      />
    </div>
  );
}

export default App;
