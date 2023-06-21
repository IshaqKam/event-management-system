import Input from './input';
import Button from './button';
import { memo } from 'react';
import { useFormik } from 'formik';
import { AppLoader } from 'components';
import { IAuthLoginForm } from 'interfaces/forms';
import LoginFormValidator from 'validators/forms/login';
import { AppButton } from 'components/common/Button';
import { ROUTES } from 'routes';
import { useRouter } from 'next/router';

type Props = {
  handleLogin: (values: IAuthLoginForm) => void;
};

function NewAuthLoginForm({ handleLogin }: Props) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleLogin,
    validationSchema: LoginFormValidator,
  });

  const handleRegisterRoute = () => {
    router.replace(ROUTES.register);
  };

  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center">
      {formik.isSubmitting ? (
        <AppLoader />
      ) : (
        <div className="p-8 shadow-lg bg-white lg:w-[37%]">
          <form onSubmit={formik.handleSubmit} className="px-1 sm:px-10 pb-5">
            <div className="my-4 text-center">
              <p className="text-3xl font-semibold">{'Log In'}</p>
            </div>

            <Input
              name="email"
              type="email"
              label={'Email'}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email}
            />

            <Input
              name="password"
              type="password"
              label={'Password'}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password}
            />

            <Button
              type="submit"
              className="my-4"
              text={'Submit'}
              disabled={formik.isSubmitting}
            />
            <AppButton
              title="Dont have an account?"
              color="inherit"
              type="button"
              fullWidth
              sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
              }}
              onClick={handleRegisterRoute}
            />
          </form>
        </div>
      )}
    </main>
  );
}

export default memo(NewAuthLoginForm);
