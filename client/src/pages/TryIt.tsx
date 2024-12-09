import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../utils/auth';
import { getUserRecipes, deleteUserRecipe } from '../api/userRecipeAPI';
import { addRecipeToList } from '../api/recipeAPI';
import { UserRecipeData } from '../interfaces/UserRecipeData';
import { RecipeData, AddRecipeData } from '../interfaces/RecipeData';
import TryItCard from '../components/TryItCard';
import MessageModal from '../components/MessageModal';

const TryIt = () => {
    const [ loginCheck, setLoginCheck ] = useState<boolean>(false);
    const [ results, setResults ] = useState<UserRecipeData[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>('');
    const [ message, setMessage ] = useState<string>('');
    const [ showModal, setShowModal ] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoginCheck(auth.loggedIn());
    }, []);

    // Get recipes in user's try it list
    const getRecipes = useCallback(async () => {
        try {
            const response = await getUserRecipes('try-it');
            setResults(response.data);
            console.log(response);
        } catch (error) {
            console.error('Failed to get recipes from try it list:', error);
            setErrorMessage(`No recipes to display.`);
        }
    }, []);

    useEffect(() => {
        if (loginCheck) {
            getRecipes();
        }
    }, [loginCheck, getRecipes]);

    const addToFavorites = async (recipe: UserRecipeData) => {
        try {
            const recipeData: AddRecipeData = {
                recipeId: recipe.recipeId,
                category: 'favorite',
            }
            const response = await addRecipeToList(recipeData);

            // Set response status message
            let modalMessage = 'Failed to add the recipe. Please try again later.';
            if (response && response.message.includes('added successfully')) {
                // Successfully added to list
                modalMessage = 'Added to favorites list.';
                console.log('Recipe added to favorites list.', response);
            } else if (response && response.message.includes('moved from')) {
                // Recipe already exists in the list
                modalMessage = `Recipe moved to favorites list.`;
                console.log(`Recipe moved to favorites list.`, response);
                setResults((prevResults) => {
                    const updatedResults = prevResults.filter((result) => result.userRecipeId !== recipe.userRecipeId);
                    
                    // If the updated results are empty, set an error message
                    if (updatedResults.length === 0) {
                        setErrorMessage('No recipes to display.');
                    }
    
                    return updatedResults;
                });
            } else {
                console.log(`Failed to add the recipe.`, response);
            }

            // Show modal with the message
            setMessage(modalMessage);
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
            }, 2000);

        } catch (error) {
            console.error('Failed to add recipe.', error);

            setMessage('Server error. Please try again later.');
            setShowModal(true);

            setTimeout(() => {
                setShowModal(false);
            }, 2000);
        }
    }

    const removeFromTryIt = async (recipe: UserRecipeData) => {
        try {
            await deleteUserRecipe(recipe.userRecipeId);
            // Update the results state to remove the deleted recipe
            setResults((prevResults) => {
                const updatedResults = prevResults.filter((result) => result.userRecipeId !== recipe.userRecipeId);
                
                // If the updated results are empty, set an error message
                if (updatedResults.length === 0) {
                    setErrorMessage('No recipes to display.');
                }

                return updatedResults;
            });
            setMessage('Recipe successfully deleted.');
            setShowModal(true);

            setTimeout(() => {
                setShowModal(false);
            }, 2000);

            console.log('Recipe removed from try it list.')

        } catch (error) {
            console.error('Failed to delete recipe from try it list:', error);
            setMessage('Failed to delete recipe.');
            setShowModal(true);

            setTimeout(() => {
                setShowModal(false);
            }, 2000);
        }
    }

    const viewRecipe = async (recipeId: number, recipeData: RecipeData) => {
        console.log(recipeId);
        navigate(`/instructions/${recipeId}`, { state: { recipeName: recipeData.title, recipeImage: recipeData.image } });
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
                    <div className='search-content'>
                        <h1 className='mb-3 text-center'>Try It</h1>
                        <div className='container'>
                            <TryItCard 
                                data={results}
                                addToList={addToFavorites}
                                removeFromList={removeFromTryIt}
                                viewRecipe={viewRecipe}
                            />
                            {errorMessage && (
                                <div className='alert alert-danger' role='alert'>
                                    {errorMessage}
                                </div>
                            )}
                            {showModal && <MessageModal message={message} />}
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default TryIt;