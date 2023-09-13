import React, { useState, useContext } from 'react';
import { Movie } from '../../types';
import DeleteConfirmationDialog from './DeleteConfirmationDialog '
import { deleteMovieById, updateMovieById } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import MovieFormDialog from './MovieFormDialog';
import { Alert, Button, Stack} from '@mui/material';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

  const { isAuthenticated } = useContext(AuthContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');

  const handleEdit = () => {
    setEditDialogOpen(true);
  };

  const handleDelete = () => {
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteMovieById(movie.id);
      setSuccess('Movie deleted successfully! Reloading...')
      setTimeout(() => {
        navigate('/movies');
      }, 1500);
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
    setDialogOpen(false);
  };

  const handleConfirmEdit = async (editedMovie: Movie) => {
    console.log('Edited movie:', editedMovie);
    try {
      await updateMovieById(editedMovie.id, editedMovie);
      setSuccess('Movie updated successfully! Reloading...')
      setTimeout(() => {
        window.location.reload();
      }, 1500);
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
      <Stack sx={{ width: '100%', marginTop: 2 }} spacing={2}>
        {success && <Alert severity="success">{success}</Alert>}
      </Stack>
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      {isAuthenticated ? (
        <Stack spacing={2} direction="row" sx={{ justifyContent: 'center' }}>
          <Button variant="contained" onClick={handleEdit}>
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
