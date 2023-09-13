import React, { useState } from 'react';
import  AuthForm  from '../components/AuthPage/AuthForm';
import { Button, Card, CardContent } from '@mui/material';
import SimpleContainer from '../components/Shared/PageContainer'

export const AuthPage: React.FC = () => {
  
  const [isLogin, setIsLogin] = useState(true);

  const switchToLogin = () => {
    setIsLogin(true);
  };

  const switchToSignUp = () => {
    setIsLogin(false);
  };

  return (
    <SimpleContainer>
      <Card variant="outlined">
        <CardContent>
          <AuthForm isLogin={isLogin} switchToLogin={switchToLogin} />
        </CardContent>
      </Card>
      <div className="outlinedButtonBlock">
        <Button variant="outlined" onClick={isLogin ? switchToSignUp : switchToLogin}>
              {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
        </Button>
      </div>
    </SimpleContainer>
  );
};
