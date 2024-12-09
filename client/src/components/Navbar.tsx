import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        <div className='navbar navbar-expand-lg navbar-light'>
            <div className='container-fluid p-3'>
                {/* Navbar Brand */}
                <div className='main-link btn-outline-home'>
                 <Link className='navbar-brand' to='/'>Culinary Compass</Link>
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
                <div className='img-fluid'>
                <img className='max-width border-radius' src={culinaryCompass} alt='Culinary Compass' />
                </div>
                {/* Navbar Links */}
                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                        {
                            !loginCheck ? (
                                <>
                                    <li className='nav-item'>
                                        <div className='btn-outline-signup'>
                                            <Link className='nav-link btn me-2' to='/signup'>Sign Up</Link>
                                        </div>
                                    </li>
                                    <li className='nav-item'>
                                        <div className='btn-outline-login'>
                                            <Link className='nav-link btn me-2' to='/login'>Login</Link>
                                        </div>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className='nav-item btn-outline-login'>
                                        <Link className='nav-link btn me-2' to='/'>Search</Link>
                                    </li>
                                    <li className='nav-item btn-outline-signup'>
                                        <Link className='nav-link btn me-2' to='/try-it'>Try-It</Link>
                                    </li>
                                    <li className='nav-item btn-outline-favorites'>
                                        <Link className='nav-link btn me-2' to='/favorites'>Favorites</Link>
                                    </li>
                                    <li className='nav-item btn-outline-logout'>
                                        <a 
                                            href='#' 
                                            className='nav-link btn me-2' 
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