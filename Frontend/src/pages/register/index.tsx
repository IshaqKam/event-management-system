import { ROUTES } from 'routes';
import { useRouter } from 'next/router';
import { PageProps } from 'interfaces/pages';
import { IAuthSignupForm } from 'interfaces/forms';
import { SignUp } from 'services/auth.service';
import dynamic from 'next/dynamic';

const AuthSignUpForm = dynamic(
  () => import('components/ui/Forms/Auth/Register'),
  {
    ssr: false,
  },
);

export default function Register({ showToast }: PageProps) {
  const router = useRouter();

  const handleRegister = async (values: IAuthSignupForm): Promise<void> => {
    try {
      const {
        data: { _id, email },
      } = await SignUp({
        email: values.email,
        password: values.password,
        name: values.name,
      });

      if (_id && email) {
        showToast({
          level: 'success',
          message: 'User Registered successfully',
        });
        router.replace(ROUTES.login);
        return;
      }
    } catch (error: any) {
      showToast({
        level: 'warning',
        message: String(error.response.data.message),
      });
    }
  };

  return <AuthSignUpForm handleRegister={handleRegister} />;
}
