import { UserRecipeData } from '../interfaces/UserRecipeData';
import noImage from '../assets/images/no-image-available.jpg';

interface FavoriteCardProps {
    data: UserRecipeData[];
    removeFromList: (recipe: UserRecipeData) => void;
    viewRecipe: (recipeId: number) => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({ data, removeFromList, viewRecipe }) => {
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
                            <button className='btn' onClick={() => removeFromList(recipe)} aria-label="Remove">
                                <i className='bi bi-trash fs-1 text-light'></i>
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

export default FavoriteCard;