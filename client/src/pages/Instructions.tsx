import { useEffect, useState, FormEvent, ChangeEvent, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import parse from 'html-react-parser';
import { InstructionData } from '../interfaces/InstructionsData';
import { getRecipeInstructions } from '../api/instructionsAPI';
import { askAssistant } from '../api/assistantAPI';
import auth from '../utils/auth';

const Instructions = () => {
    const { recipeId } = useParams<{ recipeId: string }>();
    const [ instructionData, setInstructionData ] = useState<InstructionData | null>(null);
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);
    const [ chatMessages, setChatMessages ] = useState<string[]>([]);
    const [ question, setQuestion ] = useState<string>('');
    const [ loginCheck, setLoginCheck ] = useState<boolean>(false);

    const navigate = useNavigate();
    const chatContainerRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatMessages]);

    useEffect(() => {
        setLoginCheck(auth.loggedIn());
    }, [loginCheck]);

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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setQuestion(e.target.value);
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (!question.trim()) {
                console.error('Question must not be empty.');
                return;
            }
            if (!instructionData) {
                console.error('Cannot find instructions.');
                return;
            }
            const data = await askAssistant(question, instructionData);
            setChatMessages([...chatMessages, `User: ${question}`, `Assistant: ${data}`]);
            setQuestion('');
        } catch (error) {
            console.error('Failed to ask assistant:', error);
            setErrorMessage('Failed to ask assistant.');
        }
    }

    return (
        <>
            {
                !loginCheck? (
                    <div className='login-notice-wrapper'>
                        <div className='login-notice'>
                            <h1>
                                Sign Up or Login to start cooking!
                            </h1>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h1 className='mb-3'>Recipe Instructions</h1>
                            <button className='btn btn-secondary' onClick={() => navigate(-1)}>
                                Back
                            </button>
                        </div>
                        <div className="container mb-3">
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
                                    <div className='row'>
                                        <div className='instructions-section col-lg-6 pb-3'>
                                            <h2>Ingredients</h2>
                                            <ul>
                                                {instructionData.ingredients.map((ingredient, index) => (
                                                    <li key={index}>{ingredient}</li>
                                                ))}
                                            </ul>
                                            <h2>Instructions</h2>
                                            <div>{renderInstructions(instructionData.instructions)}</div>
                                            <h3>Ready in:</h3>
                                            <p className='ps-3'>{instructionData.readyInMinutes} minutes</p>
                                            <h3>Servings:</h3>
                                            <p className='ps-3'>{instructionData.servings}</p>
                                        </div>
                                        <div className='chat-section col-lg-6'>
                                            <h2>Chat Assistant</h2>
                                            <div 
                                                className='chat-container mb-3'
                                                ref={chatContainerRef}
                                            >
                                                {chatMessages.length > 0 ? (
                                                    chatMessages.map((message, index) => (
                                                        <div key={index}>
                                                            {message.startsWith("User:") ? (
                                                                <div className='d-flex justify-content-end'>
                                                                    <p className='user-message p-2'><strong>{message.replace('User: ', '')}</strong></p>
                                                                </div>
                                                            ) : (
                                                                <ReactMarkdown 
                                                                    className={`assistant-message p-2 ${index !== chatMessages.length - 1 ? 'mb-3' : ''}`}
                                                                >
                                                                    {message.replace('Assistant: ', '')}
                                                                </ReactMarkdown>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No messages yet. Ask a question below!</p>
                                                )}
                                            </div>
                                            <form onSubmit={handleSubmit} className='d-flex'>
                                                <input 
                                                    type='text'
                                                    id='questionInput'
                                                    name='input'
                                                    value={question}
                                                    className='form-control me-3'
                                                    onChange={handleChange}
                                                    placeholder='Ask a question about this recipe...'
                                                    aria-label='Ask a question'
                                                />
                                                <button type='submit' className='btn btn-primary' disabled={!question.trim()}>Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </>
                )
            }
        </>
    );
};

export default Instructions;