import React from 'react';
import { Typography } from '@mui/material';

export function EmptyTasks() {
  return (
    <Typography
      variant="h6"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBlock: '1rem',
        fontWeight: 400,
        opacity: 0.5,
      }}
    >
      There are no tasks here...
    </Typography>
  );
}
