import { ChangeEvent } from "react";
import { TasksFilterValue } from "./App";
import { AddItemInput } from "./AddItemInput";
import { EditableSpan } from "./EditableSpan";

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
  deleteTodolist: (id: string) => void;
  changeTaskTitle: (title: string, taskId: string, todolistId: string) => void;
  changeTodoListTitle: (title: string, todolistId: string) => void;
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
  deleteTodolist,
  changeTaskTitle,
  changeTodoListTitle,
}: Props) => {
  function handleAddTask(text: string) {
    addTask(text, id);
  }

  const allFilter = () => changeFilter("all", id);
  const activeFilter = () => changeFilter("active", id);
  const completedFilter = () => changeFilter("completed", id);

  const removeTodolist = () => deleteTodolist(id);

	const onChangeTodoListTitle = (title: string) => {
		changeTodoListTitle(title, id)
	}

  return (
    <div className="todoList">
      <div>
        <h3>
          <EditableSpan
            onChangeItemTitle={onChangeTodoListTitle}
            title={title}
          />
          <button onClick={removeTodolist}>x</button>
        </h3>
      </div>
      <AddItemInput addItem={handleAddTask} />
      <ul>
        {tasks.map((t) => {
          const removeTaskHandler = () => removeTask(t.id, id);
          const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeStatus(t.id, e.currentTarget.checked, id);
          };

          const onChangeTaskTitle = (title: string) => {
            changeTaskTitle(title, t.id, id);
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
              <EditableSpan
                title={t.title}
                onChangeItemTitle={onChangeTaskTitle}
              />
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
