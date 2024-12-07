import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

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
        <div className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className='container-fluid p-3'>
                {/* Navbar Brand */}
                <Link className='navbar-brand' to='/'>Culinary Compass</Link>
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
                    <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                        {
                            !loginCheck ? (
                                <>
                                    <li className='nav-item'>
                                        <Link className='nav-link btn btn-outline-primary me-2' to='/signup'>Sign Up</Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link className='nav-link btn btn-outline-secondary' to='/login'>Login</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className='nav-item'>
                                        <Link className='nav-link btn me-2' to='/'>Search</Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link className='nav-link btn me-2' to='/try-it'>Try-It</Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link className='nav-link btn me-2' to='/favorites'>Favorites</Link>
                                    </li>
                                    <li className='nav-item'>
                                        <a 
                                            href='#' 
                                            className='nav-link btn btn-outline-danger me-2' 
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