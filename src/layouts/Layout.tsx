import { Outlet } from 'react-router-dom';
import Menu from '../components/menu/Menu.tsx';

const Layout = () => {
    return (
        <div>
            <Menu />
            <hr />
            <Outlet />
        </div>
    );
};

export default Layout;
