import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Alert, Button, Stack, TextField } from '@mui/material';
import { useAuthFormInput } from '../../hooks/useAuthFormInput';
import { loginService, registerService } from '../../services/api';
import { useSuccessMessage } from '../../contexts/SuccessMessageContext';

interface AuthFormProps {
  isLogin: boolean;
  switchToLogin: () => void;
}

interface AuthResponse {
  data: {
    access_token: string;
  };
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { setSuccessMessage } = useSuccessMessage()!;

  const { username, password, handleUsernameChange, handlePasswordChange } = useAuthFormInput();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Both username and password are required');
      return;
    }

    if (username.trim().length < 6) {
      setError('Username must be at least 6 characters long');
      return;
    }

    if (password.trim().length < 8) {
      setError('Password must be at least 8 characters!');
      return;
    }

    try {
      let response: AuthResponse | null = null;

      if (isLogin) {
        response = await loginService(username, password);
        if (response) {
          setSuccessMessage('LogIn successful!');
          login(response!.data.access_token)
        }   
      } else {
        response = await registerService(username, password);
        if (response) {
          setSuccessMessage('SignUp successful! You are logged in!');
          login(response!.data.access_token)
        }
      }
            
    } catch (error) {
      setError(`Error ${isLogin? 'Logging In' : 'Signing Up'} ${error}`);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack sx={{ width: '100%', marginTop: 2 }} spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}
      </Stack>
      <Stack sx={{ width: '100%', marginTop: 2 }} spacing={2}>
        <TextField
          label="Username"
          variant="outlined"
          
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          
          value={password}
          onChange={handlePasswordChange}
        />
        <Button variant="contained" type="submit" fullWidth>
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>
      </Stack>
    </form>
  );
};

export default AuthForm;
