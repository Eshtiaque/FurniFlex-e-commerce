import Avatar from './Avatar'
import { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import { Link } from 'react-router-dom'
import { PiHandbagSimpleBold } from "react-icons/pi";
import { db } from '../../firebase/firebase.config';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';

const MenuDropDown = () => {

  const { user, logOut } = useContext(AuthContext); 
  const [isOpen, setIsOpen] = useState(false); 
  const [cartLength, setCartLength] = useState(0); 

  // Toggle dropdown open/close
  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

 // Fetch cart length for the current user in real-time
 useEffect(() => {
  let unsubscribe;

  if (user && user.uid) {
    try {
      // Query Firestore for the user's cart items
      const cartQuery = query(
        collection(db, 'cart'),
        where('userId', '==', user.uid)
      );

     
      unsubscribe = onSnapshot(cartQuery, (snapshot) => {
        setCartLength(snapshot.size); 
      });
    } catch (error) {
      console.error('Error fetching cart length:', error);
      toast.error('Error fetching cart length');
    }
  } else {
    setCartLength(0); 
  }

  return () => {
    if (unsubscribe) unsubscribe();
  };
}, [user, setCartLength]);

  return (
    <div className='relative'>
      <div className='flex flex-row items-center '>

        <div className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>

          <div className="indicator">
            <span className="indicator-item badge me-2 mb-2 indicator-bottom w-6 h-4 rounded-full bg-black text-white ">{cartLength}</span>
            <Link to={"/cart"} className="btn-sm "><PiHandbagSimpleBold className='w-6 h-8' /></Link>
          </div>
          

        </div>
        <div
          onClick={toggleOpen}
          className='p-4 md:py-1 md:px-2  flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <div className='hidden md:block'>
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            
            {user ? (
              <div
                onClick={logOut}
                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
              >
                Logout
              </div>
            ) : (
              <>
                <Link
                  to='/login'
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                >
                  Login
                </Link>
                <Link
                  to='/signUp'
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuDropDown;