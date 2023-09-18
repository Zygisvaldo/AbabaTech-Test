import React from 'react';
import { useSuccessMessage } from '../../contexts/SuccessMessageContext';
import { Alert } from '@mui/material';

const SuccessMessageAlert: React.FC = () => {
  const { successMessage, setSuccessMessage } = useSuccessMessage()!;

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (successMessage) {
      timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 1500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [successMessage, setSuccessMessage]);

  return successMessage ? <Alert severity="success" sx={{ margin: 2 }}>{successMessage}</Alert> : null;
};

export default SuccessMessageAlert;