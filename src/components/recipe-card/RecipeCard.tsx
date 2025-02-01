import { FC, useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';
import { useAppDispatch } from '../../redux/hooks/useAppDispatch.ts';
import { recipeSliceActions } from '../../redux/slices/recipeSlice.ts';
import { Link } from 'react-router-dom';

interface IProps {
    recipeId: string;
}

const RecipeCard: FC<IProps> = ({ recipeId }) => {
    const { recipe } = useAppSelector(({ recipeSlice }) => recipeSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(recipeSliceActions.loadRecipe(recipeId));
    }, []);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-[800px] mx-auto my-10">
            <div className="flex gap-8 bg-white shadow-lg rounded-2xl p-6">
                <div>
                    <div className="flex justify-between items-center">
                        <h2 className="text-[25px] font-bold">{recipe.name}</h2>
                        <Link to={`/users/${recipe.userId}`} className="text-blue-500 hover:underline">
                            Go to recipe's author
                        </Link>
                    </div>
                    <div className="flex gap-3 mt-4">
                        {recipe.tags.map((tag) => (
                            <div className="text-[15px] bg-gray-200/60 py-1 px-5 rounded-full text-gray-500">{tag}</div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-between">
                        <div className="w-1/2">
                            <h3 className="text-[20px] font-bold">Ingredients</h3>
                            <div className="mt-3 space-y-1">
                                {recipe.ingredients.map((ingredient) => (
                                    <ul className="list-disc pl-4 text-gray-500">
                                        <li>{ingredient}</li>
                                    </ul>
                                ))}
                            </div>
                        </div>

                        <div className="w-1/2">
                            <h3 className="text-[20px] font-bold">Instructions</h3>
                            <div className="mt-3 space-y-1">
                                {recipe.instructions.map((instruction) => (
                                    <ul>
                                        <li>{instruction}</li>
                                    </ul>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
