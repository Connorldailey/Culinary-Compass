import { useEffect, useState, FormEvent, ChangeEvent } from 'react';

import auth from '../utils/auth';

import { search, addRecipeToList } from '../api/recipeAPI';

import { RecipeData, AddRecipeData } from '../interfaces/RecipeData';

import SearchCard from '../components/SearchCard';
import MessageModal from '../components/MessageModal';

const Search = () => {
    const [ loginCheck, setLoginCheck ] = useState<boolean>(false);
    const [ searchData, setSearchData ] = useState<string>('');
    const [ results, setResults ] = useState<RecipeData[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>('');
    const [ message, setMessage ] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        setLoginCheck(auth.loggedIn());
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value } = e.target;
        setSearchData(value);
        setErrorMessage('');
    };

    // Handle form submit for recipe search
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // Prevent empty searches
        if (!searchData.trim()) {
            setErrorMessage('Please enter a search query.');
            setResults([]);
            return;
        }
        try {
            const data = await search(searchData);
            if (data.length > 0) {
                setResults(data);
                console.log(data); // Testing
                return;
            }
            throw new Error('No data found.')
        } catch (error) {
            setResults([]);
            setErrorMessage('We could not find what you were looking for. Please try again.')
            console.error('Search failed.', error);
        }
    };

    // Add recipe to list
    const addToList = async (recipe: RecipeData, category: string) => {
        try {
            const recipeData: AddRecipeData = {
                recipeId: recipe.id,
                category: category,
            }
            const response = await addRecipeToList(recipeData);

            // Set response status message
            const listName = category === 'favorite' ? 'favorites' : 'try it';
            let modalMessage = 'Failed to add the recipe. Please try again later.';
            if (response && response.message === 'Recipe added successfully.') {
                // Successfully added to list
                modalMessage = `Added to ${listName} list.`;
                console.log(`Recipe added to ${listName} list.`, response);
            } else if (response && response.message.includes('already exists')) {
                // Recipe already exists in the list
                modalMessage = `Already in ${listName} list.`
                console.log(`Recipe already in ${listName} list.`, response);
            } else {
                console.log(`Failed to add the recipe.`, response);
            }

            // Show modal with the message
            setMessage(modalMessage);
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
            }, 3000);

        } catch (error) {
            console.error('Failed to add recipe to list:', error);
            
            // Show modal with error message
            const errorMsg = 'Server error. Please try again later.';
            setMessage(errorMsg)
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
            }, 3000);
        }
    };

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
                        <h1 className='mb-3'>Search</h1>
                        <div className='container mb-3'>
                            <form onSubmit={handleSubmit} className='d-flex mb-3'>
                                <input
                                    type='text'
                                    id='searchInput'
                                    name='search'
                                    className='form-control me-3'
                                    value={searchData || ''}
                                    onChange={handleChange}
                                />
                                <button type='submit' className='btn btn-primary'>Search</button>
                            </form>
                            {errorMessage && (
                                <div className='alert alert-danger' role='alert'>
                                    {errorMessage}
                                </div>
                            )}
                        </div>
                        <div className='container'>
                            <SearchCard 
                                data={results}
                                addToList={addToList}
                            />
                            {showModal && <MessageModal message={message} />}
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Search;