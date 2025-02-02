import RecipesList from '../../components/recipes-list/RecipesList.tsx';
import SpinnerLoader from '../../components/spinner-loader/SpinnerLoader.tsx';
import { recipesSliceActions } from '../../redux/slices/recipesSlice.ts';
import Pagination from '../../components/pagination/Pagination.tsx';
import SearchBar from '../../components/search-bar/SearchBar.tsx';
import { generatePath, useNavigate } from 'react-router-dom';
import { RECIPE_ROUTE } from '../../routes/constants.ts';
import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';
import { useAppDispatch } from '../../redux/hooks/useAppDispatch.ts';
import { useEffect } from 'react';
import SearchTag from '../../components/search-tag/SearchTag.tsx';

const RecipesPage = () => {
    const navigate = useNavigate();
    const { skip, limit, total, searchText, tag, isLoading } = useAppSelector(({ recipesSlice }) => recipesSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(recipesSliceActions.loadRecipes());
    }, [skip, searchText, tag]);

    if (isLoading) {
        return <SpinnerLoader />;
    }

    return (
        <div className="flex flex-col items-center container mx-auto mt-5">
            <h1 className="text-[28px] font-bold mb-3">Recipes</h1>

            {tag ? (
                <SearchTag tag={tag} onClear={() => dispatch(recipesSliceActions.setTag(''))} />
            ) : (
                <SearchBar
                    onTextSearch={(text) => dispatch(recipesSliceActions.setSearchText(text))}
                    onIdSearch={(recipeId) => navigate(generatePath(RECIPE_ROUTE, { recipeId }))}
                    placeholder={'Search recipes...'}
                    initialSearch={searchText}
                />
            )}

            <RecipesList />

            <Pagination
                skip={skip}
                total={total}
                limit={limit}
                onSkipChange={(newSkip) => dispatch(recipesSliceActions.setSkip(newSkip))}
            />
        </div>
    );
};

export default RecipesPage;
