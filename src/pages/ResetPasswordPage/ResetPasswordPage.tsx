import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useAuthStore } from '@stores/authStore';
import { TextField } from '@components/TextField';
import { Button } from '@components/Button';

type FormValues = {
  newPassword: string;
  confirmPassword: string;
};

export const ResetPasswordPage = () => {
  const { control, handleSubmit, setError } = useForm<FormValues>();
  const { resetPassword, isAuthenticated, authError } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<FormValues> = ({
    newPassword,
    confirmPassword,
  }) => {
    if (newPassword !== confirmPassword) {
      return setError('confirmPassword', {
        type: 'custom',
        message: 'Passwords do not match',
      });
    }

    resetPassword(newPassword);
  };

  return (
    <div className="flex flex-col justify-center w-full h-screen p-10 max-w-xl m-auto">
      <form
        className="flex flex-col justify-center w-full h-screen"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="bg-white flex flex-col justify-center p-8 rounded-lg">
          <Controller
            name="newPassword"
            control={control}
            rules={{ required: true }}
            defaultValue={''}
            render={({ field, fieldState }) => (
              <TextField
                id="newPassword"
                label="New Password"
                type="password"
                placeholder="Enter your new password"
                error={fieldState.error}
                {...field}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            rules={{ required: true }}
            defaultValue={''}
            render={({ field, fieldState }) => (
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
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
  );
};
