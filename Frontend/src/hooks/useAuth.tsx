import { ROUTES } from 'routes';
import { RootState } from 'redux/store';
import { useRouter } from 'next/router';
import { SignOut } from 'services/auth.service';
import { useCallback, useEffect, useState } from 'react';
import { setUserDetails } from 'redux/slices/user.slice';
import { useAppDispatch, useAppSelector } from 'hooks/useReduxHook';
import jwtDecode from 'jwt-decode';

export default function useAuth() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state);

  const [isLoading, setIsLoading] = useState(true);

  const checkAuthState = useCallback(async () => {
    if (user.id) {
      setIsLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    const expiryTime = localStorage.getItem('expiryTime');

    if (token && expiryTime) {
      const currentTime = new Date().getTime();
      const tokenExpiryTime = parseInt(expiryTime, 10) * 1000;

      if (currentTime < tokenExpiryTime) {
        const decoded: JWTDecodedToken = jwtDecode(token);
        const user = decoded.user;
        dispatch(
          setUserDetails({
            id: user.id,
            username: user.username,
            email: user.email,
          }),
        );
        return;
      } else {
        SignOut();
        dispatch(
          setUserDetails({
            id: '',
            username: '',
            email: '',
          }),
        );
        router.replace(ROUTES.login);
      }
    } else {
      // SignOut();
      // dispatch(
      //   setUserDetails({
      //     id: '',
      //     username: '',
      //     email: '',
      //   }),
      // );
      // router.replace(ROUTES.login);
    }

    setIsLoading(false);
  }, [router, user.id, dispatch]);

  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  return [isLoading];
}
