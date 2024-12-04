import Auth from '../utils/auth';

// Function to send a GET request to the '/api/recipes/search' endpoint 
const search = async (searchQuery: string) => {
    try {
        const response = await fetch(
            `/api/recipes/search?query=${encodeURIComponent(searchQuery)}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Auth.getToken()}`
                }
            }
        );

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
        console.log('Error from recipe search:', error);
        return Promise.reject('Could not search recipe');
    }
}

export { search };