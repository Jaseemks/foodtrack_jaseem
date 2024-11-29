import React from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../config/axiosInstance';
import { useNavigate } from 'react-router-dom'; // import useNavigate

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      const response = await axiosInstance.post('/user/login', data);
      console.log('Login response:', response.data);
      
      // Replace this with your success logic
      localStorage.setItem('userId', response.data.userId);
      // Handle navigation based on the response

      navigate('/home');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="bg-no-repeat bg-green-400 bg-cover bg-center relative">
  {/* <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div> */}
  <div className="min-h-screen flex flex-col sm:flex-row mx-0 justify-center">
    {/* Left Section */}
    <div className="flex-col flex self-center p-5 sm:p-10 sm:max-w-5xl xl:max-w-2xl z-10 text-center sm:text-left">
      <div className="text-white">
        <h1 className="mb-3 font-bold text-3xl sm:text-5xl">
          Hi! Welcome To Food track
        </h1>
      </div>
    </div>

    {/* Form Section */}
    <div className="flex justify-center self-center z-10 w-full sm:w-auto px-4 sm:px-0">
      <div className="p-8 sm:p-12 bg-white mx-auto rounded-2xl w-full sm:w-100">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <h3 className="font-semibold text-xl sm:text-2xl text-gray-800">
              Sign In
            </h3>
            <p className="text-gray-500">Please sign in to your account.</p>
          </div>
          <div className="space-y-5">
            {/* Phone Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 tracking-wide">Phone</label>
              <input
                className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                type="number"
                placeholder="Phone number"
                {...register('phone', { required: 'Phone number is required' })}
                autoComplete="phone"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
            {/* Password Input */}
            <div className="space-y-2">
              <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">Password</label>
              <input
                className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                type="password"
                placeholder="Enter your password"
                {...register('password', { required: 'Password is required' })}
                autoComplete="current-password"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            {/* Remember Me and Forgot Password */}
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 text-sm text-gray-800">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-green-400 hover:text-green-500 mt-2 sm:mt-0">
                Forgot your password?
              </a>
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center bg-green-400 hover:bg-green-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg transition ease-in duration-500"
              >
                Sign in
              </button>
            </div>
          </div>
        </form>
        <div className="pt-5 text-center text-gray-400 text-xs">
          <span>Copyright © 2021-2022</span>
        </div>
      </div>
    </div>
  {/* </div> */}
</div>

  );
};



