import { ROUTES } from 'routes';
import { MdEventAvailable, MdOutlineDashboard } from 'react-icons/md';

export const MENU = () => [
  {
    as: ROUTES.root,
    href: ROUTES.root,
    icon: <MdOutlineDashboard />,
    title: 'Dashboard',
  },

  {
    title: 'Event',
  },
  {
    as: ROUTES['my-events'],
    href: ROUTES['my-events'],
    icon: <MdEventAvailable />,
    title: 'My Events',
  },
  {
    as: ROUTES['events'],
    href: ROUTES['events'],
    icon: <MdEventAvailable />,
    title: 'All Events',
  },
];
