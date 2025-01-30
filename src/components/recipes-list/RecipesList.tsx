import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';
import { useAppDispatch } from '../../redux/hooks/useAppDispatch.ts';
import { useEffect } from 'react';
import { recipesSliceActions } from '../../redux/slices/recipesSlice.ts';
import RecipesListItem from '../recipes-list-item/RecipesListItem.tsx';
import Pagination from '../pagination/Pagination.tsx';

const RecipesList = () => {
    const { recipes, skip, limit, total } = useAppSelector(({ recipesSlice }) => recipesSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(recipesSliceActions.loadRecipes());
    }, [skip]);

    return (
        <div>
            {recipes.map((recipe) => (
                <RecipesListItem recipe={recipe} />
            ))}
            <Pagination
                skip={skip}
                total={total}
                limit={limit}
                onSkipChange={(newSkip) => dispatch(recipesSliceActions.setSkip(newSkip))}
            />
        </div>
    );
};

export default RecipesList;
