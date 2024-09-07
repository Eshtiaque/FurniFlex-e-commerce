import React, { useContext, useState } from 'react';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import photo from '../../public/assets/images/download.png';
import logo2 from '../../public/assets/images/svgviewer-png-output (30).png';
import { AuthContext } from '../providers/AuthProvider';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const SignupPage = () => {
  const navigate = useNavigate(); 
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider;

  const [termsAccepted, setTermsAccepted] = useState(false);

  const { createUser  } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) =>{
    createUser(data.email, data.password)
    .then(result => {

        const loggedUser = result.user;
        console.log(loggedUser);
        alert('SignUp successful!');
        navigate('/'); 
})
};


  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google Sign-In successful:', result.user);
      alert('Google Sign-In successful!');
      navigate('/');
    } catch (error) {
      console.error('Google Sign-In error:', error.message);
      alert('Google Sign-In failed: ' + error.message);
    }
  };



  
//show password
const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};



  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Section - SignUp Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-4 sm:p-8">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-md shadow-lg">
          <Link to="/" className="btn-sm">
            <FiArrowLeft />
          </Link>

          <h2 className="text-center text-2xl font-semibold mb-2">Welcome To</h2>
          <h1 className="text-center text-3xl font-bold text-black">
            Furni<span className="text-blue-500">Flex</span>
          </h1>
          <p className="text-center text-gray-600 mb-4 sm:mb-6">
            Signup for purchase your desired products
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Fields */}
            <div className="grid lg:grid-cols-2 sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="text"
                placeholder="First name (optional)"
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('firstName')}
              />
              <input
                type="text"
                placeholder="Last name (optional)"
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('lastName')}
              />
            </div>

            {/* Email Field */}
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            {/* Password Field */}
            <div className="relative">
              <input
              type={showPassword ? 'text' : 'password'}
               
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
              
              <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="pr-4 text-lg  focus:outline-none  ms-64  absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-blue-400"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />} 
                                    </button>
            </div>

            {/* Terms and Policy */}
            <div className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mr-2"
              />
              <label>
                I agree to the{' '}
                <a href="#" className="text-blue-500">
                  Terms & Policy
                </a>
              </label>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
            >
              Signup
            </button>
          </form>

          {/* Social Signups */}
          <div className="flex items-center justify-between my-4">
            <span className="border-t w-1/4"></span>
            <span className="text-xs text-gray-400">or</span>
            <span className="border-t w-1/4"></span>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleGoogleSignIn}
              className="flex-1 flex items-center justify-center border px-4 py-2 rounded-md hover:bg-gray-100"
            >
              <FaGoogle className="mr-2" /> Sign in with Google
            </button>
            <button
              
              className="flex-1 flex items-center justify-center border px-4 py-2 rounded-md hover:bg-gray-100"
            >
              <FaApple className="mr-2" /> Sign in with Apple
            </button>
          </div>

          {/* Sign In Link */}
          <p className="mt-4 text-center text-sm">
            Have an account?{' '}
            <Link to="/login" className="text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section - Promotional Content */}
      <div
        className="flex-1 bg-cover bg-center text-white flex items-center justify-center relative lg:flex lg:pt-0 lg:pb-0 pt-24 pb-24"
        style={{ backgroundImage: `url(${photo})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center max-w-sm">
          <div className="flex items-center justify-center mb-6">
            <span className="bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
              <img className="w-24 h-24" src={logo2} alt="" />
            </span>
          </div>
          <h2 className="text-3xl font-bold">
            Furni<span className="text-blue-500">Flex</span>
          </h2>
          <p className="mt-4 text-gray-300">
            Discover a seamless shopping experience with our curated collection
            of products. From fashion to electronics, we bring quality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
