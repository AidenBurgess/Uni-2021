import styles from './NavBar.module.css';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <div className={styles.navBar}>
            <NavLink to="/customers" activeClassName={styles.activeLink}>Customers</NavLink>
        </div>
    );
}