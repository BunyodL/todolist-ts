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
  activeTasks: number;
  tasks: number;
};
export const FooterBlock = React.memo(
  ({
    filter,
    activeFilter,
    allFilter,
    completedFilter,
    handleClearCompletedTasks,
    activeTasks,
    tasks,
  }: Props) => {
    return (
      <>
        {tasks > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{activeTasks} item{activeTasks > 1 && 's'} left</span>
            <Button
              onClick={handleClearCompletedTasks}
              title="Clear Completed Tasks"
            >
              Clear Completed
            </Button>
          </div>
        )}
        <FilterButtons
          activeFilter={activeFilter}
          allFilter={allFilter}
          completedFilter={completedFilter}
          filter={filter}
        />
      </>
    );
  },
);
