import { ChangeEvent, KeyboardEvent, useState } from "react";

type Props = {
  addItem: (text: string) => void;
};

export function AddItemInput({ addItem }: Props) {
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

    addItem(newTaskTitle.trim());
    setNewTaskTitle("");
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
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
  );
}
