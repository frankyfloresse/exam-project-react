import { FC } from 'react';
import { IRecipe } from '../../types/IRecipe.ts';
import arrowRightIcon from '../../assets/icons/arrow-right.svg';
import { generatePath, Link } from 'react-router-dom';
import { RECIPE_ROUTE } from '../../routes/constants.ts';

interface IProps {
    recipes: IRecipe[];
}

const UserRecipesList: FC<IProps> = ({ recipes }) => {
    return recipes.length ? (
        <div className="bg-white shadow-lg rounded-2xl p-6 my-8">
            <h2 className="text-2xl font-bold mb-5">User's Recipes</h2>

            <div className="space-y-4">
                {recipes.map((recipe) => (
                    <Link
                        to={generatePath(RECIPE_ROUTE, { recipeId: String(recipe.id) })}
                        key={recipe.id}
                        className="flex justify-between items-start p-4 border border-gray-200 rounded-lg hover:shadow-lg">
                        <div>
                            <div className="text-xl font-semibold">{recipe.name}</div>
                            <div className="text-gray-600 mt-2">Cook time: {recipe.cookTimeMinutes}</div>
                            <div className="text-gray-600">Difficulty: {recipe.difficulty}</div>
                        </div>

                        <div className="flex cursor-pointer items-center text-blue-500 hover:underline">
                            <div className="mr-2">View Recipe</div>
                            <img src={arrowRightIcon} alt="arrow" className="size-4 mt-0.5" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    ) : (
        <div className="px-4 py-10 text-gray-600 font-bold text-center text-[22px]">User doesn't have recipes</div>
    );
};

export default UserRecipesList;
