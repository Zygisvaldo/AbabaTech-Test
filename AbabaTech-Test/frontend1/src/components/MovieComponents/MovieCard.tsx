import { useState, useContext } from 'react';
import { Movie } from '../../types';
import DeleteMovieHandler from '../../containers/MovieDeletionHandler'
import { updateMovieById } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import MovieFormDialog from './MovieFormDialog';
import { Button, Stack} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSuccessMessage } from '../../contexts/SuccessMessageContext';
import { ROUTES } from '../../Routes';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  
  const { isAuthenticated } = useContext(AuthContext);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { setSuccessMessage } = useSuccessMessage()!;

  const handleEdit = () => {
    setEditDialogOpen(true);
  };

  const handleConfirmEdit = async (editedMovie: Movie) => {
    try {
      await updateMovieById(editedMovie.id, editedMovie);
        setSuccessMessage('Movie edited successfully !');
        window.location.reload();
    } catch (error) {
      console.error('Error editing movie:', error);
    }
    setEditDialogOpen(false);
  };

  const handleCloseDialog = () => {
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
          onClick={() => navigate(ROUTES.MOVIES)} 
          sx={{ color: 'white', marginBottom: 2 , marginTop: 2}}>
          Back
        </Button>
        {isAuthenticated ? (
          <Stack spacing={2} direction="row" sx={{ justifyContent: 'center' }}>
            <Button variant="contained" onClick={handleEdit} sx={{ color: 'white' }}>
              Edit
            </Button>
            <DeleteMovieHandler movieId={movie.id}/>
          </Stack>
        ) : (
          <p>
            Please <Link to={ROUTES.AUTH}>log in</Link> to use CRUD functionalities.
          </p>
        )}
      </div>
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
