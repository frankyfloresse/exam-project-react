import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';
import { useAppDispatch } from '../../redux/hooks/useAppDispatch.ts';
import { useEffect } from 'react';
import { recipesSliceActions } from '../../redux/slices/recipesSlice.ts';
import RecipesListItem from '../recipes-list-item/RecipesListItem.tsx';

const RecipesList = () => {
    const { recipes } = useAppSelector(({ recipesSlice }) => recipesSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(recipesSliceActions.loadRecipes());
    }, []);

    return (
        <div>
            {recipes.map((recipe) => (
                <RecipesListItem recipe={recipe} />
            ))}
        </div>
    );
};

export default RecipesList;
