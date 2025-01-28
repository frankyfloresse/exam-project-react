import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <ul>
            <li>
                <Link to={'/'}>home</Link>
            </li>
            <li>
                <Link to={'/login'}>login</Link>
            </li>
            <li>
                <Link to={'/users'}>users</Link>
            </li>
            <li>
                <Link to={'/user'}>user</Link>
            </li>
            <li>
                <Link to={'recipes'}>recipes</Link>
            </li>
            <li>
                <Link to={'recipe'}>recipe</Link>
            </li>
        </ul>
    );
};

export default Menu;
