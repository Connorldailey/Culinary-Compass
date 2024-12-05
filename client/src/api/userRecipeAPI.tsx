import Auth from '../utils/auth';

// Function to send a GET request to the '/api/userRecipes/getUserRecipes' endpoint 
const getUserRecipes = async (category: string) => {
    try {
        const params = new URLSearchParams({ category });
        const response = await fetch(`/api/userRecipes/getUserRecipes?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`
            }
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
        console.log('Error from get user recipes:', error);
        return Promise.reject('Could not get user recipes');
    }
}

const deleteUserRecipe = async (userRecipeId: number) => {
    try {
        const response = await fetch(
            `api/userRecipes/deleteUserRecipe/${userRecipeId}`, 
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getToken()}`
                }
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message}`);
        }

        console.log('Recipe successfully deleted');
    } catch (error) {
        console.error('Failed to delete recipe:', error);
    }
}

export { getUserRecipes, deleteUserRecipe }