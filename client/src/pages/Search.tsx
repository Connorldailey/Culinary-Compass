import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import auth from '../utils/auth';
import { search } from '../api/recipeAPI';
import { RecipeData } from '../interfaces/RecipeData';
import SearchCard from '../components/SearchCard';

const Search = () => {
    const [ loginCheck, setLoginCheck ] = useState<boolean>(false);
    const [ searchData, setSearchData ] = useState<string>('');
    const [ results, setResults ] = useState<RecipeData[]>([]);

    useEffect(() => {
        setLoginCheck(auth.loggedIn());
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value } = e.target;
        setSearchData(value);
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const data = await search(searchData);
            setResults(data);
            console.log(data); // Testing
        } catch {
            console.error('Search failed.');
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
                    <div className='search-content'>
                        <h1>Search</h1>
                        <div className='container mb-3'>
                            <form onSubmit={handleSubmit} className='d-flex'>
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
                        </div>
                        <div className='container'>
                            <SearchCard data={results}/>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Search;