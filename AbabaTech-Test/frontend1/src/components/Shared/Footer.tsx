import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export default function BottomAppBar() {
  return (
    <React.Fragment>
      <AppBar position="fixed" color="secondary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <p>© 2023 FavMovies app author: Žygimantas Vaitkūnas</p>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
