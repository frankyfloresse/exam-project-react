import { Outlet } from 'react-router-dom';
import Menu from '../components/menu/Menu.tsx';
import { Suspense } from 'react';

const Layout = () => {
    return (
        <div>
            <Menu />
            <Suspense fallback={<div>Page is loading...</div>}>
                <Outlet />
            </Suspense>
        </div>
    );
};

export default Layout;
