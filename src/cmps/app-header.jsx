import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { GiHamburgerMenu } from "react-icons/gi";


export function AppHeader() {
    const [isHidden, setIsHidden] = useState(true)

    function handleClick(){
        setIsHidden(!isHidden)
        document.body.style.overflow = isHidden ? "hidden" : "visible";
    }


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
        </div>

        <GiHamburgerMenu className="hamburger" onClick={handleClick} />



        <div className={`nav-modal ${isHidden && 'hidden'}`}>
            <div className="nav-links-container">
                <NavLink onClick={handleClick} className='workspace-link' to="/workspace">Workspaces</NavLink>
            </div>

            <div className="login-container flex">
                <a className="get-shmello" href="#">
                    Get  Shmello  for  free
                </a>

                <a className="login" href="#">
                    Log in
                </a>
            </div>
        </div>


    </header >
}