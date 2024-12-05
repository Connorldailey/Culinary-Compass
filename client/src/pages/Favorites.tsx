import { useEffect, useState } from 'react';
import auth from '../utils/auth';
import { getUserRecipes, deleteUserRecipe } from '../api/userRecipeAPI';
import { UserRecipeData } from '../interfaces/UserRecipeData';
import FavoriteCard from '../components/FavoriteCard';
import MessageModal from '../components/MessageModal';

const Favorites = () => {
    const [ loginCheck, setLoginCheck ] = useState<boolean>(false);
    const [ results, setResults ] = useState<UserRecipeData[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>('');
    const [ message, setMessage ] = useState<string>('');
    const [ showModal, setShowModal ] = useState<boolean>(false);

    useEffect(() => {
        setLoginCheck(auth.loggedIn());
        if (loginCheck) {
            getRecipes();
        }
    }, [loginCheck]);

    // Get recipes in user's favorites list
    const getRecipes = async () => {
        try {
            const response = await getUserRecipes('favorite');
            setResults(response.data);
            console.log(response);
        } catch (error) {
            console.error('Failed to get recipes from favorites list:', error);
            setErrorMessage(`No recipes to display.`);
        }
    }

    const removeFromFavorites = async (recipe: UserRecipeData) => {
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
            }, 3000);

            console.log('Recipe removed from favorites list.');
        } catch (error) {
            console.error('Failed to delete recipe from favorites list:', error);
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
                        <h1 className='mb-3'>Favorites</h1>
                        <div className='container'>
                            <FavoriteCard 
                                data={results}
                                removeFromList={removeFromFavorites}
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

export default Favorites;