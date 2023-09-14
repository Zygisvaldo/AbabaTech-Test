import * as React from 'react';
import {AppBar, Typography, Toolbar } from '@mui/material';
import Link from '@mui/material/Link';

export default function BottomAppBar() {
  return (
    <React.Fragment>
      <AppBar position="static" color="secondary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar sx={{ justifyContent: 'center', color: 'white' }}>
          <Typography>
            © 2023 FavMovies app author: 
            <Link href="linkedin.com/in/zigy-vaitkunas-51923088/" target="_blank" rel="noopener" color="inherit">
              Žygimantas Vaitkūnas
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
