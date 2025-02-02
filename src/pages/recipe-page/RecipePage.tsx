import RecipeCard from '../../components/recipe-card/RecipeCard.tsx';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';
import { useAppDispatch } from '../../redux/hooks/useAppDispatch.ts';
import { useEffect } from 'react';
import { recipeSliceActions } from '../../redux/slices/recipeSlice.ts';
import SpinnerLoader from '../../components/spinner-loader/SpinnerLoader.tsx';

const RecipePage = () => {
    const { recipeId } = useParams();

    const { isLoading } = useAppSelector(({ recipeSlice }) => recipeSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!recipeId) {
            return;
        }

        dispatch(recipeSliceActions.loadRecipe(recipeId));

        return () => {
            dispatch(recipeSliceActions.resetState());
        };
    }, []);

    if (isLoading) {
        return <SpinnerLoader />;
    }

    return <RecipeCard />;
};

export default RecipePage;
