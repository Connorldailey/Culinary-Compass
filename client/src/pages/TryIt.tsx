import { useEffect, useState, useCallback } from 'react';
import auth from '../utils/auth';
import { getUserRecipes, deleteUserRecipe } from '../api/userRecipeAPI';
import { addRecipeToList } from '../api/recipeAPI';
import { UserRecipeData } from '../interfaces/UserRecipeData';
import { AddRecipeData } from '../interfaces/RecipeData';
import TryItCard from '../components/TryItCard';
import MessageModal from '../components/MessageModal';

const TryIt = () => {
    const [ loginCheck, setLoginCheck ] = useState<boolean>(false);
    const [ results, setResults ] = useState<UserRecipeData[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>('');
    const [ message, setMessage ] = useState<string>('');
    const [ showModal, setShowModal ] = useState<boolean>(false);

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
        console.log('Recipe object received:', recipe);
        try {
            const recipeData: AddRecipeData = {
                recipeId: recipe.recipeId,
                category: 'favorite',
            }
            console.log('Recipe data to be added:', recipeData);
            const data = await addRecipeToList(recipeData);

            // Display success message
            setMessage(`Added to favorites list.`);
            setShowModal(true);
            // Close the modal after 3 seconds
            setTimeout(() => {
                setShowModal(false);
            }, 3000);

            console.log(`Recipe added to favorites list.`, data);
        } catch (error) {
            console.error('Failed to add recipe to list:', error);
            setMessage(`Recipe already in favorites list.`);
            setShowModal(true);

            setTimeout(() => {
                setShowModal(false);
            }, 3000);
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
            setMessage('Recipe successfully deleted');
            setShowModal(true);

            setTimeout(() => {
                setShowModal(false);
            }, 3000);

            console.log('Recipe added to try it list.');
        } catch (error) {
            console.error('Failed to delete recipe from try it list:', error);
            setMessage('Failed to delete recipe');
            setShowModal(true);

            setTimeout(() => {
                setShowModal(false);
            }, 3000);
        }
    }

    const viewRecipe = async (recipe: UserRecipeData) => {
        console.log(recipe);
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
                        <h1 className='mb-3'>Try It</h1>
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