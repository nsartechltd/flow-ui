import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { TextField } from '@components/TextField';
import { Button } from '@components/Button';
import { Header } from '@components/Header';

type PeopleFormValues = {
  firstName: string;
  lastName: string;
  includeInEmails?: string;
  email?: string;
};

type ContactFormValues = {
  name: string;
  website?: string;
  companyRegNumber?: string;
  people?: PeopleFormValues[];
};

export const ContactPage = () => {
  const { control, handleSubmit } = useForm<ContactFormValues>();

  const onSubmit: SubmitHandler<ContactFormValues> = (contactDetails) => {
    console.log(contactDetails);
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
                name="name"
                control={control}
                rules={{ required: true }}
                defaultValue={''}
                render={({ field, fieldState }) => (
                  <TextField
                    id="name"
                    label="Name"
                    type="text"
                    required={true}
                    placeholder="Business name or person"
                    error={fieldState.error}
                    {...field}
                  />
                )}
              />
              <Controller
                name="website"
                control={control}
                rules={{ required: true }}
                defaultValue={''}
                render={({ field, fieldState }) => (
                  <TextField
                    id="website"
                    label="Website"
                    type="text"
                    placeholder="https://example.com"
                    error={fieldState.error}
                    {...field}
                  />
                )}
              />
              <Controller
                name="companyRegNumber"
                control={control}
                rules={{ required: true }}
                defaultValue={''}
                render={({ field, fieldState }) => (
                  <TextField
                    id="companyRegNumber"
                    label="Company Reg Number"
                    type="text"
                    placeholder="Organisation / Company"
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
          {/* {authError && <div className="text-red">{authError}</div>} */}
        </div>
      </form>
    </div>
  );
};
