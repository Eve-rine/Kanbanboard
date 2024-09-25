import React from 'react';
import { Metadata } from 'next';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from './components/Header';

export const metadata: Metadata = {
  title: 'Kanban Board',
  description: 'A simple Kanban board built with Next.js and TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              bgcolor: '#f5f5f5', // Light grey background
            }}
          >
            <Container maxWidth={false} sx={{ paddingTop: 0, p: { xs: 2, sm: 3, md: 4 } }}>
              <Header />
              {children}
            </Container>
          </Box>
      </body>
    </html>
  );
}