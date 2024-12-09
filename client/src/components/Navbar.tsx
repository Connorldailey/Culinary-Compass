import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import auth from '../utils/auth';
import culinaryCompass from '../assets/images/culinaryCompass.jpg';

const Navbar = () => {
    const [ loginCheck, setLoginCheck ] = useState(false);

    const checkLogin = () => {
        setLoginCheck(auth.loggedIn());
    };

    useEffect(() => {
        // Update login status on mount
        checkLogin();

        // Add a listener to check login state whenever localStorage changes
        const handleStorageChange = () => {
            checkLogin();
        };
        
        window.addEventListener('storage', handleStorageChange);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div className='navbar navbar-expand-lg'>
            <div className='container-fluid p-3 d-flex align-items-center'>
                {/* Navbar Brand */}
                <div className='d-flex align-items-center'>
                    <img className='brand-image me-3' src={culinaryCompass} alt='Culinary Compass' />
                    <NavLink className='navbar-brand brand-link p-1' to='/'>Culinary Compass</NavLink>
                </div>
                {/* Toggler Button */}
                <button 
                    className='navbar-toggler' 
                    type='button' 
                    data-bs-toggle='collapse' 
                    data-bs-target='#navbarSupportedContent' 
                    aria-controls='navbarSupportedContent' 
                    aria-expanded='false' 
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                {/* Navbar Links */}
                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav ms-auto pt-3 pt-lg-0'>
                        {
                            !loginCheck ? (
                                <>
                                    <li className='nav-item'>
                                        <NavLink className='nav-link btn me-lg-3 signup-btn' to='/signup' >Sign Up</NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink className='nav-link btn login-btn' to='/login'>Login</NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className='nav-item me-lg-3'>
                                        <NavLink className={({ isActive }) => `nav-link btn nav-btn ${isActive ? 'nav-btn-active' : ''}`} to='/'>Search</NavLink>
                                    </li>
                                    <li className='nav-item me-lg-3'>
                                        <NavLink className={({ isActive }) => `nav-link btn nav-btn ${isActive ? 'nav-btn-active' : ''}`} to='/try-it'>Try-It</NavLink>
                                    </li>
                                    <li className='nav-item me-lg-3'>
                                        <NavLink className={({ isActive }) => `nav-link btn  nav-btn ${isActive ? 'nav-btn-active' : ''}`} to='/favorites'>Favorites</NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <a 
                                            href='#' 
                                            className='nav-link btn logout-btn' 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                auth.logout();
                                            }}
                                        >
                                            Logout
                                        </a>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;

