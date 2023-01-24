import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { GiHamburgerMenu } from "react-icons/gi";


export function AppHeader() {
    const [isHidden,setIsHidden] = useState(true)

    return <header className="app-header main-layout">

        <div className="logo-container">
            <Link to="/" className="logo">
                <img src="https://frello-app.onrender.com/dist/Frello.8d010d74.svg" alt="" />
            </Link>
        </div>

        <nav className="navlinks-container flex" >
            <NavLink className='workspace-link' to="/workspace">Workspaces</NavLink>
        </nav >

        <div className="login-container flex">
            <a className="login" href="#">
                Log in
            </a>
            <a className="get-shmello" href="#">
                Get Shmello for free
            </a>

            {/* <GiHamburgerMenu className="hamburger"/> */}
        </div>


    </header >
}