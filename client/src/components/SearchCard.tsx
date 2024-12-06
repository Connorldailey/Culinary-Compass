import { RecipeData } from '../interfaces/RecipeData';
import noImage from '../assets/images/no-image-available.jpg';

interface SearchCardProps {
    data: RecipeData[];
    addToList: (recipe: RecipeData, category: string) => void;
    viewRecipe: (recipeId: number) => void;
}

const SearchCard: React.FC<SearchCardProps> = ({ data, addToList, viewRecipe }) => {
    return (
        <>
            {data.map((recipe, index) => (
                <div key={index} className='recipe-card d-flex mb-3 bg-dark text-light'>
                    <img 
                        src={recipe.image} 
                        className='card-image' 
                        alt={recipe.title} 
                        onError={(e) => {
                            e.currentTarget.src = noImage;
                        }}
                    />
                    <div className='card-body p-3'>
                        <h2 className="card-title">{recipe.title}</h2>
                        <div className='d-flex'>
                            <button className='btn' onClick={() => addToList(recipe, 'try-it')} aria-label="Try It">
                                <i className='bi bi-bookmark-plus fs-1 text-light'></i>
                            </button>
                            <button className='btn' onClick={() => addToList(recipe, 'favorite')} aria-label="Favorites">
                                <i className='bi bi-heart fs-1 text-light'></i>
                            </button>
                            <button className='btn' onClick={() => viewRecipe(recipe.id)} aria-label="View Details">
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