import Auth from '../utils/auth';
import { InstructionData } from '../interfaces/InstructionsData';

const askAssistant = async (question: string, recipeDetails: InstructionData) => {
    console.log(question, recipeDetails);
    try {
        const response = await fetch('/api/assistant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            },
            body: JSON.stringify( {question, recipeDetails} ),
        });

        // Throw error if response is not OK
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message}`);
        }

        // Parse the response body as JSON
        const data = await response.json();

        return data.result;
    } catch (error) {
        console.error('Error getting response from assistant:', error);
        return Promise.reject('Could not get response from assistant.');
    }
}

export { askAssistant };