import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Layout.tsx';
import { BASE_ROUTE, LOGIN_ROUTE, RECIPE_ROUTE, RECIPES_ROUTE, USER_ROUTE, USERS_ROUTE } from './constants.ts';

const HomePage = lazy(() => import('../pages/HomePage.tsx'));
const LoginPage = lazy(() => import('../pages/LoginPage.tsx'));
const UsersPage = lazy(() => import('../pages/UsersPage.tsx'));
const UserPage = lazy(() => import('../pages/UserPage.tsx'));
const RecipesPage = lazy(() => import('../pages/RecipesPage.tsx'));
const RecipePage = lazy(() => import('../pages/RecipePage.tsx'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage.tsx'));

export const routes = createBrowserRouter([
    {
        path: BASE_ROUTE,
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: LOGIN_ROUTE, element: <LoginPage /> },
            { path: USERS_ROUTE, element: <UsersPage /> },
            { path: USER_ROUTE, element: <UserPage /> },
            { path: RECIPES_ROUTE, element: <RecipesPage /> },
            { path: RECIPE_ROUTE, element: <RecipePage /> },
        ],
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);
