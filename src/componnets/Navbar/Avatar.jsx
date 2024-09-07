import React, { useContext } from 'react';
import avatar from '../../../public/assets/images/placeholder.jpg'
import { AuthContext } from '../../providers/AuthProvider';

const Avatar = () => {
    const {user }= useContext(AuthContext);
    return (
        <img className='rounded-full'
         src={user && user.photoURL? user.photoURL : avatar}
           alt="profile"
           width={40} 
          height={40} />
    );
};

export default Avatar;