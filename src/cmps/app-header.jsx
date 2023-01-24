import { Link, NavLink } from "react-router-dom";

export function AppHeader() {

    return <header className="app-header main-layout">

        <div className="nav-container">

            <div className="logo-container">
                <Link to="/" className="logo">
                    <img src="https://frello-app.onrender.com/dist/Frello.8d010d74.svg" alt="" />
                </Link>
            </div>

            <nav className="navlinks-container flex">
                <NavLink className='workspace-link' to="/workspace">Workspaces</NavLink>
            </nav >

        </div>

        <div className="login-container flex">
            <a className="login" href="#">
                Log in
            </a>
            <a className="get-shmello" href="#">
                Get Shmello for free
            </a>
        </div>


    </header >
}