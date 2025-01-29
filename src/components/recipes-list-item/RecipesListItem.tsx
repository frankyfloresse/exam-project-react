import { FC } from 'react';
import { IRecipe } from '../../types/IRecipe.ts';
import { Link } from 'react-router-dom';

interface IProps {
    recipe: IRecipe;
}

const RecipesListItem: FC<IProps> = ({ recipe }) => {
    return (
        <div>
            <div>
                <Link to={`/recipes/${recipe.id}`}>
                    {recipe.id}. {recipe.name}
                </Link>
            </div>
        </div>
    );
};

export default RecipesListItem;
