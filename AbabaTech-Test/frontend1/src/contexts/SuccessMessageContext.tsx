import { createContext, useState, useContext, FC } from 'react';

interface SuccessMessageContextProps {
  successMessage: string | null;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const SuccessMessageContext = createContext<SuccessMessageContextProps | undefined>(undefined);

export const useSuccessMessage = () => {
  return useContext(SuccessMessageContext);
};

interface SuccessMessageProviderProps {
  children: React.ReactNode;
}

export const SuccessMessageProvider = ({ children }: SuccessMessageProviderProps) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  return (
    <SuccessMessageContext.Provider value={{ successMessage, setSuccessMessage }}>
      {children}
    </SuccessMessageContext.Provider>
  );
};