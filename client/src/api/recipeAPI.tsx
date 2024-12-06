import Auth from '../utils/auth';
import { AddRecipeData } from '../interfaces/RecipeData';

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

// Function to send a POST request to the '/api/recipes/add' endpoint 
const addRecipeToList = async (recipeData: AddRecipeData) => {
    try {
        const response = await fetch('/api/recipes/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`
            },
            body: JSON.stringify(recipeData)
        });

        // Parse the response body as JSON
        const data = await response.json();

        // Throw error if response is not OK
        if (!response.ok) {
            // Handle specific conflict error (recipe already exists)
            if (response.status === 409) {
                return {
                    message: data.message,
                }
            }
            throw new Error(`Error: ${data.message}`);
        }

        // Return the data received from the server
        return data;
    } catch (error) {
        console.log('Error from add recipe:', error);
        return Promise.reject('Could not add recipe');
    }
}

export { search, addRecipeToList };