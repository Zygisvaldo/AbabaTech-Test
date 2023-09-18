import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Alert, Button, Stack, TextField } from '@mui/material';
import { useAuthFormInput } from '../../hooks/useAuthFormInput';
import { loginService, registerService } from '../../services/api';

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

  const { username, password, handleUsernameChange, handlePasswordChange } = useAuthFormInput();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Both username and password are required');
      return;
    }

    try {
      let response: AuthResponse | null = null;

      if (isLogin) {
        response = await loginService(username, password);
        if (response) {
          login(response!.data.access_token)
        }   
      } else {
        response = await registerService(username, password);
        if (response) {
          login(response!.data.access_token)
        }
      }
            
    } catch (error) {
      setError('Error occurred during authentication');
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
