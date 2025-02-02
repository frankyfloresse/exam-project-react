import { Outlet } from 'react-router-dom';
import Menu from '../components/menu/Menu.tsx';
import { Suspense } from 'react';
import SpinnerLoader from '../components/spinner-loader/SpinnerLoader.tsx';

const Layout = () => {
    return (
        <div>
            <Menu />
            <Suspense fallback={<SpinnerLoader />}>
                <Outlet />
            </Suspense>
        </div>
    );
};

export default Layout;
