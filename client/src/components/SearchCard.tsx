import { RecipeData } from '../interfaces/RecipeData';
import noImage from '../assets/images/no-image-available.jpg';

interface SearchCardProps {
    data: RecipeData[];
    addToList: (recipe: RecipeData, category: string) => void;
    viewRecipe: (recipeId: number, recipeData: RecipeData) => void;
}

const SearchCard: React.FC<SearchCardProps> = ({ data, addToList, viewRecipe }) => {
    return (
        <>
            {data.map((recipe, index) => (
                <div key={index} className='recipe-card d-flex flex-column flex-md-row mb-3 bg-dark text-light'>
                    <img 
                        src={recipe.image} 
                        className='card-image img-fluid' 
                        alt={recipe.title} 
                        onError={(e) => {
                            e.currentTarget.src = noImage;
                        }}
                    />
                    <div className='card-body d-flex flex-column p-3'>
                        <h2 className="card-title text-center text-md-start p-3">{recipe.title}</h2>
                        <div className='d-flex justify-content-center justify-content-md-around justify-content-lg-start'>
                            <button className='btn pe-3 card-button' onClick={() => addToList(recipe, 'try-it')} aria-label="Try It">
                                <i className='bi bi-bookmark-plus fs-1 text-light'></i>
                            </button>
                            <button className='btn pe-3 card-button' onClick={() => addToList(recipe, 'favorite')} aria-label="Favorites">
                                <i className='bi bi-heart fs-1 text-light'></i>
                            </button>
                            <button className='btn card-button' onClick={() => viewRecipe(recipe.id, recipe)} aria-label="View Details">
                                <i className='bi bi-info-circle fs-1 text-light'></i>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default SearchCard;