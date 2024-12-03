import { useState, FormEvent, ChangeEvent } from 'react';

import Auth from '../utils/auth';
import { login } from '../api/authAPI';

import { UserLogin } from '../interfaces/UserLogin';

const Login = () => {
    const [ loginData, setLoginData ] = useState<UserLogin>({
        username: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const data = await login(loginData);
            Auth.login(data.token);
        } catch (error) {
            console.error('Failed to login:', error);
        }
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className='mb-3'>
                    <label htmlFor='usernameInput' className='form-label'>Username</label>
                    <input 
                        type='text' 
                        id='usernameInput'
                        name='username'
                        className='form-control' 
                        value={loginData.username || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='passwordInput' className='form-label'>Password</label>
                    <input 
                        type='password' 
                        id='passwordInput'
                        name='password'
                        className='form-control' 
                        value={loginData.password || ''}
                        onChange={handleChange}
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Login</button>
            </form>
        </div>
    );
};

export default Login;