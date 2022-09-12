import React from 'react'

function Login() {
  return (
    <div className='h-screen flex items-center justify-center bg-gray-800'>
        <div className='bg-white w-full max-w-lg py-10 rounded-lg text-center'>
            <h3 className='font-bold text-lg text-gray-800'>Log in</h3>
            <form className='flex flex-col mt-5 px-5'>
                <input className='bg-gray-100 shadow-inner focus:outline-none  border-2 focus:border-opacity-50 focus:border-green-600  mb-3 py-3 px-5 rounded-lg'placeholder='Email'/>
                <input className='bg-gray-100 shadow-inner focus:outline-none border-2 focus:border-opacity-50 focus:border-green-600 py-3 px-5 rounded-lg'placeholder='Password'/>
                <button className='py-3 px-5 bg-gray-800 text-white mt-3 text-lg rounded-lg focus:outline-none hover:opacity-90'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login