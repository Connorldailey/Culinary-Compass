import { useState, FormEvent, ChangeEvent } from 'react';

import Auth from '../utils/auth';
import { signup } from '../api/authAPI';

import { UserSignup } from '../interfaces/UserSignup';

const SignUp = () => {
    const [ signupData, setSignupData ] = useState<UserSignup>({
        username: '',
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        });
        setErrorMessage('');
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
 
        if (!signupData.email || !emailRegex.test(signupData.email)) {
            setErrorMessage('Must use a valid email.');
            return;
        }

        try {
            const data = await signup(signupData);
            Auth.login(data.token);
        } catch (error) {
            console.error('Failed to sign up:', error);
            setErrorMessage('Username or email already exists.');
        }
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <div className='mb-3'>
                    <label htmlFor='usernameInput' className='form-label'>Username</label>
                    <input 
                        type='text' 
                        id='usernameInput'
                        name='username'
                        className='form-control' 
                        value={signupData.username || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='emailInput' className='form-label'>Email</label>
                    <input 
                        type='text' 
                        id='emailInput'
                        name='email'
                        className='form-control' 
                        value={signupData.email || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='passwordInput' className='form-label'>Password</label>
                    <input 
                        type='password' 
                        id='passwordInput'
                        name='password'
                        className='form-control' 
                        value={signupData.password || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                {errorMessage && (
                    <div className='alert alert-danger' role='alert'>
                        {errorMessage}
                    </div>
                )}
                <button type='submit' className='btn btn-primary'>Sign Up</button>
            </form>
            
        </div>
    );
};

export default SignUp;