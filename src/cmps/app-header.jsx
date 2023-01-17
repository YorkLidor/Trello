import { Link, NavLink } from "react-router-dom";

export function AppHeader() {
    return <header>
        <nav>
            <Link to="/">
                <h3>LOGO!</h3>
            </Link>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/workspace">Workspace</NavLink>
                <NavLink to="/board">Board</NavLink>
            </nav>
        </nav >
    </header >
}