import { useState } from "react";
import "./App.css";
import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";
import { AddItemInput } from "./AddItemInput";

export type TasksFilterValue = "all" | "active" | "completed";

export type TodoListType = {
  id: string;
  title: string;
  filter: TasksFilterValue;
};

export type TodoListsTasksType = {
  [key: string]: Array<TaskType>;
};

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const [todolists, setTodolists] = useState<Array<TodoListType>>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<TodoListsTasksType>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "React", isDone: true },
      { id: v1(), title: "TypeScript", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
      { id: v1(), title: "WebSocket", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Book", isDone: true },
      { id: v1(), title: "Groceries", isDone: true },
      { id: v1(), title: "Phone", isDone: false },
    ],
  });

  function addTask(text: string, todolistId: string) {
    const task: TaskType = {
      id: v1(),
      title: text,
      isDone: false,
    };

    if (tasks[todolistId]) {
      tasks[todolistId] = [task, ...tasks[todolistId]];
    }

    setTasks({ ...tasks });
  }

  function removeTask(taskId: string, todolistId: string) {
    const newTasks = tasks[todolistId].filter((t) => t.id !== taskId);

    if (tasks[todolistId]) {
      tasks[todolistId] = newTasks;
    }

    setTasks({ ...tasks });
  }

  function changeFilter(filter: TasksFilterValue, todolistId: string) {
    const todolist = todolists.find((tl) => tl.id === todolistId);

    if (todolist) {
      todolist.filter = filter;
    }

    setTodolists([...todolists]);
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let task = tasks[todolistId].find((t) => t.id === taskId);

    if (task) {
      task.isDone = isDone;
    }

    setTasks({ ...tasks });
  }

  function addTodolistHandler(title: string) {
    const newTodolist: TodoListType = {
      id: v1(),
      filter: "all",
      title,
    };

    setTodolists([newTodolist, ...todolists]);
    setTasks({ ...tasks, [newTodolist.id]: [] });
  }

  function deleteTodolist(todolistId: string) {
    const updatedTodolists = todolists.filter((t) => t.id !== todolistId);

    setTodolists(updatedTodolists);
    delete tasks[todolistId];
  }

  return (
    <div className="App">
      <div>
        <h2>Create a todolist</h2>
        <AddItemInput addItem={addTodolistHandler} />
      </div>
      {todolists.map((tl) => {
        let filteredTasks = tasks[tl.id];

        if (tl.filter === "active") {
          filteredTasks = filteredTasks.filter((t) => !t.isDone);
        }

        if (tl.filter === "completed") {
          filteredTasks = filteredTasks.filter((t) => t.isDone);
        }

        return (
          <div>
            <TodoList
              key={tl.id}
              id={tl.id}
              tasks={filteredTasks}
              title={tl.title}
              addTask={addTask}
              removeTask={removeTask}
              filter={tl.filter}
              changeFilter={changeFilter}
              changeStatus={changeStatus}
              deleteTodolist={deleteTodolist}
            />
          </div>
        );
      })}
    </div>
  );
}

export default App;
