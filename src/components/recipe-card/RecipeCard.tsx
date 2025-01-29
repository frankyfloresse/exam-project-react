import { FC, useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';
import { useAppDispatch } from '../../redux/hooks/useAppDispatch.ts';
import { recipeSliceActions } from '../../redux/slices/recipeSlice.ts';

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
        <div>
            <div>
                {recipe.id}. {recipe.name}
            </div>
        </div>
    );
};

export default RecipeCard;
