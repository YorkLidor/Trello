import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

export function HomeAppHeader() {
    const [isHidden, setIsHidden] = useState(true)
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleWidthChange = () => { setWidth(window.innerWidth) }
        window.addEventListener("resize", handleWidthChange)
        return () => window.removeEventListener("resize", handleWidthChange)
    }, [])

    useEffect(() => {
        if (width > 801) setIsHidden(true)
        else if (width === 800) setIsHidden(false)
    }, [width])

    function handleClick() {
        setIsHidden(!isHidden)
        document.body.style.overflow = isHidden ? "hidden" : "visible";
    }

    return <header className="app-header main-layout">

        <div className="logo-container">
            <Link to="/" className="logo">
                <img src="https://www.linkpicture.com/q/shmello-logo.jpg" alt="" />
            </Link>
        </div>

        <nav className="navlinks-container flex" >
            <NavLink
                className='workspace-link'
                to="/workspace"
            >
                Workspaces
            </NavLink>
        </nav >

        <div className="login-container flex">
            <a className="login" href="/login">
                Log in
            </a>
            <a className="get-shmello" href="#">
                Sign up here
            </a>
        </div>

        <div className="container nav-container hamburger" onClick={handleClick}>
            <input
                className="checkbox"
                type="checkbox"
                name=""
                checked={!isHidden}
                onChange={handleClick}
            />
            <div className="hamburger-lines">
                <span className="line line1"></span>
                <span className="line line2"></span>
                <span className="line line3"></span>
            </div>
        </div>



        <div className={`nav-modal ${isHidden && 'hidden'}`}>
            <div className="nav-links-container">
                <NavLink
                    onClick={handleClick}
                    className='workspace-link'
                    to="/workspace"
                >
                    Workspaces
                </NavLink>
            </div>

            <div className="login-container flex">
                <a className="get-shmello" href="#">
                    Get  Shmello  for  free
                </a>

                <a className="login" href="/login">
                    Log in
                </a>
            </div>
        </div>


    </header >
}