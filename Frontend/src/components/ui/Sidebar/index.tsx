import theme from 'theme';
import { MENU } from './list';
import { ROUTES } from 'routes';
import { NavItem } from './item';
import { AppButton } from 'components';
import { useRouter } from 'next/router';
import { FiLogOut } from 'react-icons/fi';
import { SignOut } from 'services/auth.service';
import { memo, useEffect, useMemo } from 'react';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useAppDispatch } from 'hooks/useReduxHook';
import { setUserDetails } from 'redux/slices/user.slice';

type Props = {
  open?: boolean;
  onClose?: () => void;
};

function Sidebar({ open, onClose }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(() => {
    if (!router.isReady) return;

    if (open) {
      onClose?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  const signOut = () => {
    SignOut();
    dispatch(
      setUserDetails({
        id: '',
        username: '',
        email: '',
      }),
    );
    router.replace(ROUTES.login);
  };

  const list = useMemo(() => {
    const items = MENU();
    return items.map((item, i) =>
      item.href && item.as ? (
        <NavItem
          key={i}
          as={item.as}
          icon={item.icon}
          href={item.href}
          title={item.title}
        />
      ) : (
        <div key={i} className="mt-4 px-4 font-semibold text-gray-400">
          {item.title}
        </div>
      ),
    );
  }, []);

  const content = (
    <div className="flex flex-col w-full">
      <div className="p-4">
        <div className="flex justify-center items-center cursor-pointer bg-gray-800 rounded py-2.5">
          <h1 className="font-medium">Event Management System</h1>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            py: 1,
          }}
        />
      </div>
      <div className="grow">{list}</div>
      <div className="px-4 py-3">
        <span className="flex mx-auto mt-4 w-32" />
        <AppButton
          fullWidth
          color="error"
          sx={{ mt: 2 }}
          endIcon={<FiLogOut />}
          onClick={signOut}
          title={'Sign out'}
        />
      </div>
    </div>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.divider,
            color: '#FFFFFF',
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.divider,
          color: '#FFFFFF',
          width: 280,
        },
      }}
      sx={{ zIndex: theme => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
}

export default memo(Sidebar);
