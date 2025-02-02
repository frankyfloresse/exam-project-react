import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';
import { useAppDispatch } from '../../redux/hooks/useAppDispatch.ts';
import { useEffect } from 'react';
import { recipesSliceActions } from '../../redux/slices/recipesSlice.ts';
import RecipesListItem from '../recipes-list-item/RecipesListItem.tsx';
import Pagination from '../pagination/Pagination.tsx';
import SearchBar from '../search-bar/SearchBar.tsx';
import { generatePath, useNavigate } from 'react-router-dom';
import logo from '../../assets/icons/cross.svg';
import { RECIPE_ROUTE } from '../../routes/constants.ts';

const RecipesList = () => {
    const navigate = useNavigate();
    const { recipes, skip, limit, total, searchText, tag } = useAppSelector(({ recipesSlice }) => recipesSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(recipesSliceActions.loadRecipes());
    }, [skip, searchText, tag]);

    return (
        <div className="flex flex-col items-center container mx-auto mt-5">
            <h1 className="text-[28px] font-bold mb-3">Recipes</h1>

            {tag ? (
                <div className="flex items-center gap-2 bg-blue-300/50 text-blue-700 rounded-full py-1 px-5">
                    <div>Tag: {tag}</div>
                    <button className="cursor-pointer mt-0.5" onClick={() => dispatch(recipesSliceActions.setTag(''))}>
                        <img src={logo} alt="cross" className="size-2.5" />
                    </button>
                </div>
            ) : (
                <SearchBar
                    onTextSearch={(text) => dispatch(recipesSliceActions.setSearchText(text))}
                    onIdSearch={(recipeId) => navigate(generatePath(RECIPE_ROUTE, { recipeId }))}
                    placeholder={'Search recipes...'}
                />
            )}

            <div className="grid grid-cols-3 gap-6 w-full my-5">
                {recipes.map((recipe) => (
                    <RecipesListItem onTagSelect={(tag) => dispatch(recipesSliceActions.setTag(tag))} recipe={recipe} />
                ))}
            </div>

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
