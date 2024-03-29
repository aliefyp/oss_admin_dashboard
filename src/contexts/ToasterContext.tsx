import { Alert, AlertProps, Snackbar, SnackbarProps } from "@mui/material";
import { createContext, useState } from "react";

type Options = {
  isError?: boolean;
  duration?: number;
  snackbarProps?: Partial<SnackbarProps>;
  alertProps?: Partial<AlertProps>;
};

export type ToasterContextType = {
  open: (message: string, options?: Options) => void;
  close: () => void;
};

const defaultOptions = {
  isError: true,
  duration: 3000,
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

const ToasterProvider = ({ children }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [options, setOptions] = useState<Options>(defaultOptions);

  const open = (message: string, options?: Options) => {
    setAlertMessage(message);
    setShowAlert(true);
    setOptions(options || defaultOptions);
  };

  const close = () => {
    setShowAlert(false);
  };

  return (
    <ToasterContext.Provider value={{ open, close }}>
      <Snackbar
        open={showAlert}
        autoHideDuration={options.duration}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={(_, reason) => {
          if (reason === 'clickaway') return;
          close();
        }}
        {...options.snackbarProps}
      >
        <Alert
          severity={options.isError ? 'error' : 'success'}
          variant='filled'
          onClose={close}
          sx={{ width: '100%' }}
          {...options.alertProps}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      {children}
    </ToasterContext.Provider>
  );
}

export { ToasterProvider, ToasterContext };

