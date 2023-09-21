import { useContext } from 'react';
import { Movie } from '../../types';
import DeleteMovieHandler from '../../containers/MovieDeletionHandler'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import CreateOrEditMovieHandler from '../../containers/CreateOrEditMovieHandler';
import { Button, Stack} from '@mui/material';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../Routes';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {

  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

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
            <CreateOrEditMovieHandler movie={movie} isCreate={false}/>
            <DeleteMovieHandler movieId={movie.id}/>
          </Stack>
        ) : (
          <p>
            Please <Link to={ROUTES.AUTH}>log in</Link> to use CRUD functionalities.
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
