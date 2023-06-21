import { memo } from 'react';
import Box from '@mui/material/Box';

type Props = {
  children?: JSX.Element | JSX.Element[];
  alignItems?:
    | 'end'
    | 'start'
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'self-end'
    | 'self-start';
  justifyContent?:
    | 'stretch'
    | 'space-evenly'
    | 'space-around'
    | 'space-between';
  flexDirection?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
};

const ContainerComponent = (props: Props) => {
  const { children, ...rest } = props;

  return (
    <Box
      flexGrow={1}
      display="flex"
      minHeight="100%"
      component="main"
      {...rest}
    >
      {children}
    </Box>
  );
};

export const Container = memo(ContainerComponent);
