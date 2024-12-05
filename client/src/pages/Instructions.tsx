import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InstructionData } from '../interfaces/InstructionsData';
import { getRecipeInstructions } from '../api/instructionsAPI';

const Instructions = () => {
    const { recipeId } = useParams<{ recipeId: string }>();
    const [instructionData, setInstructionData] = useState<InstructionData | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        const fetchInstructions = async () => {
            if (!recipeId) {
                setErrorMessage('Invalid reicipe ID.');
                return;
            }
            try {
                const data = await getRecipeInstructions(Number(recipeId));
                setInstructionData(data);
            } catch (error) {
                console.error('Failed to fetch recipe instructions:', error);
                setErrorMessage('Could not load recipe instructions.');
            }
        };
        fetchInstructions();
    }, [recipeId]);

    return (
        <div className="container mb-3">
            <h1>Recipe Instructions</h1>
            {instructionData ? (
                <div>
                    <h2>Ingredients</h2>
                    <ul>
                        {instructionData.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h2>Instructions</h2>
                    <p>{instructionData.instructions}</p>
                    <h3>Ready in: {instructionData.readyInMinutes} minutes</h3>
                    <h3>Servings: {instructionData.servings}</h3>
                </div>
            ) : (
                <div className='alert alert-danger' role='alert'>
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default Instructions;