import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Layout.tsx';

const HomePage = lazy(() => import('../pages/HomePage.tsx'));
const LoginPage = lazy(() => import('../pages/LoginPage.tsx'));
const UsersPage = lazy(() => import('../pages/UsersPage.tsx'));
const UserPage = lazy(() => import('../pages/UserPage.tsx'));
const RecipesPage = lazy(() => import('../pages/RecipesPage.tsx'));
const RecipePage = lazy(() => import('../pages/RecipePage.tsx'));

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'users', element: <UsersPage /> },
            { path: 'user/:userId', element: <UserPage /> },
            { path: 'recipes', element: <RecipesPage /> },
            { path: 'recipe/:recipeId', element: <RecipePage /> },
        ],
    },
    {
        path: '*',
        element: <div>404 Not Found</div>,
    },
]);
