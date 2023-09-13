import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Alert, Button, Stack, TextField } from '@mui/material';

interface AuthFormProps {
  isLogin: boolean;
  switchToLogin: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin, switchToLogin  }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Both username and password are required');
      return;
    }

    try {
      const url = isLogin ? 'http://localhost:3000/auth/login' : 'http://localhost:3000/auth/register';
      const response = await axios.post(url, { username, password });
      console.log(response.data);
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

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setPassword(e.target.value);
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
