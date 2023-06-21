import { ROUTES } from 'routes';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { PageProps } from 'interfaces/pages';
import { IAuthLoginForm } from 'interfaces/forms';
import { SignIn } from 'services/auth.service';
import { setUserDetails } from 'redux/slices/user.slice';
import dynamic from 'next/dynamic';
import jwt from 'jwt-decode';
const AuthLoginForm = dynamic(() => import('components/ui/Forms/Auth/Login'), {
  ssr: false,
});

export default function Login({ showToast }: PageProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (values: IAuthLoginForm): Promise<void> => {
    try {
      const {
        data: { accessToken },
      } = await SignIn({
        email: values.email,
        password: values.password,
      });

      if (accessToken) {
        const decoded: JWTDecodedToken = jwt(accessToken); // decode your token here
        localStorage.setItem('token', accessToken);
        localStorage.setItem('expiryTime', String(decoded.exp));
        const user = decoded.user;
        dispatch(
          setUserDetails({
            id: user.id,
            username: user.username,
            email: user.email,
          }),
        );
        showToast({ level: 'success', message: 'User Logged In successfully' });
        router.replace(ROUTES.root);
        return;
      }
    } catch (error: any) {
      showToast({
        level: 'warning',
        message: String(error.response.data.message),
      });
    }
  };

  return <AuthLoginForm handleLogin={handleLogin} />;
}
