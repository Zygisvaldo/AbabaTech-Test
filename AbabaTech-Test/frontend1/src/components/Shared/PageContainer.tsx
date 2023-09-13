import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

interface SimpleContainerProps {
  children: React.ReactNode;
}

const containerStyle = {
  marginTop: '20px',
  paddingBottom: '56px'
};

export default function SimpleContainer({ children }: SimpleContainerProps) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" style={containerStyle}>
        {children}
      </Container>
    </React.Fragment>
  );
}