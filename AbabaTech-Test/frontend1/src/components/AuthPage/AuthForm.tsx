import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Alert, Button, Stack, TextField } from '@mui/material';
import { useAuthFormInput } from '../../hooks/useAuthFormInput';

interface AuthFormProps {
  isLogin: boolean;
  switchToLogin: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin, switchToLogin  }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useAuth();

  const { username, password, handleUsernameChange, handlePasswordChange } = useAuthFormInput();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Both username and password are required');
      return;
    }

    try {
      const url = isLogin ? 'http://localhost:3000/auth/login' : 'http://localhost:3000/auth/register';
      const response = await axios.post(url, { username, password });

      setSuccess(isLogin ? 'Login successful! Redirecting...' : 'Sign up successful! Please log in!');
      
      setTimeout(() => {
        if (isLogin) {
          login(response.data.access_token)
        } else {
          switchToLogin(); 
        }
      }, 1500);
      
    } catch (error) {
      setError('Error occurred during authentication');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack sx={{ width: '100%', marginTop: 2 }} spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
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
