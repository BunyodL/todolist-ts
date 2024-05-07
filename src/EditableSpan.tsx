import { Done, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
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
    <FormControl
      sx={{ m: 1, width: "25ch" }}
      variant="outlined"
      size="small"
    >
      <OutlinedInput
        id="outlined-adornment-span"
        onBlur={activateViewMode}
        value={title}
        autoFocus
        onChange={onChangeTitle}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="confirm changes"
              onClick={activateViewMode}
              edge="end"
							size="small"
            >
              <Done />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
}
