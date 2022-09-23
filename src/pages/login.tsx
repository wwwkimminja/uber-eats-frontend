import React from 'react'
import { useForm } from 'react-hook-form';

interface ILoginForm{
    email?:string;
    password?:string;
}
function Login() {
    const {register,getValues,handleSubmit,formState:{errors}}= useForm<ILoginForm>();
    const onSubmit=()=>{
        console.log(getValues())
    }
  return (
    <div className='h-screen flex items-center justify-center bg-gray-800'>
        <div className='bg-white w-full max-w-lg pt-8 pb-7 rounded-lg text-center'>
            <h3 className='font-bold text-lg text-gray-800'>Log in</h3>
            <form onSubmit={handleSubmit(onSubmit)}className='grid gap-5 mt-5 px-5'>
                <input {...register("email",{required:"Email is required",minLength:10})} name="email"type="email" className="input mb-3"placeholder='Email'/>
                <span>{errors.email?.message}</span>
                <input {...register("password",{required:"Password is required"})} name="password"type="password" className="input"placeholder='Password'/>
                <button className='btn mt-3'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login