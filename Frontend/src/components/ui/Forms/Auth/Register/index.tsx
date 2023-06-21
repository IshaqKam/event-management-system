import Input from './input';
import Button from './button';
import { memo } from 'react';
import { useFormik } from 'formik';
import { AppButton, AppLoader } from 'components';
import { IAuthSignupForm } from 'interfaces/forms';
import SignUpFormValidator from 'validators/forms/register';
import { ROUTES } from 'routes';
import { useRouter } from 'next/router';

type Props = {
  handleRegister: (values: IAuthSignupForm) => void;
};

function NewAuthSignUpForm({ handleRegister }: Props) {
  const router = useRouter();

  const {
    values,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    onSubmit: handleRegister,
    validationSchema: SignUpFormValidator,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const handleLoginRoute = () => {
    router.replace(ROUTES.login);
  };

  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center">
      {isSubmitting ? (
        <AppLoader />
      ) : (
        <div className="p-8 shadow-lg bg-white lg:w-[37%]">
          <form onSubmit={handleSubmit} className="px-1 sm:px-10 pb-5">
            <div className="my-4 text-center">
              <p className="text-3xl font-semibold">Register</p>
            </div>
            <Input
              name="name"
              type="name"
              label={'Name'}
              onBlur={handleBlur}
              value={values.name}
              onChange={handleChange}
              error={errors.name}
              touched={Boolean(touched.name)}
            />

            <Input
              name="email"
              type="email"
              label={'Email'}
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              touched={Boolean(touched.email)}
            />

            <Input
              name="password"
              type="password"
              label={'Password'}
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              touched={Boolean(touched.password)}
            />

            <Button
              type="submit"
              className="my-4"
              text={'Submit'}
              disabled={isSubmitting}
            />
          </form>
          <AppButton
            title="Already have an account?"
            color="inherit"
            type="button"
            fullWidth
            sx={{
              backgroundColor: 'transparent',
              boxShadow: 'none',
            }}
            onClick={handleLoginRoute}
          />
        </div>
      )}
    </main>
  );
}

export default memo(NewAuthSignUpForm);
