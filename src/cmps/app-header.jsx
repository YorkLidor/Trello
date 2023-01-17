import { Link, NavLink } from "react-router-dom";

export function AppHeader() {

    return <header className="app-header">
        <nav className="main-nav flex justify-between">
            <Link to="/">
                <h3 className="logo">Shmello</h3>
            </Link>
            <nav className="navlinks-container">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/workspace">Workspace</NavLink>
                <NavLink to="/board">Board</NavLink>
            </nav>
        </nav >
    </header >
}