import React from 'react';
import { Button } from '@mui/material';
import { TasksFilterValue } from '../../@types/todolist/todolist.types';

type Props = {
  filter: TasksFilterValue;
  allFilter: () => void;
  activeFilter: () => void;
  completedFilter: () => void;
};
export const FilterButtons = React.memo(
  ({ filter, activeFilter, allFilter, completedFilter }: Props) => {
    return (
      <div
        style={{
          paddingBlock: '10px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          variant={filter === 'all' ? 'contained' : 'text'}
          onClick={allFilter}
          title="All tasks"
        >
          All
        </Button>
        <Button
          color="success"
          variant={filter === 'active' ? 'contained' : 'text'}
          onClick={activeFilter}
          title="Active tasks"
        >
          Active
        </Button>
        <Button
          color="error"
          variant={filter === 'completed' ? 'contained' : 'text'}
          onClick={completedFilter}
          title="Completed tasks"
        >
          Completed
        </Button>
      </div>
    );
  }
);
