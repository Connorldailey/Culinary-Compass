import { RecipeData } from '../interfaces/RecipeData';

interface SearchCardProps {
    data: RecipeData[];
}

const SearchCard: React.FC<SearchCardProps> = ({ data }) => {
    return (
        <>
            {data.map((recipe, index) => (
                <div key={index} className='recipe-card d-flex mb-3'>
                    <img src={recipe.image} className='card-image' alt={recipe.title} />
                    <div className='card-body'>
                        <h2 className="card-title">{recipe.title}</h2>
                    </div>
                </div>
            ))}
        </>
    )
}

export default SearchCard;