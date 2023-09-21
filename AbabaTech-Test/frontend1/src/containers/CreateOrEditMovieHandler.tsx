import { useState } from 'react';
import { Movie } from '../types';
import MovieFormDialog from '../components/MovieComponents/MovieFormDialog';
import { createMovie, updateMovieById } from '../services/api';
import { Button} from '@mui/material';
import { useSuccessMessage } from '../contexts/SuccessMessageContext';

interface CreateOrEditMovieHandlerProps {
  movie: Movie;
  isCreate: boolean;
}

const CreateOrEditMovieHandler = ({movie, isCreate}: CreateOrEditMovieHandlerProps) => {
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

  const handleEditMovie = async (editedMovie: Movie) => {
    try {
      await updateMovieById(editedMovie.id, editedMovie);
        setSuccessMessage('Movie edited successfully !');
        window.location.reload();
    } catch (error) {
      console.error('Error editing movie:', error);
    }
    handleCloseDialog();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpenDialog} sx={{ color: 'white' }}>
        {isCreate ? 'Create Movie' : 'Edit'}
      </Button>
      <MovieFormDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        movie={movie}
        onSave={isCreate ? handleCreateMovie : handleEditMovie}
        isCreate={isCreate}
      />
    </>
  );
};

export default CreateOrEditMovieHandler;
