import React, { useContext, useState } from 'react';
import Logo from './Logo';
import MenuDropDown from './MenuDropDown';
import NavItem from './NavItem';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className=' sticky top-0 z-50   lg:max-w-full mx-auto w-full bg-white shadow-sm'>
      <div className='py-4 border-b border-gray-200 '>
        <div className='flex items-center justify-between px-4 md:px-6 lg:px-8'>
          <Logo />

          {/* Hamburger Menu Button for Mobile */}
          <button
            className='block lg:hidden text-gray-600 hover:text-gray-800 focus:outline-none'
            onClick={toggleMenu}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16m-7 6h7'
              />
            </svg>
          </button>

          {/* Navbar Items for Desktop */}
          <div className='hidden lg:flex flex-grow items-center justify-end gap-6'>
            <NavItem />
            <MenuDropDown />
          </div>
          

          {/* Mobile Menu */}
          <div
            className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 lg:hidden ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className='p-4'>
              <button
                className='text-gray-600 hover:text-gray-800'
                onClick={toggleMenu}
              >
                 
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
              <div className='mt-4 gap-y-4 items-center flex flex-col'>
               
                <NavItem />
                {/* <MenuDropDown /> */}
                <Avatar />
               <div className=''>
               <Link
                  to='/login'
                  className='btn bg-black text-white btn-sm border mt-4 rounded-full '
                >
                  LogIn
                </Link>
                <Link className='ms-2 bg-black text-white  btn btn-sm border mt-4 rounded-full ' onClick={logOut}>LogOut</Link>
               </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
