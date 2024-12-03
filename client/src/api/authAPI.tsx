import { UserLogin } from '../interfaces/UserLogin';
import { UserSignup } from '../interfaces/UserSignup';

// Function to send a POST request to the '/auth/login' endpoint with user login information
const login = async (userInfo: UserLogin) => {
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });

        // Throw error if response is not OK
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message}`);
        }

        // Parse the response body as JSON
        const data = await response.json();

        // Return the data received from the server
        return data;
    } catch (error) {
        console.log('Error from user login:', error);
        return Promise.reject('Could not fetch user info');
    }
}

// Function to send a POST request to the '/auth/register' endpoint with user sign up information
const signup = async (userInfo: UserSignup) => {
    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });

        // Throw error if response is not OK
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed.');
        }

        // Parse the response body as JSON
        const data = await response.json();

        // Return the data received from the server
        return data;
    } catch (error) {
        console.log('Error from user sign up:', error);
        return Promise.reject('Could not create user.');
    }
}

export { login, signup };