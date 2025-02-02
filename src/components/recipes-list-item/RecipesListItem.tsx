import { FC } from 'react';
import { IRecipe } from '../../types/IRecipe.ts';
import { generatePath, Link } from 'react-router-dom';
import { RECIPE_ROUTE } from '../../routes/constants.ts';

interface IProps {
    recipe: IRecipe;
    onTagSelect: (tag: string) => void;
}

const RecipesListItem: FC<IProps> = ({ recipe, onTagSelect }) => {
    return (
        <Link to={generatePath(RECIPE_ROUTE, { recipeId: String(recipe.id) })}>
            <div className="bg-white shadow-lg rounded-[8px] p-6 gap-4 flex items-start flex-col h-full">
                <h2 className="text-[20px] font-bold">{recipe.name}</h2>

                <div className="flex gap-2 flex-wrap">
                    {recipe.tags.map((tag) => (
                        <button
                            className="text-[15px] text-gray-500 bg-gray-200/60 hover:bg-gray-300 py-1 px-5 rounded-full cursor-pointer"
                            onClick={(evt) => {
                                evt.preventDefault();
                                evt.stopPropagation();
                                onTagSelect(tag);
                            }}>
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default RecipesListItem;
