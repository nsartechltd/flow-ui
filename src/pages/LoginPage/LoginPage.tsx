import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { TextField } from '@components/TextField';
import { Button } from '@components/Button';
import { useAuthStore } from '@stores/authStore';
import { Header } from '@components/Header';

type FormValues = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const { control, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();
  const { isAuthenticated, authenticate, newPasswordRequired, authError } =
    useAuthStore();

  const onSubmit: SubmitHandler<FormValues> = ({ email, password }) =>
    authenticate(email, password);

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
    if (newPasswordRequired) navigate('/reset-password');
  }, [isAuthenticated, newPasswordRequired, navigate]);

  return (
    <>
      <div className="flex flex-col justify-center max-w-xl m-auto">
        <Header padding="py-20" />
        <form
          className="flex flex-col justify-center"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="bg-white flex flex-col justify-center p-8 rounded-lg">
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              defaultValue={''}
              render={({ field, fieldState }) => (
                <TextField
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email address"
                  error={fieldState.error}
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              defaultValue={''}
              render={({ field, fieldState }) => (
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  error={fieldState.error}
                  {...field}
                />
              )}
            />
            <div className="flex flex-fol justify-center pt-5">
              <Button
                text="Sign in"
                type="submit"
                className="bg-flow-blue shrink w-32 h-14 text-white"
              />
            </div>
            {authError && <div className="text-red">{authError}</div>}
          </div>
        </form>
      </div>
    </>
  );
};
