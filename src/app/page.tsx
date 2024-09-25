"use client";

import React from 'react';
import { Box } from '@mui/material';
import KanbanBoard from './components/KanbanBoard';

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        marginTop: 3,
      }}
    >
      <KanbanBoard />
    </Box>
  );
}