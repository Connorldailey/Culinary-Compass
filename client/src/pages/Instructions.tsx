import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { InstructionData } from '../interfaces/InstructionsData';
import { getRecipeInstructions } from '../api/instructionsAPI';

const Instructions = () => {
    const { recipeId } = useParams<{ recipeId: string }>();
    const [instructionData, setInstructionData] = useState<InstructionData | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigate = useNavigate();

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

    const renderInstructions = (instructions: string) => {
        // If the instructions contain HTML tags like <ol>, <li>, etc., use `html-react-parser`
        if (instructions.includes('<ol>') || instructions.includes('<li>') || instructions.includes('<p>')) {
            return parse(instructions);
        }

        // Otherwise, assume plain text and split by line breaks to create paragraphs
        return instructions.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
        ));
    };

    return (
        <div className="container mb-3">
            <h1>Recipe Instructions</h1>
            {errorMessage ? (
                <>
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                    <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
                        Back
                    </button>
                </>
            ) : instructionData ? (
                <>
                    <div>
                        <h2>Ingredients</h2>
                        <ul>
                            {instructionData.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                        <h2>Instructions</h2>
                        <div>{renderInstructions(instructionData.instructions)}</div>
                        <h3>Ready in: {instructionData.readyInMinutes} minutes</h3>
                        <h3>Servings: {instructionData.servings}</h3>
                    </div>
                    <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
                        Back
                    </button>
                </>
            ) : null}
        </div>
    );
};

export default Instructions;