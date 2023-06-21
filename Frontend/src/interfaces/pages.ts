import { AppProps } from 'next/app';
import { ReactElement } from 'react';
import { ToastInfo } from 'hooks/useToast';

export interface PageProps {
  showToast: (info: ToastInfo) => void;
}

export type NextPageWithLayout = {
  getLayout?: (page: ReactElement) => JSX.Element;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
