import { memo } from 'react';
import Head from 'next/head';

type Props = {
  heading?: string;
  children?: JSX.Element | JSX.Element[];
};

function HTMLHeader({ heading = '', children }: Props) {
  const appTitle = !heading
    ? 'Event Management System'
    : `Event Management System - ${heading}`;
  return (
    <Head>
      <meta name="description" content="Le Bon Point" />
      <meta
        name="viewport"
        content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
      />
      <title>{appTitle}</title>
      {children}
    </Head>
  );
}

export default memo(HTMLHeader);
