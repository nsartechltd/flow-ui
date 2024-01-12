import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@stores/authStore';
import { TextField } from '@components/TextField';
import { Button } from '@components/Button';
import { Header } from '@components/Header';

type FormValues = {
  code: string;
};

export const VerifyPage = () => {
  const { control, handleSubmit } = useForm<FormValues>();
  const {
    verifyAccount,
    authError,
    isConfirmed,
    isAuthenticated,
    cognitoUser,
  } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated && isConfirmed) {
      navigate('/checkout', {
        replace: true,
        state: {
          priceId: location.state.priceId,
          email: cognitoUser?.getUsername(),
        },
      });
      return;
    }
  }, [
    isAuthenticated,
    isConfirmed,
    navigate,
    location.state.priceId,
    cognitoUser,
  ]);

  const onSubmit: SubmitHandler<FormValues> = ({ code }) => verifyAccount(code);

  return (
    <div className="md:flex flex-col justify-center max-w-xl p-10 m-auto">
      <Header padding="py-20" />
      <form
        className="flex flex-col justify-center"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="bg-white flex flex-col justify-center p-8 rounded-lg">
          <Controller
            name="code"
            control={control}
            rules={{ required: true }}
            defaultValue={''}
            render={({ field, fieldState }) => (
              <TextField
                id="code"
                label="Verification Code"
                type="text"
                placeholder="123456"
                error={fieldState.error}
                {...field}
              />
            )}
          />
          <div className="flex flex-fol justify-center pt-5">
            <Button
              text="Verify"
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
