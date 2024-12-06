import Auth from '../utils/auth';

const getRecipeInstructions = async (recipeId: number) => {
    try {
        const response = await fetch(`/api/instructions/${recipeId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message}`);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching recipe instructions:', error);
        return Promise.reject('Could not fetch recipe instructions.');
    }
}

export { getRecipeInstructions };