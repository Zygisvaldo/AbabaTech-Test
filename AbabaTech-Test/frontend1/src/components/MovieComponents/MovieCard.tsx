import React, { useState, useContext } from 'react';
import { Movie } from '../../types';
import DeleteConfirmationDialog from './DeleteConfirmationDialog '
import { deleteMovieById, updateMovieById } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import MovieFormDialog from './MovieFormDialog';
import { Button, Stack} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSuccessMessage } from '../../contexts/SuccessMessageContext';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

  const { isAuthenticated } = useContext(AuthContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { setSuccessMessage } = useSuccessMessage()!;

  const handleEdit = () => {
    setEditDialogOpen(true);
  };

  const handleDelete = () => {
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteMovieById(movie.id);
        navigate('/movies');
        setSuccessMessage('Movie deleted successfully !');
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
    setDialogOpen(false);
  };

  const handleConfirmEdit = async (editedMovie: Movie) => {
    try {
      await updateMovieById(editedMovie.id, editedMovie);
        setSuccessMessage('Movie edited successfully !');
        window.location.reload();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
    setEditDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditDialogOpen(false);
  };

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Button 
          variant="contained"
          color="secondary" 
          onClick={() => navigate('/movies')} 
          sx={{ color: 'white', marginBottom: 2 , marginTop: 2}}>
          Back
        </Button>
        {isAuthenticated ? (
          <Stack spacing={2} direction="row" sx={{ justifyContent: 'center' }}>
            <Button variant="contained" onClick={handleEdit} sx={{ color: 'white' }}>
              Edit
            </Button>
            <Button variant="outlined" onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        ) : (
          <p>
            Please <Link to="/auth">log in</Link> to use CRUD functionalities.
          </p>
        )}
      </div>
      <DeleteConfirmationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onConfirmDelete={handleConfirmDelete}
      />
      <MovieFormDialog
        open={editDialogOpen}
        onClose={handleCloseDialog}
        movie={movie}
        onSave={(editedMovie) => {
          handleConfirmEdit(editedMovie);
        }}
        isCreate={!movie.id}
      />
    </div>
  );
};

export default MovieCard;
