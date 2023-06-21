import { memo } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const AppLoaderComponent = () => {
  return (
    <div className="flex flex-col item-center justify-center">
      <CircularProgress color="info" />
    </div>
  );
};

export const AppLoader = memo(AppLoaderComponent);
