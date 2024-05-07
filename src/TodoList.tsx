import { ChangeEvent } from "react";
import { TasksFilterValue } from "./App";
import { AddItemInput } from "./AddItemInput";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton, Typography } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";

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
    changeTodoListTitle(title, id);
  };

  return (
    <div className="todoList">
      <Typography
        variant="h5"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
					paddingBlock: "1rem",
					fontWeight: 600
        }}
      >
        <EditableSpan
          onChangeItemTitle={onChangeTodoListTitle}
          title={title}
        />
        <IconButton
          onClick={removeTodolist}
          color="error"
        >
          <DeleteOutline />
        </IconButton>
      </Typography>

      <AddItemInput addItem={handleAddTask} />
      <div
        style={{
          paddingBlock: "10px",
        }}
      >
        {tasks.map((t) => {
          const removeTaskHandler = () => removeTask(t.id, id);
          const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeStatus(t.id, e.currentTarget.checked, id);
          };

          const onChangeTaskTitle = (title: string) => {
            changeTaskTitle(title, t.id, id);
          };

          return (
            <div
              key={t.id}
              className={t.isDone ? "is-done" : ""}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Checkbox
                  checked={t.isDone}
                  onChange={checkboxHandler}
                />
                <EditableSpan
                  title={t.title}
                  onChangeItemTitle={onChangeTaskTitle}
                />
              </div>
              <IconButton
                onClick={removeTaskHandler}
                color="error"
              >
                <DeleteOutline />
              </IconButton>
            </div>
          );
        })}
      </div>

      <div style={{ paddingBlock: "10px" }}>
        <Button
          onClick={allFilter}
          variant={filter === "all" ? "contained" : "text"}
        >
          All
        </Button>
        <Button
          color="success"
          variant={filter === "active" ? "contained" : "text"}
          onClick={activeFilter}
        >
          Active
        </Button>
        <Button
          color="error"
          variant={filter === "completed" ? "contained" : "text"}
          onClick={completedFilter}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};

export default TodoList;
