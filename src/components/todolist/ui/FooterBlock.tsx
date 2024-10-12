import React from "react";
import { Button } from "@mui/material";
import { TasksFilterValue } from "../../../@types/todolist/todolist.types";
import { FilterButtons } from "../FilterButtons";

type Props = {
  filter: TasksFilterValue;
  allFilter: () => void;
  activeFilter: () => void;
  completedFilter: () => void;
  handleClearCompletedTasks: () => void;
};
export const FooterBlock = React.memo(
  ({ filter, activeFilter, allFilter, completedFilter, handleClearCompletedTasks }: Props) => {
    return (
      <div>
        <Button
          onClick={handleClearCompletedTasks}
          title="Clear Completed Tasks"
        >
          Clear Completed
        </Button>
        <FilterButtons
          activeFilter={activeFilter}
          allFilter={allFilter}
          completedFilter={completedFilter}
          filter={filter}
        />
      </div>
    );
  },
);
