import { recipesSliceActions } from '../../redux/slices/recipesSlice.ts';
import RecipesListItem from '../recipes-list-item/RecipesListItem.tsx';
import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';
import { useAppDispatch } from '../../redux/hooks/useAppDispatch.ts';

const RecipesList = () => {
    const { recipes } = useAppSelector(({ recipesSlice }) => recipesSlice);
    const dispatch = useAppDispatch();

    return (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 w-full my-5">
            {recipes.map((recipe) => (
                <RecipesListItem onTagSelect={(tag) => dispatch(recipesSliceActions.setTag(tag))} recipe={recipe} />
            ))}
        </div>
    );
};

export default RecipesList;
