import theme from 'theme';
import { AppButton } from 'components';
import { useRouter } from 'next/router';
import Link from 'components/common/Link';
import ListItem from '@mui/material/ListItem';

type Props = {
  as: string;
  href: string;
  title: string;
  icon: JSX.Element;
};

export function NavItem({ as, href, icon, title }: Props) {
  const router = useRouter();

  const active = href ? router.asPath === href : false;

  return (
    <Link href={href} as={as}>
      <ListItem disableGutters sx={{ px: 2 }}>
        <AppButton
          fullWidth
          startIcon={icon}
          sx={{
            backgroundColor: active ? 'rgba(255,255,255, 0.08)' : 'transparent',
            color: active
              ? theme.palette.secondary.main
              : theme.palette.text.secondary,
            fontWeight: active ? 'fontWeightBold' : 'fontWeightSemiBold',
            textAlign: 'left',
            '& .MuiButton-startIcon': {
              color: active
                ? theme.palette.secondary.main
                : theme.palette.text.secondary,
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)',
            },
          }}
        >
          <div className="grow">{title}</div>
        </AppButton>
      </ListItem>
    </Link>
  );
}
