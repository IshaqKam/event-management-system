import theme from 'theme';
import Router from 'next/router';
import useAuth from 'hooks/useAuth';
import Sidebar from 'components/ui/Sidebar';
import { ThemeProvider } from '@mui/material';
import HTMLHeader from 'components/common/Head';
import { memo, useState, useEffect } from 'react';
import RouterLoader from 'components/common/RouterLoader';
import DashboardNavbar from 'components/ui/Dashboard/DashboardNavbar';

type Props = {
  heading?: string;
  children: JSX.Element;
  loadMapBoxCSS?: boolean;
  loadMapBoxGeoCoder?: boolean;
};

function Layout(props: Props) {
  const [isLoading] = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  const { heading, children, loadMapBoxGeoCoder, loadMapBoxCSS } = props;

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setIsNavigating(true);
    });

    Router.events.on('routeChangeComplete', () => {
      setIsNavigating(false);
    });

    Router.events.on('routeChangeError', () => {
      setIsNavigating(false);
    });
  }, []);

  if (isLoading) {
    return <RouterLoader />;
  }

  return (
    <ThemeProvider theme={theme}>
      {isNavigating && <RouterLoader />}
      <HTMLHeader heading={heading}>
        {loadMapBoxCSS ? (
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css"
            rel="stylesheet"
          />
        ) : (
          <></>
        )}
        {loadMapBoxGeoCoder ? (
          <link
            rel="stylesheet"
            href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css"
          />
        ) : (
          <></>
        )}
      </HTMLHeader>
      <div className="flex max-w-full pt-16 lg:pl-72">
        <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
        <main className="flex flex-col w-full flex-auto">{children}</main>
        <Sidebar open={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
    </ThemeProvider>
  );
}

export default memo(Layout);
