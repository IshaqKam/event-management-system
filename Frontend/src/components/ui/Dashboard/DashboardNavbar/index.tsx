import { memo } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AppBar, IconButton, Theme, Toolbar, styled } from '@mui/material';

type StyleType = { theme: Theme };

const DashboardNavbarRoot = styled(AppBar)(({ theme }: StyleType) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

function DashboardNavbar(props: any) {
  const { onSidebarOpen, ...other } = props;
  return (
    <DashboardNavbarRoot
      sx={{
        left: { lg: 280 },
        width: { lg: 'calc(100% - 280px)' },
      }}
      {...other}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2,
        }}
      >
        <IconButton
          onClick={onSidebarOpen}
          sx={{
            display: {
              xs: 'inline-flex',
              lg: 'none',
            },
          }}
        >
          <GiHamburgerMenu />
        </IconButton>
      </Toolbar>
    </DashboardNavbarRoot>
  );
}

export default memo(DashboardNavbar);
