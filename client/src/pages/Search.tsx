import { useEffect, useState } from 'react';
import auth from '../utils/auth';

const Search = () => {
    const [ loginCheck, setLoginCheck ] = useState(false);

    useEffect(() => {
        setLoginCheck(auth.loggedIn());
      }, []);

    return (
        <>
            {
                !loginCheck? (
                    <div className='login-notice-wrapper'>
                        <div className='login-notice'>
                            <h1>
                                Sign Up or Login to start cooking!
                            </h1>
                        </div>
                    </div>
                ) : (
                    <div className='search-content'>
                        <h1>Search</h1>
                    </div>
                )
            }
        </>
    );
};

export default Search;