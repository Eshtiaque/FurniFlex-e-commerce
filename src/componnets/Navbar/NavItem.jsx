import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const NavItem = () => {
  return (
    <div className='w-full md:w-auto mx-auto rounded-full shadow-sm bg-white'>
      <div className='flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12'>
        <Link
          to='/'
          className='text-gray-700 hover:text-gray-900  rounded-full transition-colors duration-300'
        >
          Home
        </Link>
        <Link
          to='/cart'
          className='text-gray-700 hover:text-gray-900 rounded-full transition-colors duration-300'
        >
          Products
        </Link>
        <Link
          to='/'
          className='text-gray-700 hover:text-gray-900  rounded-full transition-colors duration-300'
        >
          Categories
        </Link>
        <Link
          to='/'
          className='text-gray-700 hover:text-gray-900  rounded-full transition-colors duration-300'
        >
          Custom
        </Link>
        <Link
          to='/'
          className='text-gray-700 hover:text-gray-900  rounded-full transition-colors duration-300'
        >
          Blog
        </Link>
       
      </div>
    </div>
  );
};

export default NavItem;
