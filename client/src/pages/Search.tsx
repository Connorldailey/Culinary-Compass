import { useEffect, useState } from 'react';
import auth from '../utils/auth';

const Search = () => {
    const [ loginCheck, setLoginCheck ] = useState(false);

    const checkLogin = () => {
        if(auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    useEffect(() => {
        checkLogin();
    }, [loginCheck])

    return (
        <h1>Test</h1>
    );
};

export default Search;