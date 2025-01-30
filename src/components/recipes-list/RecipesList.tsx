import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';
import { useAppDispatch } from '../../redux/hooks/useAppDispatch.ts';
import { useEffect } from 'react';
import { recipesSliceActions } from '../../redux/slices/recipesSlice.ts';
import RecipesListItem from '../recipes-list-item/RecipesListItem.tsx';
import Pagination from '../pagination/Pagination.tsx';
import SearchBar from '../search-bar/SearchBar.tsx';
import { useNavigate } from 'react-router-dom';

const RecipesList = () => {
    const navigate = useNavigate();
    const { recipes, skip, limit, total, searchText, tag } = useAppSelector(({ recipesSlice }) => recipesSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(recipesSliceActions.loadRecipes());
    }, [skip, searchText, tag]);

    return (
        <div>
            {tag ? (
                <div>
                    <div>Selected tag: {tag}</div>
                    <button onClick={() => dispatch(recipesSliceActions.setTag(''))}>X</button>
                </div>
            ) : (
                <SearchBar
                    onTextSearch={(text) => dispatch(recipesSliceActions.setSearchText(text))}
                    onIdSearch={(recipeId) => navigate(`/recipes/${recipeId}`)}
                />
            )}
            {recipes.map((recipe) => (
                <RecipesListItem onTagSelect={(tag) => dispatch(recipesSliceActions.setTag(tag))} recipe={recipe} />
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
