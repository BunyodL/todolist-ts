import { ChangeEvent, useState } from "react";

type Props = {
  title: string;
  onChangeItemTitle: (title: string) => void;
};
export function EditableSpan(props: Props) {
  const [title, setTitle] = useState("");
  const [editMode, setEditMode] = useState(false);

  const activateEditMode = () => {
    setTitle(props.title);
    setEditMode(true);
  };

  const activateViewMode = () => {
    props.onChangeItemTitle(title); 
    setEditMode(false);
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <input
      type="text"
      onBlur={activateViewMode}
      value={title}
      autoFocus
      onChange={onChangeTitle}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
}