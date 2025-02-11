import './index.css';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/routes.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={routes} />
    </Provider>
);
