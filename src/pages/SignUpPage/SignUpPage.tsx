import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useAuthStore } from '@stores/authStore';
import { TextField } from '@components/TextField';
import { Button } from '@components/Button';
import { Header } from '@components/Header';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  birthdate: string;
  organisation: string;
  password: string;
  confirmPassword: string;
};

export const SignUpPage = () => {
  const { control, handleSubmit, setError } = useForm<FormValues>();
  const {
    signUp,
    isAuthenticated,
    authError,
    cognitoUser,
    isConfirmed,
    setUserDetails,
  } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const priceId = searchParams.get('priceId');

  useEffect(() => {
    if (cognitoUser && !isConfirmed) {
      navigate('/verify', { replace: true, state: { priceId } });
      return;
    }

    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate, cognitoUser, isConfirmed, priceId]);

  const onSubmit: SubmitHandler<FormValues> = (userDetails) => {
    if (userDetails.password !== userDetails.confirmPassword) {
      return setError('confirmPassword', {
        type: 'custom',
        message: 'Passwords do not match',
      });
    }

    signUp(userDetails);
    setUserDetails(userDetails);
  };

  return (
    <div className="md:flex flex-col justify-center p-10 m-auto">
      <Header padding="md:pb-20" />
      <form
        className="md:flex flex-col justify-center"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="bg-white flex flex-col justify-around p-8 rounded-lg">
          <div className="md:flex flex-row justify-around">
            <div className="md:flex flex-col justify-around md:w-96">
              <Controller
                name="firstName"
                control={control}
                rules={{ required: true }}
                defaultValue={''}
                render={({ field, fieldState }) => (
                  <TextField
                    id="firstName"
                    label="First Name"
                    type="text"
                    placeholder="First Name"
                    error={fieldState.error}
                    {...field}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                rules={{ required: true }}
                defaultValue={''}
                render={({ field, fieldState }) => (
                  <TextField
                    id="lastName"
                    label="Last Name"
                    type="text"
                    placeholder="Last Name"
                    error={fieldState.error}
                    {...field}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                defaultValue={''}
                render={({ field, fieldState }) => (
                  <TextField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="Email"
                    error={fieldState.error}
                    {...field}
                  />
                )}
              />
              <Controller
                name="organisation"
                control={control}
                rules={{ required: true }}
                defaultValue={''}
                render={({ field, fieldState }) => (
                  <TextField
                    id="organisation"
                    label="Organisation / Company"
                    type="text"
                    placeholder="Organisation / Company"
                    error={fieldState.error}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="md:flex flex-col justify-around md:w-96">
              <Controller
                name="birthdate"
                control={control}
                rules={{ required: true }}
                defaultValue={''}
                render={({ field, fieldState }) => (
                  <TextField
                    id="birthdate"
                    label="Date of Birth"
                    type="date"
                    placeholder="Date of Birth"
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
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <div className="flex flex-col justify-center pt-5">
              <Button
                text="Sign Up"
                type="submit"
                className="bg-flow-blue shrink w-32 h-14 text-white"
              />
            </div>
          </div>
          {authError && <div className="text-red">{authError}</div>}
        </div>
      </form>
    </div>
  );
};
