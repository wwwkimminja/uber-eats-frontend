import { gql, useMutation } from '@apollo/client';
import React from 'react'
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import { LoginMutation, LoginMutationVariables } from '../__generated__/LoginMutation';

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
    const {register,getValues,handleSubmit,formState:{errors}}= useForm<ILoginForm>();
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
    <div className='h-screen flex items-center justify-center bg-gray-800'>
        <div className='bg-white w-full max-w-lg pt-8 pb-7 rounded-lg text-center'>
            <h3 className='font-bold text-lg text-gray-800'>Log in</h3>
            <form onSubmit={handleSubmit(onSubmit)}className='grid gap-5 mt-5 px-5'>
                <input {...register("email",{required:"Email is required",minLength:10})} name="email"type="email" className="input mb-3"placeholder='Email'/>
               {errors.email?.message&& <FormError errorMessage={errors.email?.message}/>}
                <input {...register("password",{required:"Password is required",minLength:10})} name="password"type="password" className="input"placeholder='Password'/>
                {errors.password?.message&& <FormError errorMessage={errors.password?.message}/>}
                {errors.password?.type==="minLength"&& <FormError errorMessage="Password must be than 10 chars"/>}
                <button className='btn mt-3'>{loading ?"Loading...":"Log In"}</button>
                {loginMutationResult?.login.error && <FormError errorMessage={loginMutationResult.login.error}/>}
            </form>
        </div>
    </div>
  )
}
 
export default Login