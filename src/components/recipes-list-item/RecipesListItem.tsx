import { FC } from 'react';
import { IRecipe } from '../../types/IRecipe.ts';

interface IProps {
    recipe: IRecipe;
}

const RecipesListItem: FC<IProps> = ({ recipe }) => {
    return (
        <div>
            <div>
                {recipe.id}. {recipe.name}
            </div>
        </div>
    );
};

export default RecipesListItem;
