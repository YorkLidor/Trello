import { Link, NavLink } from "react-router-dom";
import { SiTrello } from 'react-icons/si'

export function AppHeader() {

    return <header className="app-header-regular">
        <nav className="main-nav flex">
            <div className="logo-container">
                <Link to="/" className="logo">
                    <SiTrello/>
                        Shmello
                </Link>
            </div>
            <nav className="navlinks-container">
                <NavLink to="/workspace">Workspaces</NavLink>
            </nav>
        </nav >
    </header >
}