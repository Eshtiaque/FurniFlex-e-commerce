import React from 'react';
import logo from '../../assets/images/nav-logo.png'
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to='/'>
            <img className='w-36 md:block' src={logo} alt="logo"  />

        </Link>);
};

export default Logo;