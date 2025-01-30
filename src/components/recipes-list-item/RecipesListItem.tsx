import { FC } from 'react';
import { IRecipe } from '../../types/IRecipe.ts';
import { Link } from 'react-router-dom';

interface IProps {
    recipe: IRecipe;
    onTagSelect: (tag: string) => void;
}

const RecipesListItem: FC<IProps> = ({ recipe, onTagSelect }) => {
    return (
        <div>
            <div>
                <Link to={`/recipes/${recipe.id}`}>
                    {recipe.id}. {recipe.name}
                </Link>
                <div>
                    {recipe.tags.map((tag) => (
                        <button
                            onClick={() => {
                                onTagSelect(tag);
                            }}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecipesListItem;
