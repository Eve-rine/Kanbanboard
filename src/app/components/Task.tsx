
import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Task as TaskType } from '../interfaces';

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 2, 
        mb: 2, 
        backgroundColor: 'background.paper',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      <Typography variant="body2">{task.content}</Typography>
    </Paper>
  );
};

export default Task;