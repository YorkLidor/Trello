import { Link, NavLink } from "react-router-dom";

export function AppHeader() {

    return <header className="app-header">
        <nav className="main-nav flex">
            <div>
                <Link to="/" className="logo">
                    Shmello
                </Link>
            </div>
            <nav className="navlinks-container">
                <NavLink to="/workspace">Workspaces</NavLink>
                <NavLink to="/board">Board</NavLink>
            </nav>
        </nav >
    </header >
}