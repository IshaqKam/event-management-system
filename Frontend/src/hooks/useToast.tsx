import dynamic from 'next/dynamic';
import Alert from '@mui/material/Alert';
import { useCallback, useState } from 'react';
import { SnackbarOrigin } from '@mui/material/Snackbar';

const Snackbar = dynamic(() => import('@mui/material/Snackbar'), {
  ssr: false,
});

export interface State extends SnackbarOrigin {
  open: boolean;
}

export type ToastInfo = {
  message: string;
  level: 'error' | 'success' | 'info' | 'warning';
};

export default function useToast() {
  const [state, setState] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const [toastInfo, setToastInfo] = useState<ToastInfo>({
    level: 'success',
    message: '',
  });

  const { vertical, horizontal, open } = state;

  const handleClick = useCallback((info: ToastInfo) => {
    setToastInfo(info);
    setState(prevState => ({ ...prevState, open: true }));
  }, []);

  const handleClose = useCallback(() => {
    setState(prevState => ({ ...prevState, open: false }));
  }, []);

  const Toast = () => (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert onClose={handleClose} severity={toastInfo.level}>
        {toastInfo.message}
      </Alert>
    </Snackbar>
  );

  return {
    handleClick,
    Toast,
  };
}
