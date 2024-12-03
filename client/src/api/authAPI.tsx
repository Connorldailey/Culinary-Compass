import { UserLogin } from '../interfaces/UserLogin';

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

export { login };