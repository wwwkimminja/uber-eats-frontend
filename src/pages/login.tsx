import { gql, useMutation } from '@apollo/client';
import React from 'react'
import Helmet from 'react-helmet';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import { LoginMutation, LoginMutationVariables } from '../__generated__/LoginMutation';
import uberLogo from "../images/logo.svg"
import { Button } from '../components/button';
import { Link } from 'react-router-dom';

const LOGIN_MUTATION=gql`
    mutation LoginMutation($loginInput:LoginInput!){
        login(input:$loginInput){
            ok
            token
            error
        }
    }
`

interface ILoginForm{
    email:string;
    password:string;
}
function Login() {
    const {register,getValues,handleSubmit,formState:{errors,isValid}}= useForm<ILoginForm>({
        mode:"onChange",
    });
    const onCompleted =(data:LoginMutation)=>{
        const {login:{error,ok,token}}=data;
        if(ok){
            console.log(token)
        }
        console.log(error)
      
    }
  
    const [loginMutation,{data:loginMutationResult,loading}]=useMutation<LoginMutation,LoginMutationVariables>(LOGIN_MUTATION,{
       onCompleted,
       
    });
    const onSubmit=()=>{
        if(!loading){
            const {email,password}=getValues();
            loginMutation({
                variables:{
                    loginInput:{
                        email,
                        password,
                    }
                }
            });
        }
       
    }
  return (
    <div className='h-screen flex items-center flex-col mt-10 lg:mt-28 m-6'>
        <Helmet>
        <title>Login | Uber Eats</title>
        </Helmet>
        <div className="w-full max-w-screen-sm flex flex-col items-center">
       <img src={uberLogo} className='w-52 mb-5' alt="uber eats logo"/>
       <h4 className='w-full font-medium text-left text-3xl mb-5'>Welcome back</h4>
            <form onSubmit={handleSubmit(onSubmit)}className='grid gap-5 mt-5  w-full'>
                <input {...register("email",{required:"Email is required",minLength:10})} name="email"type="email" className='input' placeholder='Email'/>
               {errors.email?.message&& <FormError errorMessage={errors.email?.message}/>}
                <input {...register("password",{required:"Password is required",minLength:10})} name="password"type="password" className='input' placeholder='Password'/>
                {errors.password?.message&& <FormError errorMessage={errors.password?.message}/>}
                {errors.password?.type==="minLength"&& <FormError errorMessage="Password must be than 10 chars"/>}
              <Button canClick={isValid} loading={loading} actionText={"Create Account"}/>
                {loginMutationResult?.login.error && <FormError errorMessage={loginMutationResult.login.error}/>}
            </form>
            <div>
                New to Uber? <Link to="/create-account" className=" text-lime-600 hover:underline ">Create an Account</Link>
            </div>
        </div>
        </div>
  )
}
 
export default Login