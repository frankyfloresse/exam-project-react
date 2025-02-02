import RecipeCard from '../../components/recipe-card/RecipeCard.tsx';
import { useParams } from 'react-router-dom';

const RecipePage = () => {
    const { recipeId } = useParams();
    return <div>{recipeId && <RecipeCard recipeId={recipeId} />}</div>;
};

export default RecipePage;
