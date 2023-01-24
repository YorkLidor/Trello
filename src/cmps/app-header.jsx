import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export function AppHeader() {
    const [isHidden, setIsHidden] = useState(true)

    function handleClick(){
        setIsHidden(!isHidden)
        document.body.style.overflow = isHidden ? "hidden" : "visible";
    }


    return <header className="app-header main-layout">

        <div className="logo-container">
            <Link to="/" className="logo">
                <img src="../../src/assets/img/shmello-logo.jpg" alt="" />
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

        <div className="container nav-container hamburger" onClick={handleClick}>
            <input className="checkbox" type="checkbox" name="" id="" />
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>  
        </div>



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