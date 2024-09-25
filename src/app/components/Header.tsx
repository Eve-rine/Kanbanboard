import React from 'react';
import { Typography, Breadcrumbs, Link, Box  } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Header: React.FC = () => (
  <header>
    <Typography variant="h4" component="h1" fontWeight="bold">
      Kanban
    </Typography>

    <Box pt={1}>
      <Breadcrumbs aria-label="breadcrumb"         
      separator={<NavigateNextIcon fontSize="small" />}
>
        <Link underline="hover" color="inherit" href="#" fontWeight="bold">
          Dashboard
        </Link>
        <Typography color="text.primary">
            Kanban
        </Typography>
      </Breadcrumbs>
    </Box>
  </header>
);

 export default Header;


