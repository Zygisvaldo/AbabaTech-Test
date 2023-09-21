import { useState } from 'react';
import DeleteConfirmationDialog from '../components/MovieComponents/DeleteConfirmationDialog ';
import { deleteMovieById } from '../services/api';
import { Button} from '@mui/material';
import { useSuccessMessage } from '../contexts/SuccessMessageContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../Routes'

interface DeleteMovieHandlerProps {
  movieId: number;
}

const DeleteMovieHandler = ({movieId}: DeleteMovieHandlerProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { setSuccessMessage } = useSuccessMessage()!;

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteMovieById(movieId);
        navigate(ROUTES.MOVIES);
        setSuccessMessage('Movie deleted successfully !');
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
    setDialogOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpenDialog} >
        Delete
      </Button>
      <DeleteConfirmationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onConfirmDelete={handleConfirmDelete}
      />
    </>
  );
};

export default DeleteMovieHandler;
