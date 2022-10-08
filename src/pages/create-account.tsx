import { gql, useMutation } from '@apollo/client';
import React from 'react';
import Helmet from 'react-helmet';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import uberLogo from '../images/logo.svg';
import { Button } from '../components/button';
import { Link } from 'react-router-dom';
import { UserRole } from '../__generated__/globalTypes';

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccountMutation($createAccountInput:CreateAccountInput!){
      createAccount(input: $createAccountInput)
      {
        ok
      error
      }
    }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role:UserRole;
}
function CreateAccount() {
  const {
    register,
    getValues,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICreateAccountForm>({
    mode: 'onChange',
    defaultValues:{
        role:UserRole.Client
    }
  });
  console.log("watch",watch());


  const [createAccountMutation] = useMutation(CREATE_ACCOUNT_MUTATION, {});
  const onSubmit = () => {};
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28 m-6">
      <Helmet>
        <title>Create Account | Uber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center">
        <img src={uberLogo} className="w-52 mb-5" alt="uber eats logo" />

        <h4 className="w-full font-medium text-left text-3xl mb-5">Let's get started</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 mt-5  w-full">
          <input
            {...register('email', {
              required: 'Email is required',
              minLength: 10,
            })}
            name="email"
            type="email"
            className="input"
            placeholder="Email"
          />
          {errors.email?.message && <FormError errorMessage={errors.email?.message} />}
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: 10,
            })}
            name="password"
            type="password"
            className="input"
            placeholder="Password"
          />
          {errors.password?.message && <FormError errorMessage={errors.password?.message} />}
          {errors.password?.type === 'minLength' && (
            <FormError errorMessage="Password must be than 10 chars" />
          )}
          <select {...register('role')}>
           {Object.keys(UserRole).map((role,index)=>(<option key={index}>{role}</option>)) }
          </select>
          <Button canClick={isValid} loading={false} actionText={'Log in'} />
 
        </form>
        <div>
         Already have an account?{' '}
          <Link to="/"className=" text-lime-600 hover:underline "> Log in now</Link>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
