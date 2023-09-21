import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ROUTES } from '../Routes'

const HomePage = () => {
  
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="textBlock">
      <h1>Home Page</h1>
      {isAuthenticated ? (
        <p>Welcome! You are logged in! Navigate to{' '}
        <Link to={ROUTES.MOVIES}>Movies</Link> and use CRUD.
      </p>
      ) : (
        <p>Please log in to use CRUD. Or navigate to{' '}
        <Link to={ROUTES.MOVIES}>Movies</Link> and see my favorite movies list.
      </p>
      )}
    </div>
  );
};

export default HomePage;
