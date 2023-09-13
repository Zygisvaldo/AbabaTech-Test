import React, { useState } from 'react';
import { Movie } from '../../types';
import MovieFormDialog from './MovieFormDialog';
import { createMovie } from '../../services/api';
import { Alert, Button, Stack} from '@mui/material';

interface CreateMovieButtonProps {
  onCreate: (newMovie: Movie) => void;
}

const CreateMovieButton: React.FC<CreateMovieButtonProps> = ({ onCreate }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [success, setSuccess] = useState('');

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCreateMovie = async (newMovie: Movie) => {
    console.log('Created movie:', newMovie);
    try {
      await createMovie({ ...newMovie, id: 0 });
      setSuccess('Movie created successfully!')
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error creating movie:', error);
    }
    handleCloseDialog();
  };

  return (
    <>
      <Stack sx={{ width: '100%', marginTop: 2, marginBottom: 2 }} spacing={2}>
        {success && <Alert severity="success">{success}</Alert>}
      </Stack>
      <Button variant="contained" onClick={handleOpenDialog}>
        Create Movie
      </Button>
      <MovieFormDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        movie={{ title: '', description: '', id: 0 }}
        onSave={handleCreateMovie}
        isCreate={true}
      />
    </>
  );
};

export default CreateMovieButton;
