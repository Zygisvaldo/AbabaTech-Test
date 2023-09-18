import React, { useState } from 'react';
import { Movie } from '../../types';
import MovieFormDialog from './MovieFormDialog';
import { createMovie } from '../../services/api';
import { Button} from '@mui/material';
import { useSuccessMessage } from '../../contexts/SuccessMessageContext';

const CreateMovieButton: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setSuccessMessage } = useSuccessMessage()!;

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCreateMovie = async (newMovie: Movie) => {
    try {
      await createMovie({ ...newMovie, id: 0 });
        setSuccessMessage('Movie created successfully !');
        window.location.reload();
    } catch (error) {
      console.error('Error creating movie:', error);
    }
    handleCloseDialog();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpenDialog} sx={{ color: 'white' }}>
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
